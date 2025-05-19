import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const Notifications = () => {
  // State for notification preferences
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [dailySummary, setDailySummary] = useState(false);
  const [taskAssigned, setTaskAssigned] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [mention, setMention] = useState(false);

  const navigate = useNavigate();

  // Handle Save Preferences
  const handleSavePreferences = () => {
    console.log({
      emailNotifications,
      inAppNotifications,
      dailySummary,
      taskAssigned,
      fileUploaded,
      mention,
    });
    // Add logic to save preferences (e.g., API call)
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
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
          overflowY: 'auto',
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
          value={2} // Notifications tab is active (index 2)
          sx={{
            mb: 3,
            '& .MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          {[
            { label: 'General Info', path: '/settings' },
            { label: 'Members & Roles', path: '/settings/memberroles' },
            { label: 'Notifications', path: '/settings/notifications' },
            { label: 'Permissions', path: '/settings/permissions' },
            { label: 'Danger Zone', path: '/settings/dangerzone' },
          ].map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              component={Link}
              to={tab.path}
              sx={{
                textTransform: 'none',
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                fontWeight: index === 2 ? 'bold' : 'normal',
                color: index === 2 ? 'black' : '#B0BEC5',
                backgroundColor: index === 2 ? '#8BD4E7' : 'transparent',
                borderRadius: '24px',
                padding: { xs: '4px 12px', md: '6px 16px' },
                border: '1px solid #000000',
                marginRight: '8px',
                marginBottom: { xs: '8px', sm: 0 },
                '&:hover': {
                  backgroundColor: index === 2 ? '#8BD4E7' : '#E0E0E0',
                },
                '&.Mui-selected': {
                  color: 'black',
                },
              }}
            />
          ))}
        </Tabs>

        {/* Notifications Section */}
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #8BD4E7',
            borderRadius: '12px',
            p: { xs: 2, sm: 3 },
            width: '100%',
            maxWidth: { xs: '100%', md: '1450px' },
            mx: 'auto',
            mt: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              mb: 2,
            }}
          >
            Notifications
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  sx={{
                    color: '#000',
                    '&.Mui-checked': {
                      color: '#8BD4E7',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Email Notifications
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={inAppNotifications}
                  onChange={(e) => setInAppNotifications(e.target.checked)}
                  sx={{
                    color: '#000',
                    '&.Mui-checked': {
                      color: '#8BD4E7',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  In-App Notifications
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={dailySummary}
                  onChange={(e) => setDailySummary(e.target.checked)}
                  sx={{
                    color: '#000',
                    '&.Mui-checked': {
                      color: '#8BD4E7',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Daily Summary Email
                </Typography>
              }
            />
            <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 'bold', mt: 1 }}>
              Notify me when:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={taskAssigned}
                  onChange={(e) => setTaskAssigned(e.target.checked)}
                  sx={{
                    color: '#000',
                    '&.Mui-checked': {
                      color: '#8BD4E7',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  • I’m assigned a task
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fileUploaded}
                  onChange={(e) => setFileUploaded(e.target.checked)}
                  sx={{
                    color: '#000',
                    '&.Mui-checked': {
                      color: '#8BD4E7',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  • A file is uploaded in my project
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={mention}
                  onChange={(e) => setMention(e.target.checked)}
                  sx={{
                    color: '#000',
                    '&.Mui-checked': {
                      color: '#8BD4E7',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  • A team member mentions me
                </Typography>
              }
            />
          </Box>

          {/* Save Preferences Button */}
          <Button
            onClick={handleSavePreferences}
            sx={{
              backgroundColor: '#8BD4E7',
              color: 'black',
              borderRadius: '24px',
              padding: { xs: '6px 12px', sm: '8px 16px' },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 'bold',
              mt: 3,
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                backgroundColor: '#72C3D8',
              },
            }}
          >
            Save Preferences
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Notifications;