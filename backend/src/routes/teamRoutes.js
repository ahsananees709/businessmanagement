import express from 'express';
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  assignUserToTeam,
  removeTeamMember,
  updateTeamMemberRole,
  getAllTeamMembers,
  getTeamMemberById
} from '../controllers/TeamController.js';
import {
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
} from '../validations/teamValidations.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { authentication } from '../middlewares/authenticationMiddlewares.js';
import { authorizeTeamRole, authorizeBusinessRole, authorizeBusinessOrTeamRole } from '../middlewares/authenticationMiddlewares.js';
import { BUSINESS_ROLES, TEAM_ROLES } from '../utils/constants.js';

const router = express.Router();

// Team routes
router.post(
    '/:businessId',
    authentication,
    validationMiddleware(createTeamSchema, req => req.body),
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN]),
    createTeam
);

router.get(
    '/all/:businessId',
    authentication,
    validationMiddleware(getAllTeamsSchema, req => req.params),
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN]),
    getAllTeams
);

router.get(
    '/:teamId',
    authentication,
    validationMiddleware(getTeamByIdSchema, req => req.params),
    getTeamById
);

router.patch(
    '/:teamId',
    authentication,
    validationMiddleware(updateTeamSchema, req => req.body),
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN]),
    updateTeam
);

router.delete(
    '/:teamId',
    authentication,
    validationMiddleware(deleteTeamByIdSchema, req => req.params),
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN]),
    deleteTeam
);

// Team members
router.post(
    '/:teamId/assign',
    authentication,
    validationMiddleware(assignUserToTeamSchema, req=> req.body),
    authorizeBusinessOrTeamRole(
        [BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN],
        [TEAM_ROLES.TEAM_LEAD]
    ),
    assignUserToTeam
);

router.delete(
    '/:teamId/members/:businessMemberId',
    authentication,
    validationMiddleware(removeTeamMemberSchema, req => req.params),
    authorizeBusinessOrTeamRole(
        [BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN],
        [TEAM_ROLES.TEAM_LEAD]
    ),
    removeTeamMember
);

router.patch(
    '/:teamId/members/:businessMemberId/role',
    authentication,
    validationMiddleware(updateTeamMemberRoleSchema, req => req.body),
    authorizeBusinessOrTeamRole(
        [BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN],
        [TEAM_ROLES.TEAM_LEAD]
    ),
    updateTeamMemberRole
);

router.get(
    '/:teamId/members',
    authentication,
    validationMiddleware(getAllTeamMembersSchema, req => req.params),
    getAllTeamMembers
);

router.get(
    '/:teamId/members/:businessMemberId',
    authentication,
    validationMiddleware(getTeamMemberById, req => req.params),
    getTeamMemberById
);

export default router;
