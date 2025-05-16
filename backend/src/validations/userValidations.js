import { optional, z } from "zod"

const passwordContainsMixture = value => {
  if (typeof value !== "string") return false

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/

  return passwordRegex.test(value)
}

const registerUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1)
    .regex(/^[A-Za-z\s]+$/),
  email: z.string().trim().min(1).email(),
  password: z.string().trim().min(8).refine(passwordContainsMixture, {
    message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
  }),
  businessId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid business ID format")
    .optional(),
  businessRoleId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid business role ID format")
    .optional(),
})

const verifyAccountSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
})

const getNewVerificationLinkSchema = z.object({
  email: z.string().min(1).email(),
})

const loginUserSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
})

const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(8),
    newPassword: z.string().trim().min(8).refine(passwordContainsMixture, {
      message: "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
    }),
  })
  .refine(data => data.oldPassword !== data.newPassword, {
    message: "New password must be different from the old password",
  })

const resetPasswordLinkSchema = z.object({
  email: z.string().email("Invalid email").min(1).trim(),
})

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().trim().min(8).refine(passwordContainsMixture, {
    message: "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
  }),
})

const updateUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1)
    .regex(/^[A-Za-z\s]+$/, { message: "Only alphabets are allow!" })
    .optional(),
})

export {
  registerUserSchema,
  verifyAccountSchema,
  getNewVerificationLinkSchema,
  loginUserSchema,
  updatePasswordSchema,
  resetPasswordLinkSchema,
  resetPasswordSchema,
  updateUserSchema,
}
