import { getAccessToken, verifyToken } from "../utils/helper.js"
import { errorResponse, unauthorizeResponse } from "../utils/customResponses.js"
import User from "../../models/User.js"
import BusinessMembers from "../../models/BusinessMembers.js"
import BusinessRoles from "../../models/BusinessRoles.js"
import BlackListToken from "../../models/BlackListToken.js"

const authentication = async (req, res, next) => {
  try {
    const token = getAccessToken(req)
    
    if (!token) {
      return unauthorizeResponse(res, "Authentication token is required")
    }
    const invalidToken = await BlackListToken.findOne({ token });
    if (invalidToken) {
      return unauthorizeResponse(res, "Unauthorize! Invalid Token")
    }
    let decodedToken

    try {
      decodedToken = verifyToken(token)
      if (decodedToken.tokenType === "refresh") {
        return unauthorizeResponse(res, "Invalid token! Refresh tokens cannot be used for authorization")
      }
    } catch (error) {
      if (error.message === "TokenExpiredError") {
        return unauthorizeResponse(res, "Token has expired")
      }
      if (error.message === "InvalidTokenError") {
        return unauthorizeResponse(res, "Invalid token")
      }
      return unauthorizeResponse(res, "Token verification failed")
    }

    const data = await User.findById(decodedToken.id)

    if (!data) {
      return unauthorizeResponse(res, "Unauthorize! User not Found")
    }
    // Sending LoggedIn user in the next middleware
    req.loggedInUserId = data._id
    next()
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

const authorizeBusinessRole = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const userId = req.loggedInUserId;
      const businessId = req.params.id || req.body.businessId;

      if (!businessId) {
        return errorResponse(res, "Business ID is required", 400);
      }

      const member = await BusinessMembers.findOne({ user: userId, business: businessId }).populate('role');

      if (!member) {
        return errorResponse(res, "You are not a member of this business", 403);
      }
      const userRole = member.role?.name;

      if (!allowedRoles.includes(userRole)) {
        return errorResponse(res, `Access denied: must be ${allowedRoles.join(' or ')}`, 403);
      }
      next();
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  };
};

const checkUserIsAvailableAndVerified = async (req, res, next) => {
  try {
    let email = req?.body?.email || req?.params?.email;
    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, "Unknown User! There is no user registered with provided email address.", 409);
    }

    if (!user.isVerified) {
      return errorResponse(res, "User not verified", 403);
    }

    next();
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export { authentication, checkUserIsAvailableAndVerified, authorizeBusinessRole }
