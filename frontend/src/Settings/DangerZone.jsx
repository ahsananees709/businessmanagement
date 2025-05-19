import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import toast, { Toaster } from 'react-hot-toast';

const DangerZone = () => {
  // State for dropdowns
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Sample list of admins (replace with actual data from your backend)
  const adminList = [
    { name: 'Zia ud din', email: 'ziauddin@emailinator.com' },
    { name: 'Ahmed Safdar', email: 'ahmedsafdar@emailinator.com' },
    { name: 'Huzafa Ameer', email: 'huzafaameer@emailinator.com' },
  ];

  const navigate = useNavigate();

  // Handle Transfer Ownership
  const handleTransferOwnership = () => {
    if (selectedAdmin) {
      console.log(`Transfer ownership to ${selectedAdmin}`);
      toast.success('Ownership transferred successfully!', {
        position: 'top-center',
        duration: 3000,
      });
      // Add logic to transfer ownership (e.g., API call)
    }
  };

  // Handle Delete Business
  const handleDeleteBusiness = () => {
    if (deleteConfirmation === 'DELETE BUSINESS NAME') {
      console.log('Delete business confirmed');
      toast.success('Deleted successfully!', {
        position: 'top-center',
        duration: 3000,
      });
      // Add logic to delete business (e.g., API call)
      // Redirect to a different page after deletion (e.g., home)
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect after toast duration
    } else {
      console.log('Confirmation text does not match');
      toast.error('Please confirm deletion by selecting the correct option.', {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Toaster for Notifications */}
      <Toaster />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: '0px', sm: '80px', md: '100px' },
          marginTop: { xs: '60px', sm: '70px', md: '80px' },
          padding: { xs: '10px', sm: '15px', md: '30px', lg: '50px' },
          backgroundColor: '#F5F7FA',
          overflow: 'hidden', // Remove all scroll bars
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h1"
            sx={{
              color: 'black',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: 'bold',
            }}
          >
            Settings
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'black',
              mt: 0.5,
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
            }}
          >
            <Link
              to="/"
              style={{
                color: 'black',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Home
            </Link>{' '}
            /{' '}
            <Link
              to="/group/zaka-dairy-farm"
              style={{
                color: 'black',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Zaka Dairy Farm
            </Link>{' '}
            /{' '}
            <span style={{ color: 'black' }}>Settings</span>
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={4} // Danger Zone tab is active (index 4)
          sx={{
            mb: 3,
            '& .MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          {[
            { label: 'General Info', path: '/settings/general-info' },
            { label: 'Members & Roles', path: '/settings/members-roles' },
            { label: 'Notifications', path: '/settings/notifications' },
            { label: 'Permissions', path: '/settings/permissions' },
            { label: 'Danger Zone', path: '/settings/danger-zone' },
          ].map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              component={Link}
              to={tab.path}
              sx={{
                textTransform: 'none',
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                fontWeight: index === 4 ? 'bold' : 'normal',
                color: index === 4 ? 'black' : '#B0BEC5',
                backgroundColor: index === 4 ? '#8BD4E7' : 'transparent',
                borderRadius: '24px',
                padding: { xs: '4px 12px', md: '6px 16px' },
                border: '1px solid #000000',
                marginRight: '8px',
                marginBottom: { xs: '8px', sm: 0 },
                '&:hover': {
                  backgroundColor: index === 4 ? '#8BD4E7' : '#E0E0E0',
                },
                '&.Mui-selected': {
                  color: 'black',
                },
              }}
            />
          ))}
        </Tabs>

        {/* Danger Zone Section */}
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #8BD4E7',
            borderRadius: '12px',
            p: { xs: 2, sm: '15px', md: '30px' },
            width: '100%',
            maxWidth: { xs: '100%', md: '1450px' },
            mx: 'auto',
            mt: 2,
            overflow: 'hidden', // Remove any scroll bars
          }}
        >
          {/* Transfer Ownership */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                mb: 1,
              }}
            >
              Transfer Ownership
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                color: '#000',
                mb: 2,
              }}
            >
              Only one Super Admin per business. This action will transfer ownership and downgrade your role to Admin.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 'bold',
                mb: 1,
              }}
            >
              Admin List
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={selectedAdmin}
                onChange={(e) => setSelectedAdmin(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: '24px',
                  border: '1px solid #000',
                  height: { xs: '40px', sm: '48px' },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                <MenuItem value="" disabled>
                  Select Admin
                </MenuItem>
                {adminList.map((admin, index) => (
                  <MenuItem key={index} value={admin.email}>
                    {admin.name} ({admin.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleTransferOwnership}
              disabled={!selectedAdmin}
              sx={{
                backgroundColor: '#8BD4E7',
                color: 'black',
                borderRadius: '24px',
                padding: { xs: '6px 12px', sm: '8px 16px' },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 'bold',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: '#72C3D8',
                },
                '&:disabled': {
                  backgroundColor: '#B0BEC5',
                  color: 'black',
                },
              }}
            >
              Transfer Ownership
            </Button>
          </Box>

          {/* Delete Business */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                mb: 1,
              }}
            >
              Delete Business
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                color: '#000',
                mb: 2,
              }}
            >
              This will permanently delete all data associated with this business.
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: '24px',
                  border: '1px solid #000',
                  height: { xs: '40px', sm: '48px' },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                <MenuItem value="" disabled>
                  Select to confirm
                </MenuItem>
                <MenuItem value="DELETE BUSINESS NAME">
                  DELETE BUSINESS NAME
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleDeleteBusiness}
              disabled={deleteConfirmation !== 'DELETE BUSINESS NAME'}
              sx={{
                backgroundColor: '#F44336',
                color: 'white',
                borderRadius: '24px',
                padding: { xs: '6px 12px', sm: '8px 16px' },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 'bold',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: '#D32F2F',
                },
                '&:disabled': {
                  backgroundColor: '#EF5350',
                  color: 'white',
                },
              }}
            >
              Delete Business
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DangerZone;