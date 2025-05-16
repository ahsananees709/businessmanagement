import express from "express";
import {
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
} from "../controllers/userController.js"
import { validationMiddleware } from "../middlewares/validationMiddleware.js"
import {
  authentication,
  checkUserIsAvailableAndVerified,
} from "../middlewares/authenticationMiddlewares.js";
import {
  registerUserSchema,
  verifyAccountSchema,
  getNewVerificationLinkSchema,
  loginUserSchema,
  updatePasswordSchema,
  resetPasswordLinkSchema,
  resetPasswordSchema,
  updateUserSchema,
} from "../validations/userValidations.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post(
  "/register",
  upload.single("profilePicture"),
  validationMiddleware(registerUserSchema, req => req.body),
  registerUser,
);

router.post(
  "/verify/:token",
  validationMiddleware(verifyAccountSchema, req => req.params),
  verifyAccount,
);

router.get(
  "/new-account-activation-link/:email",
  validationMiddleware(getNewVerificationLinkSchema, req => req.params),
  getNewAccountActivationLink,
);

router.post(
  "/login",
  validationMiddleware(loginUserSchema, req => req.body),
  checkUserIsAvailableAndVerified,
  loginUser,
);

router.patch(
  "/update-password",
  validationMiddleware(updatePasswordSchema, req => req.body),
  authentication,
  updatePassword,
);

router.get(
  "/get-reset-password-link/:email",
  checkUserIsAvailableAndVerified,
  validationMiddleware(resetPasswordLinkSchema, req => req.params),
  getResetPasswordLink,
);

router.patch(
  "/reset-password",
  validationMiddleware(resetPasswordSchema, req => req.body),
  resetPassword,
);

router
  .route("/me")
  .get(authentication, me)
  .patch(
    authentication,
    upload.single("profilePicture"),
    validationMiddleware(updateUserSchema, req => req.body),
    me,
      )
  .delete(authentication, me)


router.get("/:id", getUserById)

router.post("/logout", authentication, logOut)

router.post("/refresh-token", refreshToken);



export default router

