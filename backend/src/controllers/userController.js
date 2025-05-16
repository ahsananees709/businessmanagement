import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/User.js"
import BlackListToken from "../../models/BlackListToken.js"
import sendEmail from "../utils/sendEmail.js"
import {
  registrationEmail,
  accountVerificationEmail,
  generateNewAccountActivationEmail,
  passwordUpdateEmail,
  generatePasswordResetEmail,
  passwordResetConfirmationEmail
} from "../utils/emailTemplates.js"
import { createOTP, createJWTToken, getRefreshToken, verifyToken, getAccessToken } from "../utils/helper.js"
import { successResponse, errorResponse, unauthorizeResponse } from "../utils/customResponses.js"
import { verifyAccountActivationLink, generateAccountActivationLink } from "../utils/helper.js"
import { deleteFromCloudinary, getPublicIdFromUrl, uploadToCloudinary } from "../utils/cloudinaryFunctions.js"
import { FRONTEND_MAIN_URL, JWT_PRIVATE_KEY, SAME_SITE, SECURE_COOKIE } from "../utils/constants.js"


const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, businessId, businessRoleId } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, "Email already exists", 400);
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = createOTP();
        const activationLink = generateAccountActivationLink(email, otp);
  
        let profilePictureUrl = null;
        if (req.file) {
            try {
                const result = await uploadToCloudinary(req.file, "image", "user-profile-pictures");
                profilePictureUrl = result;
            } catch (error) {
                return errorResponse(res, "Profile picture upload failed", 500);
            }
        }
  
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            otp,
            profilePicture: profilePictureUrl,
        });
  
        await user.save();

    //  Check if user came through invite link
    if (businessId && businessRoleId) {
        await BusinessMembers.create({
          user: user._id,
          business: businessId,
          role: businessRoleId,
        });
      }
  
        const emailContent = registrationEmail(fullName, activationLink);
        await sendEmail("Registration Successful", emailContent, email);
  
        return successResponse(
            res,
            "User Registered Successfully! An email has been sent with an activation link to your provided email.",
            user
        );
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}; 

const verifyAccount = async (req, res) => {
    try {
        const { token } = req.params;
        const userData = await verifyAccountActivationLink(token);
        const email = userData?.email;
  
        if (!email) {
            return errorResponse(res, "Invalid or expired token", 400);
        }
  
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { isVerified: true, otp: null, updatedAt: new Date() },
            { new: true }
        );
  
        if (!updatedUser) {
            return errorResponse(res, "User not found or already verified", 404);
        }
  
        const emailContent = accountVerificationEmail(updatedUser.fullName, updatedUser.email);
        await sendEmail("User Verified - Congratulations!", emailContent, updatedUser.email);
  
        return successResponse(res, "User verified successfully!", updatedUser);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
  
const getNewAccountActivationLink = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email: email });
        if (!user) {
            return errorResponse(res, "Unknown User! There is no user registered with provided email address.", 404);
        }
        if (user.isVerified) {
            return errorResponse(res, "User is already verified and activated.", 409);
        }
  
        const otp = createOTP();
        const activationLink = generateAccountActivationLink(email, otp);
  
        user.otp = otp;
        await user.save();
  
        const { fullName } = user;
        const emailContent = generateNewAccountActivationEmail(fullName, activationLink);
        await sendEmail("New Verification Link", emailContent, email);
  
        return successResponse(res, "New verification link sent successfully to your email address!");
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
    
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return unauthorizeResponse(res, "User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return unauthorizeResponse(res, "Credentials were wrong!");
        } 
        // --- Token Creation ---
        const { accessToken, refreshToken } = await createJWTToken(user._id);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: SECURE_COOKIE === "true",
            sameSite: SAME_SITE,
        });
  
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: SECURE_COOKIE === "true",
            sameSite: SAME_SITE,
        });
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        return successResponse(res, "Login Successful", user);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}; 

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return errorResponse(res, "User not found!", 404);
        }
  
        return successResponse(res, "User fetched successfully", user);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
  
const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.loggedInUserId);
        if (!user) {
            return errorResponse(res, "User not found", 404);
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return errorResponse(res, "Old Password is incorrect!", 400);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.updatedAt = new Date();
        await user.save();
        const emailContent = passwordUpdateEmail(user.fullName, user.email);
        await sendEmail("Password Updated", emailContent, user.email);

        return successResponse(res, "Password Has Been Updated", {});
    } catch (error) {
        return errorResponse(res, error.message, 500);
    } 
};

const getResetPasswordLink = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, "User with this email does not exist.", 404);
        }
        const { fullName } = user;
        const token = jwt.sign({ email }, JWT_PRIVATE_KEY, { expiresIn: "30m" });
        const resetLink = `${FRONTEND_MAIN_URL}/reset-password?token=${token}`;

        const emailContent = generatePasswordResetEmail(fullName, resetLink);
        await sendEmail("Password Reset Request", emailContent, email);
        return successResponse(res, "Password reset link sent successfully to your email address.", {});
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}; 

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
        const { email } = decoded;
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, "User not found.", 400);
        }
        const isSameAsCurrentPassword = await bcrypt.compare(newPassword, user.password);
        if (isSameAsCurrentPassword) {
            return errorResponse(res, "New password must be different from the current password.", 400);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.updatedAt = new Date();
        await user.save();

        const emailContent = passwordResetConfirmationEmail(user.fullName, user.email);
        await sendEmail("Password Reset Successful", emailContent, user.email);

        return successResponse(res, "Password has been reset successfully.", {});
  
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return errorResponse(res, "Password reset link has expired.", 400);
        }
        return errorResponse(res, error.message, 500);
    }
};  

const me = async (req, res) => {
    try {
        if (req.method === "GET") {
            const user = await User.findById(req.loggedInUserId)
            if (!user) {
                return successResponse(res, "No data found for this user", user)
            }
            return successResponse(res, "User data fetched successfully!", user)
        }

        if (req.method === "PATCH") {
            try {
                const { fullName } = req.body;
                const user = await User.findById(req.loggedInUserId);
                if (!user) {
                    return errorResponse(res, "User not found", 404);
                }
                let profilePictureUrl = user.profilePicture;
                // Delete old and upload new profile picture ONLY if new file is uploaded
                if (req.file) {
                    if (user.profilePicture) {
                        const publicId = getPublicIdFromUrl(user.profilePicture);
                        if (publicId) {
                            await deleteFromCloudinary(publicId, "image");
                        }
                    }
      
                    try {
                        profilePictureUrl = await uploadToCloudinary(req.file, "image", "user-profile-pictures");
                    } catch (error) {
                        return errorResponse(res, "Failed to upload new profile picture", 500);
                    }
                }
                user.fullName = fullName || user.fullName;
                if (req.file) {
                    user.profilePicture = profilePictureUrl;
                }
                user.updatedAt = new Date();
                await user.save();
                return successResponse(res, "User data updated successfully!", user);
            } catch (error) {
                return errorResponse(res, "Internal Server Error", 500);
            }
        }
      
        if (req.method === "DELETE") {
            try {
                const userId = req.loggedInUserId;
      
                const user = await User.findById(userId);
                if (!user) {
                    return errorResponse(res, "User not found", 404);
                }

                // Delete profile picture from caludinary
                if (user?.profilePicture) {
                    const publicId = getPublicIdFromUrl(user.profilePicture);
                    if (publicId) {
                        await deleteFromCloudinary(publicId, "image");
                    }
                }
                
                const deletedUser = await User.findByIdAndDelete(userId);
                return successResponse(res, "User deleted successfully!", deletedUser);
            } catch (error) {
                return errorResponse(res, error.message, 500);
            }
        }
      
    } catch (error) {
        return errorResponse(res, error.message, 500)
    }
};

const logOut = async (req, res) => {
    try {
        const token = getAccessToken(req);

        if (!token) {
            return unauthorizeResponse(res, "Authentication token is required");
        }
  
        const decodedToken = verifyToken(token);
        if (!decodedToken || !decodedToken.exp) {
            return unauthorizeResponse(res, "Invalid or expired token");
        }
  
        const newBlacklistedToken = new BlackListToken({
            token,
            expire_time: decodedToken.exp,
        });
  
        await newBlacklistedToken.save();
  
        return successResponse(res, "Log out successfully");
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = getRefreshToken(req)
        const decoded = verifyToken(refreshToken)
        if (!decoded || !decoded.id || decoded.tokenType === "access") {
            return errorResponse(res, "Invalid refresh token", 403)
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return errorResponse(res, "User with this id does not exist", 400)
        }

        const newTokens = await createJWTToken(user._id)
        res.cookie("accessToken", newTokens.accessToken, {
            httpOnly: true,
            secure: SECURE_COOKIE === "true",
            sameSite: SAME_SITE,
        });

        res.cookie("refreshToken", newTokens.refreshToken, {
            httpOnly: true,
            secure: SECURE_COOKIE === "true",
            sameSite: SAME_SITE,
        });
        return successResponse(res, "New access and refresh tokens sent", {})
    } catch (error) {
        if (error.message === "TokenExpiredError") {
            return errorResponse(res, "Refresh token has expired", 401)
        } else if (error.message === "InvalidTokenError") {
            return errorResponse(res, "Invalid refresh token", 403)
        } else {
            return errorResponse(res, "Token verification failed", 500)
        }
    }
};


export {
  registerUser,
  verifyAccount,
  getNewAccountActivationLink,
  loginUser,
  updatePassword,
  getResetPasswordLink,
  resetPassword,
  me,
  logOut,
  refreshToken,
  getUserById,
}
