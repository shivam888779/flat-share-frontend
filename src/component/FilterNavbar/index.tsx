import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import {
  Autocomplete,
  Stack,
  TextField,
  Box,
  Chip,
  IconButton,
  Badge,
  Tooltip,
  Paper
} from '@mui/material';
import {
  FilterList,
  Home,
  MeetingRoom,
  People,
  AttachMoney,
  LocationOn
} from '@mui/icons-material';
import { LocationSearch } from '@/custom-component';

interface FilterNavbarProps {
  setLocation: (location: any) => void;
}

export default function FilterNavbar({ setLocation }: FilterNavbarProps) {
  const [value, setValue] = React.useState('find-roommate');
  const [activeFilters, setActiveFilters] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const genderOptions = [
    { label: 'Any Gender', value: 'any' },
    { label: 'Male Only', value: 'male' },
    { label: 'Female Only', value: 'female' },
    { label: 'Co-ed', value: 'coed' }
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: '$0 - $500', value: '0-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: '$1000 - $1500', value: '1000-1500' },
    { label: '$1500+', value: '1500+' }
  ];

  return (
    <Box>
      {/* Hero Section with Search */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f3f0ff 0%, #e8f4ff 100%)',
          borderRadius: '20px',
          p: 4,
          mb: 3,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            opacity: 0.1
          }}
        />

        <Stack spacing={3}>
          <Box textAlign="center">
            <Box
              component="h2"
              sx={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2d3436',
                mb: 1
              }}
            >
              Find Your Perfect Living Space
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: '1.1rem',
                color: '#636e72'
              }}
            >
              Search from thousands of verified properties
            </Box>
          </Box>

          {/* Location Search */}
          <Box maxWidth="600px" mx="auto" width="100%">
            <LocationSearch setLocation={setLocation} />
          </Box>
        </Stack>
      </Box>

      {/* Filter Bar */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: '15px',
          p: 2,
          backgroundColor: 'white',
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.08)'
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={2}
        >
          {/* Tabs */}
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="property search tabs"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#6c5ce7',
                height: 3,
                borderRadius: '3px'
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                color: '#636e72',
                minHeight: 48,
                '&.Mui-selected': {
                  color: '#6c5ce7'
                }
              }
            }}
          >
            <Tab
              value="find-roommate"
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <People fontSize="small" />
                  <span>Find Roommate</span>
                </Stack>
              }
            />
            <Tab
              value="find-room"
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <MeetingRoom fontSize="small" />
                  <span>Find Room</span>
                </Stack>
              }
            />
            <Tab
              value="both"
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Home fontSize="small" />
                  <span>Both</span>
                </Stack>
              }
            />
          </Tabs>

          {/* Filters */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Autocomplete
              disablePortal
              options={genderOptions}
              defaultValue={genderOptions[0]}
              sx={{
                width: 160,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#6c5ce7'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6c5ce7'
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Gender Preference"
                  size="small"
                />
              )}
            />

            <Autocomplete
              disablePortal
              options={priceRanges}
              defaultValue={priceRanges[0]}
              sx={{
                width: 160,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#6c5ce7'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6c5ce7'
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Price Range"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <AttachMoney fontSize="small" sx={{ color: '#6c5ce7', mr: 0.5 }} />
                  }}
                />
              )}
            />

            <Tooltip title="More Filters">
              <IconButton
                sx={{
                  border: '2px solid',
                  borderColor: activeFilters > 0 ? '#6c5ce7' : '#e0e0e0',
                  backgroundColor: activeFilters > 0 ? '#f3f0ff' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#f3f0ff',
                    borderColor: '#6c5ce7'
                  }
                }}
              >
                <Badge badgeContent={activeFilters} color="secondary">
                  <FilterList sx={{ color: activeFilters > 0 ? '#6c5ce7' : '#636e72' }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Active Filters Display */}
        {activeFilters > 0 && (
          <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
            <Chip
              label="Pet Friendly"
              onDelete={() => setActiveFilters(activeFilters - 1)}
              size="small"
              sx={{
                backgroundColor: '#f3f0ff',
                color: '#6c5ce7',
                '& .MuiChip-deleteIcon': {
                  color: '#6c5ce7'
                }
              }}
            />
            <Chip
              label="Parking Available"
              onDelete={() => setActiveFilters(activeFilters - 1)}
              size="small"
              sx={{
                backgroundColor: '#e6fffa',
                color: '#00b894',
                '& .MuiChip-deleteIcon': {
                  color: '#00b894'
                }
              }}
            />
          </Stack>
        )}
      </Paper>

      {/* Quick Stats */}
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        sx={{ overflowX: 'auto', pb: 1 }}
      >
        <Chip
          icon={<LocationOn />}
          label="Near Metro"
          clickable
          sx={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            '&:hover': {
              backgroundColor: '#f3f0ff',
              borderColor: '#6c5ce7'
            }
          }}
        />
        <Chip
          label="Available Now"
          clickable
          sx={{
            backgroundColor: '#d4f4dd',
            color: '#00b894'
          }}
        />
        <Chip
          label="Verified Only"
          clickable
          sx={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            '&:hover': {
              backgroundColor: '#f3f0ff',
              borderColor: '#6c5ce7'
            }
          }}
        />
      </Stack>
    </Box>
  );
}