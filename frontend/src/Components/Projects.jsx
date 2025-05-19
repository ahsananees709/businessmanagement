import React, { useState } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl } from "@mui/material";
import { Link } from "react-router-dom"; // Removed useLocation
import Sidebar from "./Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const Projects = () => {
    const [projects] = useState([
        {
            title: "Website Redesign",
            team: "Design Squad",
            milestones: "3 of 5 Milestones Completed",
            startDate: "Mar 01, 2025",
            dueDate: "Apr 30, 2025",
        },
        {
            title: "Internal CRM Upgrade",
            team: "Dev Team Alpha",
            milestones: "1 of 4 Milestones Completed",
            startDate: "Mar 01, 2025",
            dueDate: "Apr 30, 2025",
        },
    ]);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F7FA" }}>
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: { xs: "50px", sm: "50px", md: "40px" },
                    width: { xs: "calc(100% - 50px)", sm: "calc(100% - 60px)", md: "calc(100% - 80px)" },
                    p: { xs: 2, sm: 3, md: 15 },
                }}
            >
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "#1F2937",
                            fontSize: { xs: "18px", sm: "20px", md: "2rem" },
                            mb: 1,
                        }}
                    >
                        Projects
                    </Typography>
                    <Typography sx={{ mt: 1, mb: 2 }}>
                        <Link to="/dashboard" style={{ color: "#6B7280", textDecoration: "none" }}>
                            Home
                        </Link>{" "}
                        /{" "}
                        <Link to="/zaka-dairy-farm" style={{ color: "#6B7280", textDecoration: "none" }}>
                            Zaka Dairy Farm
                        </Link>{" "}
                        / Projects
                    </Typography>

                    {/* Create Project Button on its own row */}
                    <Box sx={{ mb: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#8BD4E7",
                                color: "black",
                                borderRadius: "20px",
                                textTransform: "none",
                                fontSize: "14px",
                                px: 3,
                                py: 1,
                                "&:hover": {
                                    backgroundColor: "#D1E9FF",
                                },
                            }}
                        >
                            + Create Project
                        </Button>
                    </Box>

                    {/* Search Bar on the left, Filters on the right */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                        {/* Search Bar on the Left */}
                        <TextField
                            placeholder="Search Projects..."
                            variant="outlined"
                            sx={{
                                width: { xs: "100%", sm: "300px" },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "20px",
                                    height: "40px",
                                    backgroundColor: "white",
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
                                    color: "#666666",
                                },
                            }}
                            InputProps={{
                                endAdornment: <SearchIcon sx={{ color: "#6B7280", mr: 1 }} />,
                            }}
                        />

                        {/* Filters on the Right */}
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                            <FormControl sx={{ minWidth: 120 }}>
                                <Select
                                    displayEmpty
                                    defaultValue=""
                                    sx={{
                                        borderRadius: "20px",
                                        height: "40px",
                                        backgroundColor: "white",
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
                                            display: "flex",
                                            alignItems: "center",
                                        },
                                    }}
                                    renderValue={(value) => (
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <FilterListIcon sx={{ mr: 1, color: "#6B7280" }} />
                                            Filter by Team
                                        </Box>
                                    )}
                                >
                                    <MenuItem value="">All Teams</MenuItem>
                                    <MenuItem value="Design Squad">Design Squad</MenuItem>
                                    <MenuItem value="Dev Team Alpha">Dev Team Alpha</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: 120 }}>
                                <Select
                                    displayEmpty
                                    defaultValue=""
                                    sx={{
                                        borderRadius: "20px",
                                        height: "40px",
                                        backgroundColor: "white",
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
                                            display: "flex",
                                            alignItems: "center",
                                        },
                                    }}
                                    renderValue={(value) => (
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <FilterListIcon sx={{ mr: 1, color: "#6B7280" }} />
                                            Sort by Date/Status
                                        </Box>
                                    )}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="date">Date</MenuItem>
                                    <MenuItem value="status">Status</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>

                {/* Project Cards */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                        gap: 3,
                    }}
                >
                    {projects.map((project, index) => (
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "12px",
                                border: "1px solid #28272F",
                                p: 3,
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                textAlign: "left",
                            }}
                        >
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "#1F2937", mb: 2 }}>
                                {project.title}
                            </Typography>
                            <Typography>
                                Team
                            </Typography>
                            <Typography sx={{ fontSize: "1.2rem", color: "black", mb: 1, fontWeight: "bold" }}>
                                {project.team}
                            </Typography>
                            <Typography sx={{ fontSize: "1.1rem" }}>
                                Milestone Progress
                            </Typography>
                            <Typography sx={{ fontSize: "0.9rem", color: "#6B7280", mb: 2 }}>
                                {project.milestones}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Box>
                                    <Typography sx={{ fontSize: "0.9rem", color: "#6B7280" }}>Start</Typography>
                                    <Typography sx={{ fontSize: "0.9rem", color: "#1F2937" }}>
                                        {project.startDate}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "0.9rem", color: "#6B7280" }}>Due</Typography>
                                    <Typography sx={{ fontSize: "0.9rem", color: "#1F2937" }}>
                                        {project.dueDate}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: "1.1rem" }}>
                                    Status
                                </Typography>
                                <Typography sx={{ color: "#3B4DC0", mb: 2, fontWeight: "bold" }}>
                                    InProgress
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#8BD4E7",
                                    color: "black",
                                    marginLeft: "-3px",
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    fontSize: "14px",
                                    px: 3,
                                    py: 1,
                                    "&:hover": {
                                        backgroundColor: "#D1E9FF",
                                    },
                                }}
                            >
                                View Project
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Projects;