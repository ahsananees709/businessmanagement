


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Chip,
  Checkbox,
  ListItemText,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Cancel from "@mui/icons-material/Cancel";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// Sample data for members and team leads (replace with API calls if needed)
const memberOptions = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "alice.jones@example.com",
  "bob.wilson@example.com",
  "emma.brown@example.com",
];

const teamLeadOptions = [
  { id: "6811ec6206a3c83be8f7f8db", name: "John Doe" },
  { id: "6811ec6206a3c83be8f7f8db", name: "Jane Smith" },
  { id: "6811ec6206a3c83be8f7f8db", name: "Alice Jones" },
];

const BusinessDetails = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Added to access navigation state
  const [business, setBusiness] = useState(null);
  const [userRole, setUserRole] = useState(""); // Store user role
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [createTeamLoading, setCreateTeamLoading] = useState(false);

  // Invite Modal States
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    name: "",
    email: "",
  });
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Project Modal States
  const [createProjectLoading, setCreateProjectLoading] = useState(false);
  const [createProjectError, setCreateProjectError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    team: "",
    startDate: "",
    dueDate: "",
  });

  // Team Modal States
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamLead, setTeamLead] = useState("6811ec6206a3c83be8f7f8db");

  // Fetch business details and user role on component mount
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          setError("You must be logged in to view business details.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/businesses/${businessId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBusiness(response.data);
        // Use role from navigation state if available, else fallback to API response
        const roleFromState = location.state?.userRole;
        setUserRole(roleFromState || response.data.role || "Worker");
        setLoading(false);
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data.message || "Failed to fetch business details."
          );
        } else {
          setError("An error occurred. Please try again.");
        }
        setLoading(false);
        console.error(err);
      }
    };

    fetchBusinessDetails();
  }, [businessId, navigate, location.state]);

  // Handlers for project modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handlers for invite modal
  const handleInviteModalOpen = () => {
    setInviteModalOpen(true);
    setInviteError("");
    setInviteSuccess(false);
    setInviteLink("");
  };
  const handleInviteModalClose = () => {
    setInviteModalOpen(false);
    setInviteData({ name: "", email: "" });
    setInviteError("");
  };

  // Handlers for team modal
  const handleTeamModalOpen = () => {
    setTeamModalOpen(true);
    setTeamName("");
    setDescription("");
    setSelectedMembers([]);
    setTeamLead("");
  };
  const handleTeamModalClose = () => {
    setTeamModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInviteInputChange = (e) => {
    const { name, value } = e.target;
    setInviteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteMember = (memberToDelete) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member !== memberToDelete)
    );
  };

  const handleCreateProject = async () => {
    if (!formData.title.trim()) {
      toast.error("Project title is required");
      return;
    }
    if (!formData.team) {
      toast.error("Please select a team");
      return;
    }
    if (!formData.startDate || !formData.dueDate) {
      toast.error("Please select both start and due dates");
      return;
    }

    try {
      setCreateProjectLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/projects/create",
        {
          project_name: formData.title,
          description: formData.description,
          start_date: new Date(formData.startDate).toISOString(),
          due_date: new Date(formData.dueDate).toISOString(),
          business_id: businessId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBusiness((prev) => ({
        ...prev,
        projects_count: prev.projects_count + 1,
      }));

      toast.success("Project created successfully");
      setFormData({
        title: "",
        description: "",
        team: "",
        startDate: "",
        dueDate: "",
      });
      handleClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create project";
      toast.error(errorMessage);
      setCreateProjectError(errorMessage);
    } finally {
      setCreateProjectLoading(false);
    }
  };

  const handleSubmitInvite = async () => {
    if (!inviteData.name.trim() || !inviteData.email.trim()) {
      setInviteError("Name and email are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteData.email)) {
      setInviteError("Please enter a valid email address");
      return;
    }

    setInviteLoading(true);
    setInviteError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setInviteError("You must be logged in to send invitations");
        setInviteLoading(false);
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/businesses/${businessId}/invitations`,
        {
          name: inviteData.name,
          email: inviteData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInviteSuccess(true);
      toast.success("Invitation sent successfully");

      if (response.data.data.updatedBusiness) {
        setBusiness((prev) => ({
          ...prev,
          members_count: response.data.data.updatedBusiness.members_count,
        }));
      }

      setInviteLink(
        `http://localhost:5173/invite/accept/${response.data.data.invitationId}`
      );

      setInviteLoading(false);
    } catch (err) {
      setInviteLoading(false);
      if (err.response && err.response.data) {
        setInviteError(
          err.response.data.message || "Failed to send invitation"
        );
      } else {
        setInviteError("An error occurred. Please try again.");
      }
      console.error(err.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }
    if (!teamLead) {
      toast.error("Team lead is required");
      return;
    }

    try {
      setCreateTeamLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/Team/create",
        {
          team_name: teamName,
          business_id: businessId,
          team_member_emails: selectedMembers,
          team_leader: teamLead,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBusiness((prev) => ({
        ...prev,
        teams_count: prev.teams_count + 1,
      }));

      toast.success("Team created successfully");
      setTeamName("");
      setDescription("");
      setSelectedMembers([]);
      setTeamLead("");
      handleTeamModalClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create team";
      toast.error(errorMessage);
    } finally {
      setCreateTeamLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F7FA" }}
      >
        <Sidebar userRole={userRole || "Admin"} businessId={businessId} />
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: { xs: "50px", sm: "50px", md: "40px" },
            width: {
              xs: "calc(100% - 50px)",
              sm: "calc(100% - 60px)",
              md: "calc(100% - 80px)",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#8BD4E7" }} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F7FA" }}
      >
        <Sidebar userRole={userRole || "Admin"} businessId={businessId} />
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: { xs: "50px", sm: "50px", md: "40px" },
            width: {
              xs: "calc(100% - 50px)",
              sm: "calc(100% - 60px)",
              md: "calc(100% - 80px)",
            },
            p: { xs: 2, sm: 3, md: 15 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="error" variant="h6" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button
            component={Link}
            to="businessDetails/:businessId"
            sx={{
              backgroundColor: "#8BD4E7",
              color: "black",
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#D1E9FF" },
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Toaster />
      <Sidebar userRole={userRole} businessId={businessId} />
   
      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { xs: "50px", sm: "50px", md: "95px" },
          width: {
            xs: "calc(100% - 50px)",
            sm: "calc(100% - 60px)",
            md: "calc(100% - 80px)",
            backgroundColor: "#F5F7FA",
          },
          p: { xs: 2, sm: 3, md: 15 },
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1F2937",
              fontSize: { xs: "18px", sm: "20px", md: "2rem" },
              mb: 1,
            }}
          >
            {business?.business_name || "Business Details"}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <Link
              to="/dashboard"
              style={{ color: "#6B7280", textDecoration: "none" }}
            >
              Dashboard
            </Link>{" "}
            /{" "}
            <Link
              to={`/business/${businessId}`}
              style={{ color: "#6B7280", textDecoration: "none" }}
            >
              {business?.business_name}
            </Link>{" "}
          </Typography>
          <Typography
            sx={{
              color: "black",
              fontSize: { xs: "12px", sm: "1.1rem" },
              mb: 3,
              mt: 2,
            }}
          >
            Welcome to <strong>{business?.business_name}!</strong>{" "}
            {/* {business?.description} */}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #CACACA",
                p: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#8BD4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8BD4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon sx={{ color: "black", fontSize: "1.9rem" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography sx={{ fontSize: "1.1rem", color: "#6B7280" }}>
                  Total Members
                </Typography>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1F2937",
                  }}
                >
                  {business?.members_count || 0}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", color: "#6B7280", mb: 2 }}>
                You can add members of your business
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#8BD4E7",
                    color: "black",
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "12px",
                    px: 3,
                    py: 1,
                    flex: 1,
                    border: "3px solid transparent",
                    "&:hover": {
                      backgroundColor: "white",
                      border: "3px solid #8BD4E7",
                    },
                  }}
                >
                  + Add Member
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleInviteModalOpen}
                  sx={{
                    color: "black",
                    borderRadius: "40px",
                    textTransform: "none",
                    fontSize: "12px",
                    flex: 1,
                    border: "3px solid #8BD4E7",
                    "&:hover": {
                      backgroundColor: "#8BD4E7",
                      border: "3px solid #8BD4E7",
                    },
                  }}
                >
                  Invite via Link
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #CACACA",
                p: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#8BD4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8BD4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon sx={{ color: "black", fontSize: "1.9rem" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography sx={{ fontSize: "1.1rem", color: "#6B7280" }}>
                  Total Teams
                </Typography>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1F2937",
                  }}
                >
                  {business?.teams_count || 0}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", color: "#6B7280", mb: 2 }}>
                You can add Teams of your business
              </Typography>
              <Button
                variant="contained"
                onClick={handleTeamModalOpen}
                sx={{
                  backgroundColor: "#8BD4E7",
                  color: "black",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 3,
                  py: 1,
                  width: "150px",
                  border: "3px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "3px solid #8BD4E7",
                  },
                }}
              >
                + Add Team
              </Button>
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #CACACA",
                p: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#8BD4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8BD4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <OnDeviceTrainingIcon
                    sx={{ color: "black", fontSize: "1.9rem" }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography sx={{ fontSize: "1.1rem", color: "#6B7280" }}>
                  Projects in Progress
                </Typography>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1F2937",
                  }}
                >
                  {business?.projects_count || 0}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", color: "#6B7280", mb: 2 }}>
                You can add Project of your business
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  backgroundColor: "#8BD4E7",
                  color: "black",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 3,
                  py: 1,
                  width: "150px",
                  border: "3px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "3px solid #8BD4E7",
                  },
                }}
              >
                + Add Project
              </Button>
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #CACACA",
                p: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#8BD4E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8BD4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RestartAltIcon sx={{ color: "black", fontSize: "1.9rem" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography sx={{ fontSize: "1.1rem", color: "#6B7280" }}>
                  {business?.business_type || "Business Type"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1F2937",
                  }}
                >
                  {business?.activities_count || 0}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", color: "6B7280", mb: 2 }}>
                {business?.super_admin_user_id
                  ? "Super Admin Mode"
                  : "Admin Mode"}
              </Typography>
              <Button
                component={Link}
                to="/dashboard"
                variant="contained"
                sx={{
                  backgroundColor: "#8BD4E7",
                  color: "black",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 3,
                  py: 1,
                  width: "150px",
                  border: "3px solid transparent",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "3px solid #8BD4E7",
                  },
                }}
              >
                Back
              </Button>
            </Box>
          </Box>

          {/* Project Creation Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                p: 3,
                width: { xs: "90%", sm: "450px" },
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#1F2937" }}
                >
                  Create Project for {business?.business_name}
                </Typography>
                <Button onClick={handleClose} sx={{ minWidth: 0, p: 0 }}>
                  <CloseIcon sx={{ color: "#6B7280" }} />
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography sx={{ color: "black", mb: 1, fontSize: "14px" }}>
                    Project Title
                  </Typography>
                  <TextField
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Project Title"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        height: "40px",
                        backgroundColor: "#F5F7FA",
                        "& fieldset": {
                          borderColor: "#28272F",
                        },
                        "&:hover fieldset": {
                          borderColor: "#8BD4E7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8BD4E7",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        color: "#6B7280",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{ color: "#28272F", mb: 1, fontSize: "14px" }}
                  >
                    Project Description
                  </Typography>
                  <TextField
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Write Project Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        backgroundColor: "#F5F7FA",
                        "& fieldset": {
                          borderColor: "#28272F",
                        },
                        "&:hover fieldset": {
                          borderColor: "#8BD4E7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8BD4E7",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        color: "#6B7280",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{ color: "#6B7280", mb: 1, fontSize: "14px" }}
                  >
                    Assign to Team
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="team"
                      value={formData.team}
                      onChange={handleInputChange}
                      displayEmpty
                      defaultValue=""
                      sx={{
                        borderRadius: "20px",
                        height: "40px",
                        backgroundColor: "#F5F7FA",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#28272F",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#8BD4E7",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#8BD4E7",
                        },
                        "& .MuiSelect-select": {
                          fontSize: "14px",
                          color: "#6B7280",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        -Select-
                      </MenuItem>
                      <MenuItem value="Design Squad">Design Squad</MenuItem>
                      <MenuItem value="Dev Team Alpha">Dev Team Alpha</MenuItem>
                      <MenuItem value="Team 3">Team 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ color: "#6B7280", mb: 1, fontSize: "14px" }}
                    >
                      Start Date
                    </Typography>
                    <TextField
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      type="date"
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          height: "40px",
                          backgroundColor: "#F5F7FA",
                          "& fieldset": {
                            borderColor: "#28272F",
                          },
                          "&:hover fieldset": {
                            borderColor: "#8BD4E7",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#8BD4E7",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          color: "#6B7280",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{ color: "black", mb: 1, fontSize: "14px" }}
                    >
                      Due Date
                    </Typography>
                    <TextField
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      type="date"
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          height: "40px",
                          backgroundColor: "#F5F7FA",
                          "& fieldset": {
                            borderColor: "#28272F",
                          },
                          "&:hover fieldset": {
                            borderColor: "#8BD4E7",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#8BD4E7",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          color: "#6B7280",
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  onClick={handleCreateProject}
                  disabled={createProjectLoading}
                  sx={{
                    backgroundColor: "#8BD4E7",
                    color: "black",
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "14px",
                    py: 1,
                    mt: 2,
                    "&:hover": {
                      backgroundColor: "#D1E9FF",
                    },
                    "&:disabled": {
                      backgroundColor: "#e0e0e0",
                      color: "#9e9e9e",
                    },
                  }}
                >
                  {createProjectLoading ? (
                    <CircularProgress size={24} sx={{ color: "#616161" }} />
                  ) : (
                    "Create Project"
                  )}
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Invite Modal */}
          <Modal
            open={inviteModalOpen}
            onClose={handleInviteModalClose}
            aria-labelledby="invite-modal-title"
            aria-describedby="invite-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                p: 3,
                width: { xs: "90%", sm: "450px" },
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  id="invite-modal-title"
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#1F2937" }}
                >
                  Invite to {business?.business_name}
                </Typography>
                <Button
                  onClick={handleInviteModalClose}
                  sx={{ minWidth: 0, p: 0 }}
                >
                  <CloseIcon sx={{ color: "#6B7280" }} />
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography sx={{ color: "black", mb: 1, fontSize: "14px" }}>
                    Name
                  </Typography>
                  <TextField
                    name="name"
                    value={inviteData.name}
                    onChange={handleInviteInputChange}
                    placeholder="Enter invitee's name"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        height: "40px",
                        backgroundColor: "#F5F7FA",
                        "& fieldset": {
                          borderColor: "#28272F",
                        },
                        "&:hover fieldset": {
                          borderColor: "#8BD4E7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8BD4E7",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        color: "#6B7280",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ color: "black", mb: 1, fontSize: "14px" }}>
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    value={inviteData.email}
                    onChange={handleInviteInputChange}
                    placeholder="Enter invitee's email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        height: "40px",
                        backgroundColor: "#F5F7FA",
                        "& fieldset": {
                          borderColor: "#28272F",
                        },
                        "&:hover fieldset": {
                          borderColor: "#8BD4E7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8BD4E7",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        color: "#6B7280",
                      },
                    }}
                  />
                </Box>

                <Button
                  variant="contained"
                  onClick={handleSubmitInvite}
                  sx={{
                    backgroundColor: "#8BD4E7",
                    color: "black",
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "14px",
                    py: 1,
                    mt: 2,
                    "&:hover": {
                      backgroundColor: "#D1E9FF",
                    },
                  }}
                >
                  Submit Request
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Team Creation Modal */}
          <Modal
            open={teamModalOpen}
            onClose={handleTeamModalClose}
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
                <IconButton onClick={handleTeamModalClose}>
                  <CloseIcon
                    sx={{
                      color: "black",
                      fontSize: { xs: "20px", sm: "24px" },
                    }}
                  />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
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

                <Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: { xs: "11px", sm: "14px" },
                      mb: 1,
                    }}
                  >
                    Team Lead
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
                          key={lead.id}
                          value={lead.id}
                          sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                            color: "black",
                          }}
                        >
                          {lead.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Button
                  variant="contained"
                  onClick={handleCreateTeam}
                  disabled={createTeamLoading}
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
                    "&:disabled": {
                      backgroundColor: "#e0e0e0",
                      color: "#9e9e9e",
                    },
                  }}
                >
                  {createTeamLoading ? (
                    <CircularProgress size={24} sx={{ color: "#616161" }} />
                  ) : (
                    "Create Team"
                  )}
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessDetails;
