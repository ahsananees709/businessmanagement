import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import Business from "../../models/Business.js";
import BusinessRoles from "../../models/BusinessRoles.js";
import BusinessMembers from "../../models/BusinessMembers.js";
import { uploadToCloudinary } from "../utils/cloudinaryFunctions.js";
import { getOrCreate } from "../utils/customDatabaseQueries.js";
import { successResponse, errorResponse } from "../utils/customResponses.js";
import { BUSINESS_ROLES, FRONTEND_MAIN_URL, JWT_PRIVATE_KEY } from "../utils/constants.js";
import sendEmail from '../utils/sendEmail.js';
import { businessInviteExistingUser, businessInviteNewUser } from '../utils/emailTemplates.js';

export const createBusiness = async (req, res) => {
    try {
        const { name, type, description } = req.body;
        const createdBy = req.loggedInUserId;
  
        let logo = '';
        let banner = '';
  
        if (req.files?.logo?.[0]) {
            try {
                const result = await uploadToCloudinary(req.files.logo[0], "image", "businessmanagement/business/logos");
                logo = result;
            } catch (error) {
                return errorResponse(res, "Logo upload failed", 500);
            }
        }
  
        if (req.files?.banner?.[0]) {
            try {
                const result = await uploadToCloudinary(req.files.banner[0], "image", "businessmanagement/business/banners");
                banner = result;
            } catch (error) {
                return errorResponse(res, "Banner upload failed", 500);
            }
        }
  
        const business = await Business.create({
            name,
            type,
            description,
            logo,
            banner,
            createdBy
        });
  
        const superAdminRole = await getOrCreate(BusinessRoles, BUSINESS_ROLES.SUPER_ADMIN);
        if (!superAdminRole) {
            return errorResponse(res, "Super admin role not found", 404)
        }
  
        await BusinessMembers.create({
            user: createdBy,
            business: business._id,
            role: superAdminRole._id
        });
        return successResponse(res, "Business Created Successfully!", business);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
  
export const getBusinessById = async (req, res) => {
    try {
        const fetcherId = req.loggedInUserId;
        const businessId = req.params.id
                
        const business = await Business.findById(businessId).populate('createdBy');
        if (!business)
            return errorResponse(res, "Business not found", 404);

        const isMember = await BusinessMembers.findOne({
            user: fetcherId,
            business: businessId
          });
      
          if (!isMember) {
            return errorResponse(res, "Access denied: You are not a member of this business", 403);
        }

        return successResponse(res, "Business fetched!", business);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const getAllBusinessesOfUser = async (req, res) => {
  try {
    const userId = req.loggedInUserId;
    const memberships = await BusinessMembers.find({ user: userId })
      .populate('business')
      .populate('role');

    const ownedBusinesses = [];
    const joinedBusinesses = [];

    memberships.forEach(member => {
      const businessInfo = {
        business: member.business,
        role: member.role?.name || "unknown"
      };

      if (member.role?.name === 'super_admin') {
        ownedBusinesses.push(businessInfo);
      } else {
        joinedBusinesses.push(businessInfo);
      }
    });

    return successResponse(res, "Businesses fetched successfully", {
      ownedBusinesses,
      joinedBusinesses
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateBusiness = async (req, res) => {
    try {
        const businessId = req.params.id
        const { name, type, description } = req.body;
        const business = await Business.findById({ businessId })
        
        let logo = business?.logo;
        // Update logo if available
        if (req.files?.logo?.[0]) {
            if (business?.logo) {
                const publicId = getPublicIdFromUrl(business.logo);
                if (publicId) {
                    await deleteFromCloudinary(publicId, "image");
                }
            }

            try {
                logo = await uploadToCloudinary(req.file, "image", "businessmanagement/business/logos");
                business.logo = logo
            } catch (error) {
                return errorResponse(res, "Logo upload failed!", 500);
            }
        }
        
        let banner = business?.banner;
        // Update banner if available
        if (req.files?.banner?.[0]) {
            if (business?.banner) {
                const publicId = getPublicIdFromUrl(business.banner);
                if (publicId) {
                    await deleteFromCloudinary(publicId, "image");
                }
            }

            try {
                banner = await uploadToCloudinary(req.file, "image", "businessmanagement/business/banners");
                business.banner = banner
            } catch (error) {
                return errorResponse(res, "Banner upload failed!", 500);
            }
        }

        business.name = name || business.name;
        business.type = type || business.type;
        business.description = description || business.description;
        business.updatedAt = new Date();

        await business.save();

        return successResponse(res, "Business Updated Successfully!", business);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const deleteBusiness = async (req, res) => {
    try {
        const businessId = req.params.businessId;
        
        const business = await Business.findById(businessId);
        if (!business) {
            return errorResponse(res, "Business not found", 404);
        }
        if (business?.logo) {
            const publicId = getPublicIdFromUrl(business.logo);
            if (publicId) {
                await deleteFromCloudinary(publicId, "image");
            }
        }
        if (business?.banner) {
            const publicId = getPublicIdFromUrl(business.banner);
            if (publicId) {
                await deleteFromCloudinary(publicId, "image");
            }
        }
                  
        const deletedBusiness = await business.findByIdAndDelete(businessId);
        return successResponse(res, "User deleted successfully!", deletedBusiness);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const sendBusinessInvite = async (req, res) => {
    try {
        const { businessId, targetUserEmail, targetUserRole } = req.body;
  
        if (targetUserRole === BUSINESS_ROLES.SUPER_ADMIN) {
            return errorResponse(res, "You can't assign Super Admin role to others", 403);
        }
  
        const business = await Business.findById(businessId);
        if (!business) {
            return errorResponse(res, "Business not found", 404);
        }
  
        const roleDoc = await getOrCreate(BusinessRoles, targetUserRole);
        if (!roleDoc) {
            return errorResponse(res, "Invalid role", 400);
        }
  
        const targetUser = await User.findOne({ email: targetUserEmail });
  
        if (targetUser) {
            const alreadyMember = await BusinessMembers.findOne({
                user: targetUser._id,
                business: businessId,
            });
  
            if (alreadyMember) {
                return errorResponse(res, "User is already a member of this business", 400);
            }
  
            // Generate token
            const token = jwt.sign(
                {
                    userId: targetUser._id,
                    businessId: businessId,
                    roleId: roleDoc._id,
                },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );
  
            const inviteUrl = `${FRONTEND_MAIN_URL}/invite/businessjoin?token=${token}`;
  
            // Send email to existing user
            const emailContent = businessInviteExistingUser(business.name, inviteUrl);
            await sendEmail("You're invited to join a business", emailContent, targetUser.email);
  
            return successResponse(res, "Invitation sent to existing user");
        } else {
            // signup invite
            const signupLink = `${FRONTEND_MAIN_URL}/signup?businessId=${businessId}&businessRoleId=${roleDoc._id}`;
            const emailContent = businessInviteNewUser(business.name, signupLink);
  
            await sendEmail("Join our platform", emailContent, targetUserEmail);
  
            return successResponse(res, "Signup invitation sent to new user");
        }
    } catch (error) {
        console.error(error);
        return errorResponse(res, error.message, 500);
    }
};

export const joinBusinessByInvite = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return errorResponse(res, "Token is required", 403);
        }
  
        const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
        const { userId, businessId, roleId } = decoded;
  
        const user = await User.findById(userId);
        if (!user) {
            return errorResponse(res, "User not found.", 404);
        }
  
        const existing = await BusinessMembers.findOne({
            user: userId,
            business: businessId,
        });
  
        if (existing) {
            return errorResponse(res, "User is already a member of this business", 400);
        }
  
        const newMember = await BusinessMembers.create({
            user: userId,
            business: businessId,
            role: roleId,
        });
  
        return successResponse(res, "User added to business", newMember);
    } catch (error) {
        console.error(error);
        return errorResponse(res, "Invalid or expired token", 400);
    }
};