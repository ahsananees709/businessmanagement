import { z } from "zod"

const createBusinessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .regex(/^[A-Za-z\s]+$/),
  type: z.string().trim().min(1),
  description:z.string().trim().optional()
})

const getBusinessByIdSchema = z.object({
    id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid business ID format"),
})
  
const updateBusinessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .regex(/^[A-Za-z\s]+$/)
    .optional(),
  type: z.string().trim().min(1).optional(),
  description:z.string().trim().optional()
})

const deleteBusinessByIdSchema = z.object({
  id: z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid business ID format"),
})

export const sendBusinessInviteSchema = z.object({
  businessId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid business ID format"),

  targetUserEmail: z
    .string()
    .email("Invalid email address"),

  targetUserRole: z.enum(["admin", "client", "employee"]),
});

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
   
  })
  .refine(data => data.oldPassword !== data.newPassword, {
    message: "New password must be different from the old password",
  })

const resetPasswordLinkSchema = z.object({
  email: z.string().email("Invalid email").min(1).trim(),
})

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),

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
    createBusinessSchema,
  getBusinessByIdSchema,
  updateBusinessSchema,
    deleteBusinessByIdSchema,
  getNewVerificationLinkSchema,
  loginUserSchema,
  updatePasswordSchema,
  resetPasswordLinkSchema,
  resetPasswordSchema,
  updateUserSchema,
}
