import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  AvatarGroup,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Checkbox,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import { Visibility, Edit, Delete, Close, Cancel } from "@mui/icons-material";
import { Link, useParams, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

// Sample data for teams
const teams = [
  {
    name: "Zia ud din Team",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut fringilla amet risus vel mollis molestie sed pharetra. In nunc nec adipiscing.",
    members: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
      "https://randomuser.me/api/portraits/men/5.jpg",
    ],
    projects: "Project Name",
  },
  {
    name: "Gulzar Team",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut fringilla amet risus vel mollis molestie sed pharetra. In nunc nec adipiscing.",
    members: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
      "https://randomuser.me/api/portraits/men/5.jpg",
    ],
    projects: "Project Name",
  },
];

// Sample data for members (email addresses for multi-select)
const memberOptions = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "alice.jones@example.com",
  "bob.wilson@example.com",
  "emma.brown@example.com",
];

// Sample data for team leads (for single-select)
const teamLeadOptions = [
  "John Doe",
  "Jane Smith",
  "Alice Jones",
  "Bob Wilson",
  "Emma Brown",
];

// Sample data for project members (for the new table)
const initialProjectMembers = [
  {
    memberName: "John Doe",
    companyName: "Zaka Dairy Farm",
    jobTitle: "Manager",
    email: "john.doe@example.com",
  },
  {
    memberName: "Jane Smith",
    companyName: "Zaka Dairy Farm",
    jobTitle: "Analyst",
    email: "jane.smith@example.com",
  },
  {
    memberName: "Alice Jones",
    companyName: "Zaka Dairy Farm",
    jobTitle: "Developer",
    email: "alice.jones@example.com",
  },
];

const GroupMembers = () => {
  const { businessId } = useParams();
  const location = useLocation();
  const userRole = location.state?.userRole || "Super Admin";

  // State for team creation modal
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamLead, setTeamLead] = useState("");

  // State for project members table
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectMembers, setProjectMembers] = useState(initialProjectMembers);

  // State for change role modal
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newRole, setNewRole] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteMember = (memberToDelete) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member !== memberToDelete)
    );
  };

  const handleCreateTeam = () => {
    console.log({
      teamName,
      description,
      selectedMembers,
      teamLead,
    });
    setTeamName("");
    setDescription("");
    setSelectedMembers([]);
    setTeamLead("");
    handleClose();
  };

  // Toggle project members table
  const handleProjectClick = (projectName) => {
    setSelectedProject(selectedProject === projectName ? null : projectName);
  };

  // Open change role modal
  const handleOpenRoleModal = (member) => {
    setSelectedMember(member);
    setNewRole(member.jobTitle);
    setRoleModalOpen(true);
  };

  // Close change role modal
  const handleCloseRoleModal = () => {
    setRoleModalOpen(false);
    setSelectedMember(null);
    setNewRole("");
  };

  // Save new role
  const handleSaveRole = () => {
    if (selectedMember) {
      setProjectMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.email === selectedMember.email
            ? { ...member, jobTitle: newRole }
            : member
        )
      );
    }
    handleCloseRoleModal();
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar userRole={userRole} businessId={businessId} />

      <Box
        sx={{
          marginLeft: { xs: "50px", sm: "60px", md: "95px" },
          width: {
            xs: "calc(100% - 50px)",
            sm: "calc(100% - 60px)",
            md: "calc(100% - 80px)",
          },
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#F5F7FA",
        }}
      >
        {/* Teams Content */}
        <Box
          sx={{
            marginTop: { xs: "70px", md: "100px" },
            padding: { xs: "10px 15px", sm: "15px 20px", md: "20px 40px" },
            maxWidth: { xs: "100%", sm: "90%", md: "1200px" },
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Header */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1F2937",
              fontSize: { xs: "1rem", sm: "1.1rem", md: "2rem" },
            }}
          >
            Teams in Zaka Dairy Farm
          </Typography>

          {/* Breadcrumb Navigation */}
          <Typography
            sx={{
              mt: 1,
              fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
            }}
          >
            <Link
              to="/dashboard"
              style={{ color: "#6B7280", textDecoration: "none" }}
            >
              Home
            </Link>{" "}
            /{" "}
            <Link
              to={`/business/${businessId}`}
              style={{ color: "#6B7280", textDecoration: "none" }}
            >
              Zaka Dairy Farm
            </Link>{" "}
            /{" "}
            <Link
              to={`/groupmembers/${businessId}`}
              style={{ color: "#6B7280", textDecoration: "none" }}
            >
              Teams
            </Link>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                backgroundColor: "#8BD4E7",
                color: "black",
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                padding: { xs: "6px 12px", sm: "8px 16px" },
                height: { xs: "36px", sm: "40px" },
                fontSize: { xs: "12px", sm: "14px" },
                "&:hover": {
                  backgroundColor: "#D1E9FF",
                },
              }}
            >
              + Create New Team
            </Button>
          </Box>

          {/* Modal for Creating New Team */}
          <Modal
            open={open}
            onClose={handleClose}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: { xs: "10px", sm: "0" },
            }}
          >
            <Box
              sx={{
                width: { xs: "90%", sm: "400px", md: "450px" },
                maxHeight: "90vh",
                overflowY: "auto",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                padding: { xs: "15px", sm: "20px" },
                position: "relative",
              }}
            >
              {/* Modal Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: { xs: "16px", sm: "18px" },
                  }}
                >
                  Create New Team
                </Typography>
                <IconButton onClick={handleClose}>
                  <Close
                    sx={{
                      color: "black",
                      fontSize: { xs: "20px", sm: "24px" },
                    }}
                  />
                </IconButton>
              </Box>

              {/* Modal Form */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
                {/* Team Name */}
                <Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: { xs: "11px", sm: "14px" },
                      mb: 1,
                    }}
                  >
                    Team Name
                  </Typography>
                  <TextField
                    placeholder="Enter Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "black",
                          borderRadius: "30px",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                        borderRadius: "30px",
                        height: { xs: "36px", sm: "40px" },
                      },
                      "& .MuiInputBase-input": {
                        padding: { xs: "8px 12px", sm: "10px 14px" },
                        fontSize: { xs: "12px", sm: "14px" },
                        color: "black",
                      },
                    }}
                  />
                </Box>

                {/* Description */}
                <Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: { xs: "11px", sm: "14px" },
                      mb: 1,
                    }}
                  >
                    Description
                  </Typography>
                  <TextField
                    placeholder="Write Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "black",
                          borderRadius: "12px",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                        borderRadius: "12px",
                      },
                      "& .MuiInputBase-input": {
                        padding: { xs: "8px 12px", sm: "10px 14px" },
                        fontSize: { xs: "12px", sm: "14px" },
                        color: "black",
                      },
                    }}
                  />
                </Box>

                {/* Members (Multi-Select with Checkboxes) */}
                <Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: { xs: "11px", sm: "14px" },
                      mb: 1,
                    }}
                  >
                    Members (multi-select)
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={selectedMembers}
                      onChange={(e) => setSelectedMembers(e.target.value)}
                      variant="outlined"
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              onDelete={() => handleDeleteMember(value)}
                              deleteIcon={
                                <Cancel
                                  sx={{
                                    color: "black !important",
                                    fontSize: { xs: "14px", sm: "16px" },
                                  }}
                                />
                              }
                              sx={{
                                backgroundColor: "#E5E7EB",
                                color: "black",
                                fontSize: { xs: "10px", sm: "12px" },
                                height: { xs: "20px", sm: "24px" },
                                "& .MuiChip-label": {
                                  padding: { xs: "0 6px", sm: "0 8px" },
                                },
                              }}
                            />
                          ))}
                        </Box>
                      )}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                          borderRadius: "30px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#3B82F6",
                        },
                        borderRadius: "30px",
                        "& .MuiSelect-select": {
                          padding: { xs: "8px 12px", sm: "10px 14px" },
                          fontSize: { xs: "12px", sm: "14px" },
                          color: "black",
                        },
                      }}
                    >
                      {memberOptions.map((email) => (
                        <MenuItem key={email} value={email}>
                          <Checkbox
                            checked={selectedMembers.indexOf(email) > -1}
                            sx={{
                              color: "black",
                              "&.Mui-checked": {
                                color: "black",
                              },
                              padding: { xs: "4px", sm: "6px" },
                            }}
                          />
                          <ListItemText
                            primary={email}
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: { xs: "12px", sm: "14px" },
                                color: "black",
                              },
                            }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Team Lead (Optional Single-Select) */}
                <Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: { xs: "11px", sm: "14px" },
                      mb: 1,
                    }}
                  >
                    Team Lead (optional)
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={teamLead}
                      onChange={(e) => setTeamLead(e.target.value)}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                          borderRadius: "30px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#3B82F6",
                        },
                        borderRadius: "30px",
                        "& .MuiSelect-select": {
                          padding: { xs: "8px 12px", sm: "10px 14px" },
                          fontSize: { xs: "12px", sm: "14px" },
                          color: "black",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em
                          style={{
                            color: "black",
                            fontSize: { xs: "12px", sm: "14px" },
                          }}
                        >
                          -Select-
                        </em>
                      </MenuItem>
                      {teamLeadOptions.map((lead) => (
                        <MenuItem
                          key={lead}
                          value={lead}
                          sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                            color: "black",
                          }}
                        >
                          {lead}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Create Team Button */}
                <Button
                  variant="contained"
                  onClick={handleCreateTeam}
                  sx={{
                    backgroundColor: "#8BD4E7",
                    color: "black",
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: { xs: "6px 12px", sm: "8px 16px" },
                    mt: 1,
                    fontSize: { xs: "12px", sm: "14px" },
                    "&:hover": {
                      backgroundColor: "#D1E9FF",
                    },
                  }}
                >
                  Create Team
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Modal for Changing Role */}
          <Modal
            open={roleModalOpen}
            onClose={handleCloseRoleModal}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: { xs: "10px", sm: "0" },
            }}
          >
            <Box
              sx={{
                width: { xs: "90%", sm: "400px" },
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                padding: { xs: "15px", sm: "20px" },
                position: "relative",
              }}
            >
              {/* Modal Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: { xs: "16px", sm: "18px" },
                  }}
                >
                  Change Role
                </Typography>
                <IconButton onClick={handleCloseRoleModal}>
                  <Close
                    sx={{
                      color: "black",
                      fontSize: { xs: "20px", sm: "24px" },
                    }}
                  />
                </IconButton>
              </Box>

              {/* Modal Form */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
                {/* Change Role Input */}
                <Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: { xs: "11px", sm: "14px" },
                      mb: 1,
                    }}
                  >
                    Change Role
                  </Typography>
                  <TextField
                    placeholder="Enter New Role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "black",
                          borderRadius: "30px",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3B82F6",
                        },
                        borderRadius: "30px",
                        height: { xs: "36px", sm: "40px" },
                      },
                      "& .MuiInputBase-input": {
                        padding: { xs: "8px 12px", sm: "10px 14px" },
                        fontSize: { xs: "12px", sm: "14px" },
                        color: "black",
                      },
                    }}
                  />
                </Box>

                {/* Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleCloseRoleModal}
                    sx={{
                      borderColor: "#6B7280",
                      color: "#6B7280",
                      borderRadius: "30px",
                      textTransform: "none",
                      fontWeight: "bold",
                      padding: { xs: "6px 12px", sm: "8px 16px" },
                      fontSize: { xs: "12px", sm: "14px" },
                      "&:hover": {
                        borderColor: "#3B82F6",
                        color: "#3B82F6",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSaveRole}
                    sx={{
                      backgroundColor: "#8BD4E7",
                      color: "black",
                      borderRadius: "30px",
                      textTransform: "none",
                      fontWeight: "bold",
                      padding: { xs: "6px 12px", sm: "8px 16px" },
                      fontSize: { xs: "12px", sm: "14px" },
                      "&:hover": {
                        backgroundColor: "#D1E9FF",
                      },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>

          {/* Teams Display */}
          <Box>
            {/* Card Layout for xs screens */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" }, // Show on xs, hide on sm+
              }}
            >
              {teams.map((team, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#1F2937",
                        }}
                      >
                        {team.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
                          Members:
                        </Typography>
                        <Box>
                          {team.members && team.members.length > 0 ? (
                            <AvatarGroup max={4}>
                              {team.members.map((member, idx) => (
                                <Avatar
                                  key={idx}
                                  src={member}
                                  sx={{ width: "24px", height: "24px" }}
                                />
                              ))}
                            </AvatarGroup>
                          ) : (
                            <Typography
                              sx={{ color: "#6B7280", fontSize: "12px" }}
                            >
                              No Members
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
                          Projects:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#1F2937",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => handleProjectClick(team.projects)}
                        >
                          {team.projects}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <Typography sx={{ fontSize: "12px", color: "#6B7280" }}>
                          Actions:
                        </Typography>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          <IconButton size="small">
                            <Visibility
                              sx={{ color: "#6B7280", fontSize: "18px" }}
                            />
                          </IconButton>
                          <IconButton size="small">
                            <Edit sx={{ color: "#6B7280", fontSize: "18px" }} />
                          </IconButton>
                          <IconButton size="small">
                            <Delete
                              sx={{ color: "#6B7280", fontSize: "18px" }}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Table Layout for sm screens and above */}
            <TableContainer
              sx={{
                display: { xs: "none", sm: "block" }, // Hide on xs, show on sm+
                border: "1px solid #28272F",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#8BD4E7" }}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#1F2937",
                        fontSize: { sm: "12px", md: "14px" },
                        borderBottom: "2px solid #E5E7EB",
                        minWidth: "120px",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#1F2937",
                        fontSize: { sm: "12px", md: "14px" },
                        borderBottom: "2px solid #E5E7EB",
                        minWidth: "200px",
                        maxWidth: "300px",
                        display: { sm: "table-cell", md: "table-cell" },
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#1F2937",
                        fontSize: { sm: "12px", md: "14px" },
                        borderBottom: "2px solid #E5E7EB",
                        minWidth: "120px",
                      }}
                    >
                      Members
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#1F2937",
                        fontSize: { sm: "12px", md: "14px" },
                        borderBottom: "2px solid #E5E7EB",
                        minWidth: "120px",
                      }}
                    >
                      Projects Linked
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#1F2937",
                        fontSize: { sm: "12px", md: "14px" },
                        borderBottom: "2px solid #E5E7EB",
                        minWidth: "100px",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team, index) => (
                    <TableRow
                      key={index}
                      sx={{ height: { sm: "70px", md: "80px" } }}
                    >
                      {/* Name */}
                      <TableCell
                        sx={{
                          fontSize: { sm: "12px", md: "14px" },
                          color: "#1F2937",
                          borderBottom: "1px solid #E5E7EB",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Typography
                          sx={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => handleProjectClick(team.name)}
                        >
                          {team.name}
                        </Typography>
                      </TableCell>
                      {/* Description */}
                      <TableCell
                        sx={{
                          fontSize: { sm: "12px", md: "14px" },
                          color: "#6B7280",
                          borderBottom: "1px solid #E5E7EB",
                          minWidth: "200px",
                          maxWidth: "300px",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          display: { sm: "table-cell", md: "table-cell" },
                        }}
                      >
                        {team.description}
                      </TableCell>
                      {/* Members */}
                      <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                        {team.members && team.members.length > 0 ? (
                          <AvatarGroup max={4}>
                            {team.members.map((member, idx) => (
                              <Avatar
                                key={idx}
                                src={member}
                                sx={{
                                  width: { sm: "28px", md: "32px" },
                                  height: { sm: "28px", md: "32px" },
                                }}
                              />
                            ))}
                          </AvatarGroup>
                        ) : (
                          <Typography
                            sx={{
                              color: "#6B7280",
                              fontSize: { sm: "12px", md: "14px" },
                            }}
                          >
                            No Members
                          </Typography>
                        )}
                      </TableCell>
                      {/* Projects Linked */}
                      <TableCell
                        sx={{
                          fontSize: { sm: "12px", md: "14px" },
                          color: "#1F2937",
                          borderBottom: "1px solid #E5E7EB",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {team.projects}
                      </TableCell>
                      {/* Actions */}
                      <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                        <Box
                          sx={{ display: "flex", gap: { sm: "0.5", md: "1" } }}
                        >
                          <IconButton size="small">
                            <Visibility
                              sx={{
                                color: "#6B7280",
                                fontSize: { sm: "18px", md: "20px" },
                              }}
                            />
                          </IconButton>
                          <IconButton size="small">
                            <Edit
                              sx={{
                                color: "#6B7280",
                                fontSize: { sm: "18px", md: "20px" },
                              }}
                            />
                          </IconButton>
                          <IconButton size="small">
                            <Delete
                              sx={{
                                color: "#6B7280",
                                fontSize: { sm: "18px", md: "20px" },
                              }}
                            />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Project Members Table (Displayed when a project is clicked) */}
            {selectedProject && (
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1F2937",
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.5rem" },
                    mb: 2,
                  }}
                >
                  Members of {selectedProject}
                </Typography>

                {/* Card Layout for xs screens */}
                <Box
                  sx={{
                    display: { xs: "block", sm: "none" }, // Show on xs, hide on sm+
                  }}
                >
                  {projectMembers.map((member, index) => (
                    <Card
                      key={index}
                      sx={{
                        mb: 2,
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              color: "#1F2937",
                            }}
                          >
                            {member.memberName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              Company:
                            </Typography>
                            <Typography
                              sx={{ fontSize: "12px", color: "#1F2937" }}
                            >
                              {member.companyName}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              Job Title:
                            </Typography>
                            <Typography
                              sx={{ fontSize: "12px", color: "#1F2937" }}
                            >
                              {member.jobTitle}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              Email:
                            </Typography>
                            <Typography
                              sx={{ fontSize: "12px", color: "#1F2937" }}
                            >
                              {member.email}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              Actions:
                            </Typography>
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleOpenRoleModal(member)}
                              >
                                <Edit
                                  sx={{ color: "#3B82F6", fontSize: "18px" }}
                                />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                {/* Table Layout for sm screens and above */}
                <TableContainer
                  sx={{
                    display: { xs: "none", sm: "block" }, // Hide on xs, show on sm+
                    border: "1px solid #28272F",
                    borderRadius: "12px",
                    backgroundColor: "white",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#8BD4E7" }}>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#1F2937",
                            fontSize: { sm: "12px", md: "14px" },
                            borderBottom: "2px solid #E5E7EB",
                            minWidth: "120px",
                          }}
                        >
                          Member Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#1F2937",
                            fontSize: { sm: "12px", md: "14px" },
                            borderBottom: "2px solid #E5E7EB",
                            minWidth: "150px",
                          }}
                        >
                          Company Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#1F2937",
                            fontSize: { sm: "12px", md: "14px" },
                            borderBottom: "2px solid #E5E7EB",
                            minWidth: "120px",
                          }}
                        >
                          Job Title
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#1F2937",
                            fontSize: { sm: "12px", md: "14px" },
                            borderBottom: "2px solid #E5E7EB",
                            minWidth: "150px",
                            maxWidth: "200px",
                          }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#1F2937",
                            fontSize: { sm: "12px", md: "14px" },
                            borderBottom: "2px solid #E5E7EB",
                            minWidth: "100px",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projectMembers.map((member, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              fontSize: { sm: "12px", md: "14px" },
                              color: "#1F2937",
                              borderBottom: "1px solid #E5E7EB",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {member.memberName}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: { sm: "12px", md: "14px" },
                              color: "#1F2937",
                              borderBottom: "1px solid #E5E7EB",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {member.companyName}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: { sm: "12px", md: "14px" },
                              color: "#1F2937",
                              borderBottom: "1px solid #E5E7EB",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {member.jobTitle}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: { sm: "12px", md: "14px" },
                              color: "#1F2937",
                              borderBottom: "1px solid #E5E7EB",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "200px",
                            }}
                          >
                            {member.email}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                            <Box
                              sx={{ display: "flex", gap: { sm: 0.5, md: 1 } }}
                            >
                              <IconButton
                                size="small"
                                onClick={() => handleOpenRoleModal(member)}
                              >
                                <Edit
                                  sx={{
                                    color: "#3B82F6",
                                    fontSize: { sm: "18px", md: "20px" },
                                  }}
                                />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupMembers;
