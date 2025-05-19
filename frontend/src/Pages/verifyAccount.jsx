import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Button, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserVerification = () => {
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL query parameter
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      setStatus('error');
      setError('No verification token provided.');
      return;
    }

    // Function to verify token via API using Axios
    const verifyToken = async () => {
      try {
        const response = await axios.post(`http://localhost:4000/user/verify/${token}`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setStatus('verified');
        }
      } catch (err) {
        setStatus('error');
        setError(err.response?.data?.message || 'Verification failed.');
      }
    };

    verifyToken();
  }, [location.search]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h5" gutterBottom>
          User Verification
        </Typography>

        {status === 'verifying' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body1" color="text.secondary">
              Verifying your account...
            </Typography>
          </Box>
        )}

        {status === 'verified' && (
          <Box>
            <Alert severity="success" sx={{ mb: 2 }}>
              Account verified successfully!
            </Alert>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              You can now log in to your account.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/loginPage')}
            >
              Go to Login
            </Button>
          </Box>
        )}

        {status === 'error' && (
          <Box>
            <Alert severity="error" sx={{ mb: 2 }}>
              Verification failed: {error}
            </Alert>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/signup')}
            >
              Try Again
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserVerification;