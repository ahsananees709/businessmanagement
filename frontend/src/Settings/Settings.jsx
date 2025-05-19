import React, { useState } from "react";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { Link, useParams, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Settings = () => {
  const { businessId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const userRole = location.state?.userRole || "Super Admin";

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    // Only change the tab if it's not "Members & Roles" (which is a Link)
    if (newValue !== 1) {
      setActiveTab(newValue);
    }
  };

  // Handle form submission (for the button in General Info tab)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Save Changes clicked");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <Sidebar userRole={userRole} businessId={businessId} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: "0px", md: "100px" },
          marginTop: { xs: "60px", md: "80px" },
          padding: { xs: "10px", sm: "20px", md: "50px" },
          backgroundColor: "#F5F7FA",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h1"
            sx={{
              color: "black",
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: "bold",
            }}
          >
            Settings
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "black",
              mt: 0.5,
              fontSize: { xs: "0.8rem", md: "0.875rem" },
            }}
          >
            <Link
              to="/"
              style={{
                color: "black",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Home
            </Link>{" "}
            /{" "}
            <Link
              to="/group/zaka-dairy-farm"
              style={{
                color: "black",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Zaka Dairy Farm
            </Link>{" "}
            / <span style={{ color: "black" }}>Settings</span>
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Tab
            label="General Info"
            sx={{
              textTransform: "none",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: activeTab === 0 ? "bold" : "normal",
              color: activeTab === 0 ? "black" : "#B0BEC5",
              backgroundColor: activeTab === 0 ? "#8BD4E7" : "transparent",
              borderRadius: "24px",
              padding: "6px 16px",
              border: "1px solid #000000",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: activeTab === 0 ? "#8BD4E7" : "#E0E0E0",
              },
              "&.Mui-selected": {
                color: "black",
              },
            }}
          />
          <Tab
            label="Members & Roles"
            component={Link}
            to="/settings/memberroles"
            sx={{
              textTransform: "none",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: activeTab === 1 ? "bold" : "normal",
              color: activeTab === 1 ? "black" : "#B0BEC5",
              backgroundColor: activeTab === 1 ? "#8BD4E7" : "transparent",
              borderRadius: "24px",
              padding: "6px 16px",
              border: "1px solid #000000",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: activeTab === 1 ? "#8BD4E7" : "#E0E0E0",
              },
              "&.Mui-selected": {
                color: "black",
              },
            }}
          />
          <Tab
            label="Notifications"
            component={Link}
            to="/settings/notifications"
            sx={{
              textTransform: "none",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: activeTab === 1 ? "bold" : "normal",
              color: activeTab === 1 ? "black" : "#B0BEC5",
              backgroundColor: activeTab === 1 ? "#8BD4E7" : "transparent",
              borderRadius: "24px",
              padding: "6px 16px",
              border: "1px solid #000000",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: activeTab === 1 ? "#8BD4E7" : "#E0E0E0",
              },
              "&.Mui-selected": {
                color: "black",
              },
            }}
          />
          <Tab
            label="Permissions"
            component={Link}
            to="/settings/permissions"
            sx={{
              textTransform: "none",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: activeTab === 1 ? "bold" : "normal",
              color: activeTab === 1 ? "black" : "#B0BEC5",
              backgroundColor: activeTab === 1 ? "#8BD4E7" : "transparent",
              borderRadius: "24px",
              padding: "6px 16px",
              border: "1px solid #000000",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: activeTab === 1 ? "#8BD4E7" : "#E0E0E0",
              },
              "&.Mui-selected": {
                color: "black",
              },
            }}
          />
          <Tab
            label="Danger Zone"
            component={Link}
            to="/settings/dangerzone"
            sx={{
              textTransform: "none",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: activeTab === 1 ? "bold" : "normal",
              color: activeTab === 1 ? "black" : "#B0BEC5",
              backgroundColor: activeTab === 1 ? "#8BD4E7" : "transparent",
              borderRadius: "24px",
              padding: "6px 16px",
              border: "1px solid #000000",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: activeTab === 1 ? "#8BD4E7" : "#E0E0E0",
              },
              "&.Mui-selected": {
                color: "black",
              },
            }}
          />
          {/* {[ ].map((label, index) => (
            
          ))} */}
        </Tabs>

        {/* General Info Tab */}
        {activeTab === 0 && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #CACACA",
              borderRadius: "12px",
              p: 2,
              width: { xs: "100%", md: "850px" },
              mx: 0,
              mt: 2,
            }}
          >
            {/* Business Name */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", md: "1.3rem" },
                mb: 1,
                color: "black",
              }}
            >
              Business Name
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                color: "black",
                mb: 2,
              }}
            >
              Zaka Dairy Farm
            </Typography>

            {/* Business Type */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", md: "1.2rem" },
                mb: 1,
                color: "black",
              }}
            >
              Business Type
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                color: "black",
                mb: 3,
              }}
            >
              Dairy Farm
            </Typography>

            {/* Description */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", md: "1.3rem" },
                mb: 1,
                color: "black",
              }}
            >
              Description
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                color: "black",
                mb: 3,
                lineHeight: 1.5,
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Gravida condimentum egetas
              augue consectetur viverra vulputate viverra. Vivamus sed laculis
              vulputate venenatis. Etiam aliquet non pellentesque vel risus
              turpis egestas curabitur. Faucibus vel adipiscing elit. Vestibulum
              vel risus nec purus vulputate facilisis. Nullam ac sapien sit amet
              laculis risus nec purus vulputate facilisis. Sed convallis
              parturient eu urna donec sed quis rutrum consectetur amet
              elementum lectus nec eu.
            </Typography>

            {/* Logo */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", md: "1.2rem" },
                mb: 1,
                color: "black",
              }}
            >
              Logo
            </Typography>
            <Box sx={{ mb: 3 }}>
              <img
                src="https://cdn.pixabay.com/photo/2022/08/25/18/45/nautical-logo-7411051_1280.png"
                alt="Business Logo"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Business Slug (ID) */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", md: "1.3rem" },
                mb: 1,
                color: "black",
              }}
            >
              Business Slug (ID)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                color: "black",
                mb: 3,
              }}
            >
              zaka-dairy-farm
            </Typography>

            {/* Save Changes Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#8BD4E7",
                color: "black",
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", md: "1rem" },
                borderRadius: "20px",
                padding: "8px 24px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#72c1d9",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
