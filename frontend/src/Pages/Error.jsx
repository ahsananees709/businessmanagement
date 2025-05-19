import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Sidebar from "./Sidebar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue for buttons, matching BusinessDetails
    },
    background: {
      default: "#ffffff", // White background
      paper: "#ffffff", // White for cards
    },
    text: {
      primary: "#333333", // Dark gray for labels
      secondary: "#666666", // Lighter gray for values
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

const PageNotFound = () => {


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          pt: { xs: "64px", sm: "72px", md: "88px" }, // Offset for fixed header
        }}
      >
     
        <Box
          sx={{
            flex: 1,
            ml: { xs: "80px", sm: "100px", md: "120px" }, // Offset for sidebar width
            p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="md">
            <Paper
              sx={{
                p: 4,
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                color="error"
                sx={{ fontSize: "2rem", fontWeight: 700, mb: 2 }}
              >
                404 - Page Not Found
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Sorry, the page you are looking for does not exist.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/loginPage`}
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2 }}
              >
                Back to Login Page
              </Button>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PageNotFound;