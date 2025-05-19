import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Grid,
  Checkbox,
} from '@mui/material';
import Sidebar from './Sidebar';


const zokiaImage = 'https://picsum.photos/24?random=1'; 
const developerImage = 'https://picsum.photos/24?random=2'; 
const communityImage = 'https://picsum.photos/24?random=3'; 

const ClientDashboard = () => {
  // State for single selections
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedDueDate, setSelectedDueDate] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('');

  // Handlers for single-select with checkboxes
  const handleBusinessChange = (event) => {
    setSelectedBusiness(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setSelectedDueDate(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value);
  };

  // Function to get the display text for the selected value (without checkbox)
  const getBusinessDisplayText = (value) => {
    switch (value) {
      case 'zokia':
        return 'Zokia Dairy Farm';
      case 'developer':
        return 'developer';
      case 'community1':
      case 'community2':
        return 'Community Solutions';
      default:
        return 'Select Business';
    }
  };

  const getSortDisplayText = (value) => {
    switch (value) {
      case 'dateAsc':
        return 'Date (Ascending)';
      case 'dateDesc':
        return 'Date (Descending)';
      case 'status':
        return 'Status';
      case 'priority':
        return 'Priority';
      default:
        return 'Sort By';
    }
  };


  const menuProps = {
    disableScrollLock: true, 
    PaperProps: {
      style: {
        maxHeight: 300, 
        overflowY: 'auto', 
      },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row', md: 'row' }, 
        minHeight: '100vh',
      }}
    >
      {/* Sidebar (already created by you) */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 10, md: 15 }, 
          backgroundColor: '#f5f7fa',
          overflowY: 'auto',
          mt: { xs: 0, sm: 0, md: 0 }, 
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem' }, // Responsive font size
            }}
          >
            DASHBOARD
          </Typography>
        </Box>

        {/* Your Tasks Section */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              mb: 1,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.5rem' },
            }}
          >
            Your Tasks
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#28272F',
              mb: 3,
              fontSize: { xs: '0.875rem', sm: '1.2rem' },
            }}
          >
            Here are all your tasks across your business, sorted by priority.
          </Typography>

          {/* Filters */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, row on larger screens
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: { xs: 2, sm: 2 },
              mb: 4,
            }}
          >
            {/* Left Side: Dropdowns with Checkboxes Inside */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
                gap: 2,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              {/* Select Business */}
              <FormControl sx={{ minWidth: { xs: '100%', sm: 200, md: 250 } }} size="small">
                <InputLabel>Select Business</InputLabel>
                <Select
                  value={selectedBusiness}
                  onChange={handleBusinessChange}
                  label="Select Business"
                  renderValue={(selected) => getBusinessDisplayText(selected)}
                  MenuProps={menuProps}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#28272F',
                    },
                  }}
                >
                  <MenuItem value="" sx={{ minHeight: 48, py: 1 }}>
                    <Typography>Select Business</Typography>
                  </MenuItem>
                  <MenuItem value="zokia" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedBusiness === 'zokia'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <img
                        src={zokiaImage}
                        alt="Zokia"
                        style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <Typography>Zokia Dairy Farm</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="developer" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedBusiness === 'developer'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <img
                        src={developerImage}
                        alt="Developer"
                        style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <Typography>developer</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="community1" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedBusiness === 'community1'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <img
                        src={communityImage}
                        alt="Community"
                        style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <Typography>Community Solutions</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="community2" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedBusiness === 'community2'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <img
                        src={communityImage}
                        alt="Community"
                        style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <Typography>Community Solutions</Typography>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Priority */}
              <FormControl sx={{ minWidth: { xs: '100%', sm: 120, md: 150 } }} size="small">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={selectedPriority}
                  onChange={handlePriorityChange}
                  label="Priority"
                  renderValue={(selected) =>
                    selected ? selected.charAt(0).toUpperCase() + selected.slice(1) : 'Priority'
                  }
                  MenuProps={menuProps}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#28272F',
                    },
                  }}
                >
                  <MenuItem value="" sx={{ minHeight: 48, py: 1 }}>
                    <Typography>Priority</Typography>
                  </MenuItem>
                  <MenuItem value="high" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedPriority === 'high'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <Typography>High</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="medium" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedPriority === 'medium'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <Typography>Medium</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="normal" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedPriority === 'normal'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <Typography>Normal</Typography>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Due In */}
              <FormControl sx={{ minWidth: { xs: '100%', sm: 120, md: 150 } }} size="small">
                <InputLabel>Due In</InputLabel>
                <Select
                  value={selectedDueDate}
                  onChange={handleDueDateChange}
                  label="Due In"
                  renderValue={(selected) =>
                    selected ? (selected === '2days' ? '2 days left' : '1 week left') : 'Due In'
                  }
                  MenuProps={menuProps}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#28272F',
                    },
                  }}
                >
                  <MenuItem value="" sx={{ minHeight: 48, py: 1 }}>
                    <Typography>Due In</Typography>
                  </MenuItem>
                  <MenuItem value="2days" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedDueDate === '2days'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <Typography>2 days left</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="1week" sx={{ minHeight: 48, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={selectedDueDate === '1week'}
                        sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                      />
                      <Typography>1 week left</Typography>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Right Side: Sort By Dropdown with Checkboxes */}
            <FormControl sx={{ minWidth: { xs: '100%', sm: 200, md: 250 } }} size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={selectedSortOption}
                onChange={handleSortChange}
                label="Sort By"
                renderValue={(selected) => getSortDisplayText(selected)}
                MenuProps={menuProps}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#28272F',
                  },
                }}
              >
                <MenuItem value="" sx={{ minHeight: 48, py: 1 }}>
                  <Typography>Sort By</Typography>
                </MenuItem>
                <MenuItem value="dateAsc" sx={{ minHeight: 48, py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Checkbox
                      checked={selectedSortOption === 'dateAsc'}
                      sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                    />
                    <Typography>Date (Ascending)</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="dateDesc" sx={{ minHeight: 48, py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Checkbox
                      checked={selectedSortOption === 'dateDesc'}
                      sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                    />
                    <Typography>Date (Descending)</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="status" sx={{ minHeight: 48, py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Checkbox
                      checked={selectedSortOption === 'status'}
                      sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                    />
                    <Typography>Status</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="priority" sx={{ minHeight: 48, py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Checkbox
                      checked={selectedSortOption === 'priority'}
                      sx={{ color: '#e0e0e0', '&.Mui-checked': { color: '#1976d2' } }}
                    />
                    <Typography>Priority</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Task Cards */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Task Card 1 */}
            <Grid item xs={12} sm={6} md={6}>
              <Box
                sx={{
                  p: { xs: 2, md: 3 },
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #CACACA',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    mb: 1,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  Create a UI/UX design for a Business Management Platform
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#888',
                    mb: 2,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  Zokia Dairy Farm
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#888' }}>
                      Status:
                    </Typography>
                    <Chip
                      label="In Progress"
                      size="small"
                      sx={{ ml: 1, backgroundColor: '#e6f4ea', color: '#2e7d32', fontWeight: 'bold' }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    Due Date:
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, color: '#333', fontWeight: 'bold' }}
                  >
                    24 March 2024 (2 days left)
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    Priority:
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, color: '#d32f2f', fontWeight: 'bold' }}
                  >
                    High
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Task Card 2 */}
            <Grid item xs={12} sm={6} md={6}>
              <Box
                sx={{
                  p: { xs: 2, md: 3 },
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #CACACA',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    mb: 1,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  Create a Logo for a Business Management Platform
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#888',
                    mb: 2,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  Zokia Dairy Farm
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#888' }}>
                      Status:
                    </Typography>
                    <Chip
                      label="Done"
                      size="small"
                      sx={{ ml: 1, backgroundColor: '#e3f2fd', color: '#1976d2' }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    Due Date:
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, color: '#333', fontWeight: 'bold' }}
                  >
                    24 March 2024 (2 days left)
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    Priority:
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, color: 'orange', fontWeight: 'bold' }}
                  >
                    Normal
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDashboard;