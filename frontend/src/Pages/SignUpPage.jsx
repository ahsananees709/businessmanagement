import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.jpeg";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState("English (United States)");
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!checked) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/user/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", res.data.token);
      setError("");
      toast.success("Account created successfully");
      navigate("/loginPage");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
  
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        boxSizing: "border-box",
      }}
    >
      {/* Left Side - Hidden on Mobile */}
      <Box
        sx={{
          flex: { xs: 0, md: 1 },
          backgroundColor: "#000033",
          backgroundImage: { md: `url(${backgroundImage})` },
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "2px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            color: "white",
            marginBottom: "3rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              marginBottom: "0.5rem",
            }}
          >
            Tips
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.8, fontSize: "0.875rem", lineHeight: 1.5 }}
          >
            Lorem ipsum dolor sit amet consectetur. Vestibulum sit in cras
            tincidunt eget viverra tortor mus placerat elit. Libero amet odio
            lobortis commodo sapien purus eget. Porta ultrices.
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "1rem", sm: "2rem" },
          minHeight: { xs: "100vh", md: "auto" },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "400px", md: "510px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", sm: "space-between" },
              alignItems: { xs: "center", sm: "center" },
              marginBottom: "1rem",
              gap: { xs: "2rem", sm: 0 },
            }}
          >
            <FormControl
              variant="outlined"
              size="small"
              sx={{ width: { xs: "100%", sm: "200px" } }}
            >
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                displayEmpty
                sx={{
                  height: "40px",
                  fontSize: "0.875rem",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#b0b0b0",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                }}
              >
                <MenuItem value={"English (United States)"}>
                  English (United States)
                </MenuItem>
                <MenuItem value={"Spanish"}>Spanish</MenuItem>
                <MenuItem value={"French"}>French</MenuItem>
              </Select>
            </FormControl>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              }}
            >
              Already have an account?{" "}
              <Button
                variant="contained"
                sx={{
                  marginLeft: "8px",
                  textTransform: "none",
                  backgroundColor: "#8BD4E7",
                  color: "black",
                  fontSize: "0.875rem",
                  borderRadius: "20px",
                  padding: "6px 30px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#8BD4E7",
                    boxShadow: "none",
                  },
                }}
                component={Link}
                to="/loginPage"
              >
                Login
              </Button>
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              padding: { xs: "1.15rem", sm: "2rem" },
              border: "0.5px solid #66666659",
              borderRadius: "18px",
              width: "100%",
              maxWidth: { xs: "100%", sm: "400px", md: "510px" },
              boxSizing: "border-box",
            }}
          >
            <Box sx={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <Box
                component="div"
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#8BD4E7",
                  marginLeft: "150px",
                  borderRadius: "50px",
                }}
              >
                <Box
                  component="div"
                  sx={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#8BD4E7",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  color: "#333",
                }}
              >
                Create an account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                lobortis maximus.
              </Typography>
              {error && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "red",
                    mt: 1,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 0 }}>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "0.875rem",
                        color: "#666",
                        position: "static",
                        transform: "none",
                        mb: 0.5,
                      }}
                    >
                      Full Name
                    </InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="fullName"
                      name="fullName"
                      autoComplete="given-name"
                      variant="outlined"
                      value={formData.fullName}
                      onChange={handleChange}
                      sx={{
                        width: { xs: "100%" },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "& fieldset": {
                            borderColor: "#e0e0e0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#b0b0b0",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976d2",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 0 }}>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "0.875rem",
                        color: "#666",
                        position: "static",
                        transform: "none",
                        mb: 0.5,
                      }}
                    >
                      Email
                    </InputLabel>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      sx={{
                        width: { xs: "100%" },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "& fieldset": {
                            borderColor: "#e0e0e0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#b0b0b0",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976d2",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 0 }}>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "0.875rem",
                        color: "#666",
                        position: "static",
                        transform: "none",
                        mb: 0.5,
                      }}
                    >
                      Password
                    </InputLabel>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange}
                      sx={{
                        width: { xs: "100%" },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          width: "360px",
                          "& fieldset": {
                            borderColor: "#e0e0e0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#b0b0b0",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976d2",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.875rem",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 0 }}>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "0.875rem",
                        color: "#666",
                        position: "static",
                        transform: "none",
                        mb: 0.5,
                      }}
                    >
                      Confirm Password
                    </InputLabel>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      variant="outlined"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      sx={{
                        width: { xs: "100%" },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          width: "360px",
                          "& fieldset": {
                            borderColor: "#e0e0e0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#b0b0b0",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976d2",
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "0.875rem",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    name="terms"
                    sx={{
                      color: "#e0e0e0",
                      "&.Mui-checked": {
                        color: "#1976d2",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      color: "black",
                    }}
                  >
                    By creating an account, I agree to our{" "}
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "#1976d2" }}
                    >
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "#1976d2" }}
                    >
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 0,
                  backgroundColor: "#8BD4E7",
                  textTransform: "none",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: 500,
                  borderRadius: "25px",
                  boxShadow: "none",
                  py: 1.5,
                  color: "black",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
