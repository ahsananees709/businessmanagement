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
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("English (United States)");
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!checked) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/user/login", {
        email: formData.email,
        password: formData.password,
      });

      // localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.data._id);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setError("");
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
      {/* Left Side */}
      <Box
        sx={{
          flex: { xs: 0, md: 1 },
          display: { xs: "none", md: "flex" },
          backgroundColor: "#000033",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: { xs: "1px", md: "2px" },
        }}
      >
        <Box
          sx={{
            color: "white",
            marginBottom: "2rem",
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
              fontSize: { xs: "1rem", md: "1.25rem" },
              marginBottom: "0.5rem",
            }}
          >
            Tips
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: { xs: "0.75rem", md: "0.875rem" },
              lineHeight: 1.5,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Vestibulum sit in cras
            tincidunt eget viverra tortor mus placerat elit. Libero amet odio
            lobortis commodo sapien purus eget. Porta ultrices.
          </Typography>
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: { xs: 1, md: 1 },
          width: "100%",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "16px", md: "1rem" },
          minHeight: { xs: "100vh", md: "auto" },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: { xs: "center", md: "center" },
            marginBottom: { xs: "2rem", md: "4rem" },
            width: "100%",
            maxWidth: { xs: "400px", md: "510px" },
            gap: { xs: 1, md: 0 },
          }}
        >
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "100%", md: "200px" },
              maxWidth: "200px",
            }}
          >
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              displayEmpty
              sx={{
                height: { xs: "36px", md: "40px" },
                fontSize: { xs: "0.75rem", md: "0.875rem" },
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
              fontSize: { xs: "0.75rem", md: "0.875rem" },
              mt: { xs: 1, md: 0 },
            }}
          >
            Don't have an account?{" "}
            <Button
              variant="contained"
              sx={{
                marginLeft: "8px",
                textTransform: "none",
                backgroundColor: "#8BD4E7",
                color: "black",
                fontSize: { xs: "0.75rem", md: "0.875rem" },
                borderRadius: "20px",
                padding: { xs: "4px 20px", md: "6px 30px" },
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#8BD4E7",
                  boxShadow: "none",
                },
              }}
              component={Link}
              to="/"
            >
              Sign Up
            </Button>
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            padding: { xs: "1rem", md: "2rem" },
            width: "100%",
            maxWidth: { xs: "100%", sm: "400px", md: "510px" },
            border: "0.5px solid #66666659",
            borderRadius: "12px",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: { xs: "3rem", md: "1rem" },
            }}
          >
            <Box
              component="div"
              sx={{
                width: { xs: "40px", md: "50px" },
                height: { xs: "40px", md: "50px" },
                backgroundColor: "#8BD4E7",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 2rem",
              }}
            >
              <Box
                component="div"
                sx={{
                  width: { xs: "16px", md: "20px" },
                  height: { xs: "16px", md: "20px" },
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
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "#333",
              }}
            >
              Login
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                fontSize: { xs: "0.75rem", md: "0.875rem" },
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
                  mt: 0.5,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                {error}
              </Typography>
            )}
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={{ xs: 1, md: 2 }}>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 0 }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      color: "#666",
                      position: "static",
                      transform: "none",
                      mb: 0.25,
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
                        fontSize: { xs: "0.75rem", md: "0.875rem" },
                        padding: { xs: "10px", md: "12px" },
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
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      color: "#666",
                      position: "static",
                      transform: "none",
                      mb: 0.25,
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
                        fontSize: { xs: "0.75rem", md: "0.875rem" },
                        padding: { xs: "10px", md: "12px" },
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
                            sx={{ padding: { xs: "4px", md: "8px" } }}
                          >
                            {showPassword ? (
                              <VisibilityOff
                                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                              />
                            ) : (
                              <Visibility
                                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                              />
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
                    transform: { xs: "scale(0.9)", md: "scale(1)" },
                    padding: { xs: "4px", md: "8px" },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                >
                  By logging in, I agree to our{" "}
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
              sx={{ mt: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 0,
                backgroundColor: "#8BD4E7",
                textTransform: "none",
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 500,
                borderRadius: "25px",
                boxShadow: "none",
                py: { xs: 1, md: 1.5 },
                color: "black",
              }}
            >
              Login
            </Button>

            <Typography
              variant="body2"
              sx={{
                textAlign: "left",
                mt: 1,
                fontSize: { xs: "0.75rem", md: "0.875rem" },
              }}
            >
              <Link
                to="/forgotpassword"
                style={{
                  textDecoration: "none",
                  color: "#3F98AF",
                  fontWeight: "bold",
                }}
              >
                Forgot password?
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
