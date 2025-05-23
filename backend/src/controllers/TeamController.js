import Teams from "../../models/Teams.js";
import TeamMembers from "../../models/TeamMembers.js";
import TeamRoles from "../../models/TeamRoles.js";
import { successResponse, errorResponse } from "../utils/customResponses.js";
import BusinessMembers from "../../models/BusinessMembers.js";
import { TEAM_ROLES } from "../utils/constants.js";

export const createTeam = async (req, res) => {
    try {
        const business = req.params.businessId;
        if (!business) {
            return errorResponse(res, "Business id is required", 400);
        }
        const { name, description } = req.body;
        const createdBy = req.loggedInUserId;
        const findTeam = await Teams.findOne({ business, name });
        if (findTeam) {
            return errorResponse(res, "Team with this name already exists in your business", 400);
        }

        const team = await Teams.create({
            name,
            description,
            business,
            createdBy,
        });

        return successResponse(res, 'Team created successfully', team);
    
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const getAllTeams = async (req, res) => {
    try {
        const businessId = req.params.businessId;
        const teams = await Teams.find({ business: businessId })
            .populate({
                path: 'createdBy',
                populate: {
                    path: 'user',
                    select: 'fullName email'
                }
            });

        // Fetch members for each team
        const teamDetails = await Promise.all(
            teams.map(async (team) => {
                const members = await TeamMembers.find({ team: team._id })
                    .populate({
                        path: 'businessMember',
                        populate: {
                            path: 'user',
                            select: 'fullName email profilePicture'
                        }
                    })
                    .populate('role', 'name');

                return {
                    ...team.toObject(),
                    members
                };
            })
        );

        return successResponse(res, 'Teams fetched successfully', teamDetails);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const getTeamById = async (req, res) => {
  try {
    const teamId = req.params.teamId;

      const team = await Teams.findById(teamId);

      if (!team) {
          return errorResponse(res, 'Team not found', 404);
      }  

    const members = await TeamMembers.find({ team: teamId })
      .populate({
        path: 'businessMember',
        populate: {
          path: 'user',
          select: 'fullName email profilePicture'
        }
      })
      .populate('role', 'name')
      .lean();

    return successResponse(res, 'Team fetched successfully', {
      ...team,
      members
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateTeam = async (req, res) => {
  try {
      const teamId = req.params.teamId;
      if (!teamId) {
            return errorResponse(res, "Team id is required", 400);
        }
    const { name, description } = req.body;

    const updated = await Teams.findByIdAndUpdate(
      teamId,
      { name, description },
      { new: true }
    );

      if (!updated) {
           return errorResponse(res, 'Team not found', 404);
      }

    return successResponse(res, 'Team updated successfully', updated);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteTeam = async (req, res) => {
    try {
        const teamId = req.params.teamId;

        const deleted = await Teams.findByIdAndDelete(teamId);

        if (!deleted) {
            return errorResponse(res, 'Team not found', 404);
        }

        return successResponse(res, 'Team deleted successfully', deleted);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const assignUserToTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { businessMemberId, roleName, workingAs } = req.body;

        const team = await Teams.findById(teamId);
        if (!team) {
            return errorResponse(res, 'Team not found', 404);
        }
        const businessMember = await BusinessMembers.findById(businessMemberId);
        if (!businessMember) {
            return errorResponse(res, 'Business member not found', 404);
        }

        const existingMember = await TeamMembers.findOne({ team: teamId, businessMember: businessMemberId });
        if (existingMember) {
            return errorResponse(res, 'User is already in the team', 400);
        }

        const roleDoc = await getOrCreate(TeamRoles, roleName);

        if (roleDoc.name === TEAM_ROLES.TEAM_LEAD) {
            const existingLead = await TeamMembers.findOne({ team: teamId, role: roleDoc._id });
            return errorResponse(res, 'A team lead already exists in this team', 400);
        }

        const newMember = await TeamMembers.create({
            team: teamId,
            businessMember: businessMemberId,
            role: roleDoc._id,
            workingAs: workingAs || 'Team Member',
        });

        return successResponse(res, 'User assigned to team successfully', newMember);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const removeTeamMember = async (req, res) => {
    try {
        const { teamId, businessMemberId } = req.params;
        const loggedInBusinessMember = await BusinessMembers.findOne({ user: req.loggedInUserId });
        if (loggedInBusinessMember._id.toString() === businessMemberId) {
            return errorResponse(res, 'You cannot remove yourself from the team.', 403);
        }
        const member = await TeamMembers.findOneAndDelete({
            team: teamId,
            businessMember: businessMemberId,
        });

        if (!member) {
            return errorResponse(res, 'Team member not found.', 404);
        }

        return successResponse(res, 'Team member removed successfully.', member);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const updateTeamMemberRole = async (req, res) => {
    try {
        const { teamId, businessMemberId } = req.params;
        const { roleName, workingAs } = req.body;

        const memberToUpdate = await TeamMembers.findOne({ team: teamId, businessMember: businessMemberId }).populate('role');

        if (!memberToUpdate) {
            return errorResponse(res, 'Team member not found', 404);
        }

        // Update role if provided
        if (roleName) {
            const role = await getOrCreate(TeamRoles, roleName);

            if (role?.name === TEAM_ROLES.TEAM_LEAD) {
                const members = await TeamMembers.find({ team: teamId }).populate('role');
                const currentLead = members.find(m => m.role?.name === TEAM_ROLES.TEAM_LEAD);

                if (currentLead && currentLead.businessMember.toString() !== businessMemberId) {
                    const memberRole = await getOrCreate(TeamRoles, TEAM_ROLES.TEAM_MEMBER);
                    currentLead.role = memberRole._id;
                    await currentLead.save();
                }
            }

            memberToUpdate.role = role._id;
        }

        // Update workingAs if provided
        if (workingAs) {
            memberToUpdate.workingAs = workingAs;
        }

        await memberToUpdate.save();

        return successResponse(res, 'Team member updated successfully', memberToUpdate);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const getAllTeamMembers = async (req, res) => {
    try {
        const { teamId } = req.params;

        const members = await TeamMembers.find({ team: teamId })
            .populate('businessMember')
            .populate('role');

        return successResponse(res, 'Team members fetched successfully', members);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

export const getTeamMemberById = async (req, res) => {
    try {
        const { teamId, businessMemberId } = req.params;

        const member = await TeamMembers.findOne({
            team: teamId,
            businessMember: businessMemberId
        })
            .populate('businessMember')
            .populate('role');

        if (!member) {
            return errorResponse(res, 'Team member not found', 404);
        }
        return successResponse(res, 'Team member fetched successfully', member);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

