// import React, { useState, useEffect } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   CircularProgress,
//   Container,
//   Avatar,
// } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Sidebar from "./Sidebar";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2", // Blue for buttons, similar to sidebar icons
//     },
//     background: {
//       default: "#ffffff", // White background
//       paper: "#ffffff", // White for cards
//     },
//     text: {
//       primary: "#333333", // Dark gray for labels
//       secondary: "#666666", // Lighter gray for values
//     },
//   },
//   typography: {
//     fontFamily: "Roboto, sans estrellad-serif",
//     h6: {
//       fontSize: "1.1rem",
//       fontWeight: 600,
//     },
//     body1: {
//       fontSize: "1rem",
//     },
//   },
// });

// const BusinessInfo = () => {
//   const { businessId } = useParams();
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const userRole = location.state?.userRole || "Super Admin";

//   // Fetch business details
//   useEffect(() => {
//     const fetchBusiness = async () => {
//       try {
//         setLoading(true);
//         // Replace with your actual API endpoint
//         const response = await fetch(
//           `http://localhost:5000/api/businesses/${businessId}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch business details");
//         const data = await response.json();
//         setBusiness(data);
//         console.log(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (businessId) fetchBusiness();
//   }, [businessId]);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           bgcolor: "background.default",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           bgcolor: "background.default",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Paper sx={{ p: 4, textAlign: "center" }}>
//           <Typography variant="h6" color="error" gutterBottom>
//             Error
//           </Typography>
//           <Typography variant="body1" color="text.secondary" gutterBottom>
//             {error}
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             component={Link}
//             to={`/framMembers/${businessId}`}
//             startIcon={<ArrowBackIcon />}
//             sx={{ mt: 2 }}
//           >
//             Back to Members
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           bgcolor: "background.default",
//           py: 4,
//         }}
//       >
//         <Sidebar userRole={userRole} />
//         <Container maxWidth="md">
//           {/* Navigation */}
//           <Box sx={{ mb: 4 }}>
//             <Button
//               variant="text"
//               color="primary"
//               component={Link}
//               to={`/framMembers/${businessId}`}
//               startIcon={<ArrowBackIcon />}
//             >
//               Back to Members
//             </Button>
//           </Box>

//           {/* Business Details Card */}
//           <Paper
//             sx={{
//               p: 3,
//               borderRadius: "8px",
//               border: "1px solid #e0e0e0",
//             }}
//           >
//             {/* Business Name */}
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="h6" color="text.primary">
//                 Business Name
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {business?.business_name || "N/A"}
//               </Typography>
//             </Box>

//             {/* Business Type */}
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="h6" color="text.primary">
//                 Business Type
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {business?.business_type || "N/A"}
//               </Typography>
//             </Box>

//             {/* Description */}
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="h6" color="text.primary">
//                 Description
//               </Typography>
//               <Typography
//                 variant="body1"
//                 color="text.secondary"
//                 sx={{
//                   whiteSpace: "normal",
//                   wordBreak: "break-word",
//                   overflowWrap: "break-word",
//                 }}
//               >
//                 {business?.description || "No description available"}
//               </Typography>
//             </Box>

//             {/* Logo */}
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="h6" color="text.primary">
//                 Logo
//               </Typography>
//               <Avatar
//                 src={business?.logo || ""}
//                 alt="Business Logo"
//                 sx={{ width: 40, height: 40, mt: 1 }}
//               />
//             </Box>
//           </Paper>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default BusinessInfo;

import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Container,
  Avatar,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sidebar from "./Sidebar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue for buttons, similar to sidebar icons
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
    fontFamily: "Roboto, sans-serif", // Fixed typo in fontFamily
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

const BusinessInfo = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const userRole = location.state?.userRole || "Super Admin";

  // Fetch business details
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(
          `http://localhost:5000/api/businesses/${businessId}`
        );
        if (!response.ok) throw new Error("Failed to fetch business details");
        const data = await response.json();
        setBusiness(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (businessId) fetchBusiness();
  }, [businessId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error" gutterBottom>
            Error
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/dashboard`}
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Box>
    );
  }

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
        <Sidebar userRole={userRole} />
        <Box
          sx={{
            flex: 1,
            ml: { xs: "80px", sm: "100px", md: "95px" }, // Offset for sidebar width
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "#F5F7FA", // Responsive padding
          }}
        >
          <Container maxWidth="md">
            {/* Navigation */}

            {/* Business Details Card */}
            <Paper
              sx={{
                p: 3,
                mt: 4,
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
              }}
            >
              {/* Business Name */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h4" color="text.primary" fontWeight={600}>
                  Business Details
                </Typography>
                
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="text.primary">
                  Business Name
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {business?.business_name || "N/A"}
                </Typography>
              </Box>

              {/* Business Type */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="text.primary">
                  Business Type
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {business?.business_type || "N/A"}
                </Typography>
              </Box>

              {/* Description */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="text.primary">
                  Description
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {business?.description || "No description available"}
                </Typography>
              </Box>

              {/* Logo */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="text.primary">
                  Logo
                </Typography>
                <Avatar
                  src={business?.logo || ""}
                  alt="Business Logo"
                  sx={{ width: 40, height: 40, mt: 1 }}
                />
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BusinessInfo;
