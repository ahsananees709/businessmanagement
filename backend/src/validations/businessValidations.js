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


export {
  createBusinessSchema,
  getBusinessByIdSchema,
  updateBusinessSchema,
  deleteBusinessByIdSchema,
  getNewVerificationLinkSchema
}
