import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import { Person, Delete, Replay } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { Link, useLocation, useParams } from "react-router-dom";

// Sample data for the table
const members = [
  {
    name: "Zia din",
    email: "ziadin@minator.com",
    role: "Team Lead",
    roleColor: "#A855F7",
    team: "Zak's Team",
    Title: "Frontend Developer",
    statusColor: "#22C55E",
  },
  {
    name: "Ahmed Safdar",
    email: "ahmadsafdar@minator.com",
    role: "Worker",
    roleColor: "#3B82F6",
    team: "Zak's Team",
      Title: "Backend Developer",
    statusColor: "#EF4444",
  },
  {
    name: "Huzaifa Ameer",
    email: "huzaifaameer@minator.com",
    role: "Client",
    roleColor: "#F59E0B",
    team: "Zak's Team",
    Title: " Client",
    statusColor: "#22C55E",
  },
  {
    name: "Hafiz Khuzaima",
    email: "hafizkhuzaima@minator.com",
    role: "Worker",
    roleColor: "#22C55E",
    team: "Zak's Team",
  Title: "Mobile App Developer",
    statusColor: "#22C55E",
  },
];

const Members = () => {
  const { businessId } = useParams();
  const location = useLocation();
  const userRole = location.state?.userRole;

  // Check if user has permission to see Actions
  const canViewActions = ["Team Lead", "Admin", "Super Admin"].includes(userRole);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar userRole={userRole} businessId={businessId} />

      {/* Main Content Area */}
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
        {/* Members Content */}
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
            Members of Zaka Dairy Farm
          </Typography>
          <Typography
            sx={{
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
              to="/zaka-dairy-farm"
              style={{ color: "#6B7280", textDecoration: "none" }}
            >
              Zaka Dairy Farm
            </Link>{" "}
            /{" "}
            <Link
              to="/members"
              style={{ color: "#6B7280", textDecoration: "none" }}
            >
              Members
            </Link>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              mt: 1,
              mb: 3,
              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.875rem" },
            }}
          >
            Manage who can access this business. Invite new users and assign
            roles
          </Typography>

          {/* Invite Form */}
         {canViewActions && <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1.5, sm: 2 },
              mb: 2,
            }}
          >
            {/* Email Field */}
           <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#1F2937",
                  mb: 0.5,
                  fontSize: { xs: "11px", sm: "12px" },
                }}
              >
                Email
              </Typography>
              <TextField
                placeholder="Enter Email"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                    },
                    borderRadius: "8px",
                    height: { xs: "36px", sm: "40px" },
                  },
                  "& .MuiInputBase-input": {
                    padding: { xs: "6px 10px", sm: "8px 12px" },
                    fontSize: { xs: "12px", sm: "14px" },
                    color: "black",
                  },
                }}
              />
            </Box>

            {/* Role Field */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#1F2937",
                  mb: 0.5,
                  fontSize: { xs: "11px", sm: "12px" },
                }}
              >
                Role
              </Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                defaultValue=""
                SelectProps={{
                  displayEmpty: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D1D5DB",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                    },
                    borderRadius: "8px",
                    height: { xs: "36px", sm: "40px" },
                  },
                  "& .MuiInputBase-input": {
                    padding: { xs: "6px 10px", sm: "8px 12px" },
                    fontSize: { xs: "12px", sm: "14px" },
                    color: "black",
                  },
                  "& .MuiSelect-select:empty": {
                    color: "#6B7280",
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: "#6B7280" }}>
                  Select Role
                </MenuItem>
                <MenuItem value="Super Admin">Super Admin</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </TextField>
            </Box>

            {/* Assign to Team Field */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#1F2937",
                  mb: 0.5,
                  fontSize: { xs: "11px", sm: "12px" },
                }}
              >
                Assign to Team{" "}
                <span style={{ color: "#6B7280" }}>(optional)</span>
              </Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                defaultValue=""
                SelectProps={{
                  displayEmpty: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D1D5DB",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                    },
                    borderRadius: "8px",
                    height: { xs: "36px", sm: "40px" },
                  },
                  "& .MuiInputBase-input": {
                    padding: { xs: "6px 10px", sm: "8px 12px" },
                    fontSize: { xs: "12px", sm: "14px" },
                    color: "black",
                  },
                  "& .MuiSelect-select:empty": {
                    color: "#6B7280",
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ color: "#6B7280" }}>
                  - Select Team
                </MenuItem>
                <MenuItem value="Zak's Team">Zak's Team</MenuItem>
              </TextField>
            </Box>

            {/* Send Invite Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8BD4E7",
                color: "black",
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                padding: { xs: "6px 20px", sm: "8px 40px", md: "8px 100px" },
                height: { xs: "36px", sm: "40px" },
                marginTop: { xs: "10px", sm: "20px" },
                fontSize: { xs: "12px", sm: "14px" },
                "&:hover": {
                  backgroundColor: "#D1E9FF",
                },
              }}
            >
              Send Invite
            </Button>
          </Box>}

          {/* Members Display */}
          <Box>
            {/* Card Layout for xs screens */}
            <Box
              sx={{
                display: { xs: "block", sm: "none" }, // Show on xs, hide on sm+
              }}
            >
              {members.map((member, index) => {
                const nameParts = member.name.split(" ");
                const initials =
                  nameParts.length >= 2
                    ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(
                        0
                      )}`.toUpperCase()
                    : nameParts[0].charAt(0).toUpperCase();

                return (
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: "#8BD4E7",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                            mr: 1,
                          }}
                        >
                          {initials}
                        </Avatar>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#1F2937",
                          }}
                        >
                          {member.name}
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
                            Role:
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor: member.roleColor,
                              color: "white",
                              borderRadius: "20px",
                              padding: "2px 8px",
                              fontSize: "11px",
                              fontWeight: "bold",
                            }}
                          >
                            {member.role}
                          </Box>
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
                            Status:
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor: member.statusColor,
                              color: "white",
                              borderRadius: "20px",
                              padding: "2px 8px",
                              fontSize: "11px",
                              fontWeight: "bold",
                            }}
                          >
                            {member.Title}
                          </Box>
                        </Box>
                        {canViewActions && (
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
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Tooltip title="Change Role">
                                <IconButton size="small">
                                  <Person
                                    sx={{ color: "#3B82F6", fontSize: "18px" }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Remove">
                                <IconButton size="small">
                                  <Delete
                                    sx={{ color: "#EF4444", fontSize: "18px" }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Resend Invite">
                                <IconButton size="small">
                                  <Replay
                                    sx={{ color: "#22C55E", fontSize: "18px" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            {/* Table Layout for sm screens and above */}
            <TableContainer
              sx={{
                display: { xs: "none", sm: "block" }, // Hide on xs, show on sm+
                border: "1px solid #E5E7EB",
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
                        minWidth: "150px",
                        maxWidth: "200px",
                        display: { sm: "table-cell", md: "table-cell" },
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
                      Role
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#1F2937",
                        fontSize: { sm: "12px", md: "14px" },
                        borderBottom: "2px solid #E5E7EB",
                        minWidth: "100px",
                        display: { sm: "table-cell", md: "table-cell" },
                      }}
                    >
                      Team
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
                      Status
                    </TableCell>
                    {canViewActions && (
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#1F2937",
                          fontSize: { sm: "12px", md: "14px" },
                          borderBottom: "2px solid #E5E7EB",
                          minWidth: "120px",
                        }}
                      >
                        Actions
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((member, index) => {
                    const nameParts = member.name.split(" ");
                    const initials =
                      nameParts.length >= 2
                        ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(
                            0
                          )}`.toUpperCase()
                        : nameParts[0].charAt(0).toUpperCase();

                    return (
                      <TableRow key={index}>
                        {/* Name with Avatar */}
                        <TableCell
                          sx={{
                            fontSize: { sm: "12px", md: "14px" },
                            color: "#1F2937",
                            borderBottom: "1px solid #E5E7EB",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: { sm: "20px", md: "24px" },
                                height: { sm: "20px", md: "24px" },
                                backgroundColor: "#8BD4E7",
                                fontSize: { sm: "10px", md: "12px" },
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              {initials}
                            </Avatar>
                            {member.name}
                          </Box>
                        </TableCell>
                        {/* Email */}
                        <TableCell
                          sx={{
                            fontSize: { sm: "12px", md: "14px" },
                            color: "#6B7280",
                            borderBottom: "1px solid #E5E7EB",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px",
                            display: { sm: "table-cell", md: "table-cell" },
                          }}
                        >
                          {member.email}
                        </TableCell>
                        {/* Role */}
                        <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                          <Box
                            sx={{
                              backgroundColor: member.roleColor,
                              color: "white",
                              borderRadius: "20px",
                              padding: { sm: "2px 8px", md: "4px 12px" },
                              display: "inline-block",
                              fontSize: { sm: "10px", md: "12px" },
                              fontWeight: "bold",
                            }}
                          >
                            {member.role}
                          </Box>
                        </TableCell>
                        {/* Team */}
                        <TableCell
                          sx={{
                            fontSize: { sm: "12px", md: "14px" },
                            color: "#6B7280",
                            borderBottom: "1px solid #E5E7EB",
                            display: { sm: "table-cell", md: "table-cell" },
                          }}
                        >
                          {member.team}
                        </TableCell>
                        {/* Status */}
                        <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                          <Box
                            sx={{
                              backgroundColor: member.statusColor,
                              color: "white",
                              borderRadius: "20px",
                              padding: { sm: "2px 8px", md: "4px 12px" },
                              display: "inline-block",
                              fontSize: { sm: "10px", md: "12px" },
                              fontWeight: "bold",
                            }}
                          >
                            {member.Title}
                          </Box>
                        </TableCell>
                        {/* Actions */}
                        {canViewActions && (
                          <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                            <Box
                              sx={{ display: "flex", gap: { sm: 0.5, md: 1 } }}
                            >
                              <Tooltip title="Change Role">
                                <IconButton size="small">
                                  <Person
                                    sx={{
                                      color: "#3B82F6",
                                      fontSize: { sm: "18px", md: "20px" },
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Remove">
                                <IconButton size="small">
                                  <Delete
                                    sx={{
                                      color: "#EF4444",
                                      fontSize: { sm: "18px", md: "20px" },
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Resend Invite">
                                <IconButton size="small">
                                  <Replay
                                    sx={{
                                      color: "#22C55E",
                                      fontSize: { sm: "18px", md: "20px" },
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Members;
