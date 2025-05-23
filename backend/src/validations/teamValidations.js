import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const createTeamSchema = z.object({
  name: z.string().trim().min(1).regex(/^[A-Za-z0-9\s]+$/, "Invalid team name"),
  description: z.string().trim().optional(),
});

const getAllTeamsSchema = z.object({
  businessId: objectIdSchema,
});

const getTeamByIdSchema = z.object({
  teamId: objectIdSchema,
});

const updateTeamSchema = z.object({
  name: z.string().trim().min(1).regex(/^[A-Za-z0-9\s]+$/, "Invalid team name").optional(),
  description: z.string().trim().optional(),
});

const deleteTeamByIdSchema = z.object({
  teamId: objectIdSchema,
});

// --- Team Member Schemas ---

const assignUserToTeamSchema = z.object({
  businessMemberId: objectIdSchema,
  roleName: z.string().trim().min(1),
  workingAs: z.string().trim().optional(),
});

const removeTeamMemberSchema = z.object({
  teamId: objectIdSchema,
  businessMemberId: objectIdSchema,
});

const updateTeamMemberRoleSchema = z.object({
  roleName: z.string().trim().optional(),
  workingAs: z.string().trim().optional(),
}).refine(data => data.roleName || data.workingAs, {
  message: "At least one of roleName or workingAs is required",
});

// --- Team Member Getters ---

const getAllTeamMembersSchema = z.object({
  teamId: objectIdSchema,
});

const getTeamMemberByIdSchema = z.object({
  teamId: objectIdSchema,
  businessMemberId: objectIdSchema,
});

export {
    createTeamSchema,
    getAllTeamsSchema,
    getTeamByIdSchema,
    updateTeamSchema,
    deleteTeamByIdSchema,
    assignUserToTeamSchema,
    removeTeamMemberSchema,
    updateTeamMemberRoleSchema,
    getAllTeamMembersSchema,
    getTeamMemberByIdSchema
}