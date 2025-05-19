import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  IconButton,
  Tooltip,
  Modal,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';

const MemberRoles = () => {
  // State for Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Data for Members & Roles table
  const membersData = [
    {
      name: 'ZA',
      fullName: 'Zia ud din',
      email: 'ziauddin@emailinator.com',
      role: 'Super Admin',
      roleColor: '#AB47BC',
      team: 'Haji Zaka Team',
      status: 'ACTIVE',
      statusColor: '#4CAF50',
      actions: [],
    },
    {
      name: 'AS',
      fullName: 'Ahmed Safdar',
      email: 'ahmedsafdar@emailinator.com',
      role: 'Admin',
      roleColor: '#1976D2',
      team: 'Haji Zaka Team',
      status: 'PENDING',
      statusColor: '#F44336',
      actions: ['Change Role', 'Remove'],
    },
    {
      name: 'HA',
      fullName: 'Huzafa Ameer',
      email: 'huzafaameer@emailinator.com',
      role: 'Client',
      roleColor: '#FFB300',
      team: 'Sales Team',
      status: 'ACTIVE',
      statusColor: '#4CAF50',
      actions: ['Remove', 'Resend Invite'],
    },
  ];

  // Handle actions
  const handleChangeRole = (email) => {
    setSelectedEmail(email);
    setOpenModal(true);
  };

  const handleRemove = (email) => {
    console.log(`Remove user ${email}`);
  };

  const handleResendInvite = (email) => {
    console.log(`Resend invite to ${email}`);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRole('');
  };

  const handleConfirmRoleChange = () => {
    console.log(`Role changed for ${selectedEmail} to ${selectedRole}`);
    handleCloseModal();
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
          value={1} // Members & Roles tab is active (index 1)
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
            { label: 'Members & Roles', path: '/settings/members-roles' },
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
                fontWeight: index === 1 ? 'bold' : 'normal',
                color: index === 1 ? 'black' : '#B0BEC5',
                backgroundColor: index === 1 ? '#8BD4E7' : 'transparent',
                borderRadius: '24px',
                padding: { xs: '4px 12px', md: '6px 16px' },
                border: '1px solid #000000',
                marginRight: '8px',
                marginBottom: { xs: '8px', sm: 0 },
                '&:hover': {
                  backgroundColor: index === 1 ? '#8BD4E7' : '#E0E0E0',
                },
                '&.Mui-selected': {
                  color: 'black',
                },
              }}
            />
          ))}
        </Tabs>

        {/* Members Table */}
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #8BD4E7',
            borderRadius: '12px',
            p: { xs: 1, sm: 2 },
            width: '100%',
            maxWidth: { xs: '100%', md: '1450px' },
            mx: 'auto',
            overflowX: 'auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'Email', 'Role', 'Team(s)', 'Status', 'Actions'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: '#8BD4E7',
                      fontWeight: 'bold',
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      color: 'black',
                      borderBottom: '1px solid #CACACA',
                      padding: { xs: '6px', sm: '8px', md: '10px' },
                      textAlign: header === 'Actions' ? 'center' : 'left',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {membersData.map((member, index) => (
                <TableRow key={index}>
                  {/* Name */}
                  <TableCell sx={{ padding: { xs: '6px', sm: '8px', md: '10px' }, borderBottom: '1px solid #CACACA' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: { xs: '24px', md: '30px' },
                          height: { xs: '24px', md: '30px' },
                          borderRadius: '50%',
                          backgroundColor: '#E0E0E0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: { xs: '0.7rem', md: '0.9rem' },
                          fontWeight: 'bold',
                          color: 'black',
                          mr: 1,
                        }}
                      >
                        {member.name}
                      </Box>
                      <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, whiteSpace: 'nowrap' }}>
                        {member.fullName}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Email */}
                  <TableCell sx={{ padding: { xs: '6px', sm: '8px', md: '10px' }, borderBottom: '1px solid #CACACA' }}>
                    <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, whiteSpace: 'nowrap' }}>
                      {member.email}
                    </Typography>
                  </TableCell>

                  {/* Role */}
                  <TableCell sx={{ padding: { xs: '6px', sm: '8px', md: '10px' }, borderBottom: '1px solid #CACACA' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: member.roleColor,
                          mr: 1,
                        }}
                      />
                      <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, whiteSpace: 'nowrap' }}>
                        {member.role}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Team(s) */}
                  <TableCell sx={{ padding: { xs: '6px', sm: '8px', md: '10px' }, borderBottom: '1px solid #CACACA' }}>
                    <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, whiteSpace: 'nowrap' }}>
                      {member.team}
                    </Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ padding: { xs: '6px', sm: '8px', md: '10px' }, borderBottom: '1px solid #CACACA' }}>
                    <Chip
                      label={member.status}
                      sx={{
                        backgroundColor: member.statusColor,
                        color: 'white',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        height: { xs: '20px', sm: '24px' },
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={{ padding: { xs: '6px', sm: '8px', md: '10px' }, borderBottom: '1px solid #CACACA', textAlign: 'center' }}>
                    {member.actions.length > 0 ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.5, sm: 1 } }}>
                        {member.actions.includes('Change Role') && (
                          <Tooltip title="Change Role" arrow>
                            <IconButton onClick={() => handleChangeRole(member.email)}>
                              <ChangeCircleIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: '#1976D2' }} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.actions.includes('Remove') && (
                          <Tooltip title="Remove" arrow>
                            <IconButton onClick={() => handleRemove(member.email)}>
                              <DeleteIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: '#F44336' }} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.actions.includes('Resend Invite') && (
                          <Tooltip title="Resend Invite" arrow>
                            <IconButton onClick={() => handleResendInvite(member.email)}>
                              <ReplayIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: '#4CAF50' }} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Change Role Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="change-role-modal"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '2px solid #000',
              boxShadow: 24,
              p: { xs: 2, sm: 3 },
              width: { xs: '90%', sm: '400px' },
              maxWidth: '500px',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography id="change-role-modal" variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Change Role
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 'bold' }}>×</Typography>
              </IconButton>
            </Box>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: '24px',
                  border: '1px solid #000',
                  height: { xs: '40px', sm: '48px' },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                <MenuItem value="Super Admin">Super Admin</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={handleConfirmRoleChange}
              disabled={!selectedRole}
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
              CONFIRM
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default MemberRoles;