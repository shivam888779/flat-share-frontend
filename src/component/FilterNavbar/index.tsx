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
  Paper,
  Typography,
  Divider
} from '@mui/material';
import {
  FilterList,
  Home,
  MeetingRoom,
  People,
  AttachMoney,
  LocationOn,
  CheckCircle,
  DirectionsSubway,
  Filter
} from '@mui/icons-material';
import { LocationSearch } from '@/custom-component';
import FilterSidebar, { FilterIconButton } from '../FilterSideBar';
import { ST } from 'next/dist/shared/lib/utils';

interface FilterNavbarProps {
  setLocation: (location: any) => void;
}

export default function FilterNavbar({ setLocation }: FilterNavbarProps) {
  const [value, setValue] = React.useState('find-roommate');
  const [activeFilters, setActiveFilters] = useState(0);
  const [quickFilters, setQuickFilters] = useState({
    nearMetro: true,
    availableNow: true,
    verifiedOnly: true
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const toggleQuickFilter = (filterKey: keyof typeof quickFilters) => {
    setQuickFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const [filterOpen, setFilterOpen] = useState(false);
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
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'transparent',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 0
      }}
    >
      {/* Main Navigation Bar */}
      <Box sx={{ py: 1.5 }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={{ xs: 2, lg: 3 }}
          alignItems={{ xs: 'stretch', lg: 'center' }}
          justifyContent="space-between"
        >
          {/* Title */}


          {/* Location Search - Compact */}


          {/* Tabs - Compact */}
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              minHeight: 'auto',
              '& .MuiTabs-indicator': {
                backgroundColor: '#6c5ce7',
                height: 2
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                color: '#636e72',
                minHeight: 36,
                padding: '6px 12px',
                '&.Mui-selected': {
                  color: '#6c5ce7'
                }
              }
            }}
          >
            <Tab
              value="find-roommate"
              label={
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <People sx={{ fontSize: 16 }} />
                  <span>Roommate</span>
                </Stack>
              }
            />
            <Tab
              value="find-room"
              label={
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <MeetingRoom sx={{ fontSize: 16 }} />
                  <span>Room</span>
                </Stack>
              }
            />
            <Tab
              value="both"
              label={
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Home sx={{ fontSize: 16 }} />
                  <span>Both</span>
                </Stack>
              }
            />
          </Tabs>
          <Stack direction="row" spacing={2}>
            <Box sx={{ maxWidth: { xs: '100%', lg: '400px' } }}>
              <LocationSearch setLocation={setLocation} />

            </Box>
            <IconButton onClick={() => setFilterOpen(true)}>
              <Filter />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <FilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} onFiltersChange={() => { }} />

      {/* Active Filters Display - Only show when filters are active */}
      {activeFilters > 0 && (
        <Box sx={{ px: 3, pb: 1.5 }}>
          <Divider sx={{ mb: 1 }} />
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label="Pet Friendly"
              onDelete={() => setActiveFilters(activeFilters - 1)}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.75rem',
                backgroundColor: '#f3f0ff',
                color: '#6c5ce7',
                '& .MuiChip-deleteIcon': {
                  color: '#6c5ce7',
                  fontSize: 16
                }
              }}
            />
            <Chip
              label="Parking Available"
              onDelete={() => setActiveFilters(activeFilters - 1)}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.75rem',
                backgroundColor: '#e6fffa',
                color: '#00b894',
                '& .MuiChip-deleteIcon': {
                  color: '#00b894',
                  fontSize: 16
                }
              }}
            />
          </Stack>
        </Box>
      )}
    </Paper>
  );
}