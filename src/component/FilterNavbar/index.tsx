import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import {
  Stack,
  Box,
  Chip,
  IconButton,
  Badge,
  Tooltip,
  Paper,
  Typography,
  Divider,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  FilterList,
  Home,
  MeetingRoom,
  People,
} from '@mui/icons-material';
import { LocationSearch } from '@/custom-component';
import FilterSidebar, { FilterIconButton } from '../FilterSideBar';
import { useGlobalContext } from '@/global-context';

interface FilterNavbarProps {
  setLocation: (location: any) => void;
  onFiltersChange?: (filters: any) => void;
}

export default function FilterNavbar({ setLocation, onFiltersChange }: FilterNavbarProps) {
  const theme = useTheme();
  const { fetchPropertyList } = useGlobalContext();
  const [value, setValue] = React.useState('both');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [currentFilters, setCurrentFilters] = useState({
    priceRange: [500, 2000] as [number, number],
    lookingFor: 'any' as string,
    propertyType: [] as string[]
  });
  const [filterOpen, setFilterOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleFiltersChange = (filters: any) => {
    // Update current filters
    const newFilters = {
      priceRange: filters.priceRange || [500, 2000],
      lookingFor: filters.gender || 'any',
      propertyType: filters.propertyType || []
    };

    setCurrentFilters(newFilters);

    // Generate active filter labels for display
    const activeFilterLabels: string[] = [];

    if (filters.priceRange && (filters.priceRange[0] !== 500 || filters.priceRange[1] !== 2000)) {
      activeFilterLabels.push(`$${filters.priceRange[0]}-$${filters.priceRange[1]}`);
    }

    if (filters.gender && filters.gender !== 'any') {
      const genderLabels: { [key: string]: string } = {
        'male': 'Male Only',
        'female': 'Female Only',
        'coed': 'Co-ed'
      };
      activeFilterLabels.push(genderLabels[filters.gender] || filters.gender);
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      const typeLabels: { [key: string]: string } = {
        'apartment': 'Apartment',
        'house': 'House',
        'studio': 'Studio',
        'shared-room': 'Shared Room'
      };
      filters.propertyType.forEach((type: string) => {
        if (typeLabels[type]) {
          activeFilterLabels.push(typeLabels[type]);
        }
      });
    }

    setActiveFilters(activeFilterLabels);

    // Notify parent component about filter changes
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      {/* Main Navigation Bar */}
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
        <Stack spacing={2}>
          {/* Top Row: Search and Tabs */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, lg: 3 }}
            alignItems={{ xs: 'stretch', lg: 'center' }}
            justifyContent="space-between"
          >
            {/* Enhanced Location Search */}
            <Box sx={{ flex: 1, maxWidth: { lg: '500px' } }}>
              <LocationSearch setLocation={setLocation} />
            </Box>

            {/* Enhanced Tabs - Compact for mobile */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  backgroundColor: '#f1f5f9',
                  borderRadius: '8px',
                  p: 0.5
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  sx={{
                    minHeight: 'auto',
                    '& .MuiTabs-indicator': {
                      display: 'none'
                    },
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      color: '#475569',
                      minHeight: { xs: 32, sm: 36 },
                      borderRadius: '6px',
                      padding: { xs: '6px 12px', sm: '8px 20px' },
                      transition: 'all 0.3s ease',
                      '&:hover:not(.Mui-selected)': {
                        backgroundColor: '#e2e8f0'
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#6366f1',
                        color: '#ffffff'
                      }
                    }
                  }}
                >
                  <Tab
                    value="find-roommate"
                    label={
                      <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 0.75 }}>
                        <People sx={{ fontSize: { xs: 14, sm: 18 }, display: { xs: 'none', sm: 'block' } }} />
                        <span>Roommate</span>
                      </Stack>
                    }
                  />
                  <Tab
                    value="find-room"
                    label={
                      <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 0.75 }}>
                        <Home sx={{ fontSize: { xs: 14, sm: 18 }, display: { xs: 'none', sm: 'block' } }} />
                        <span>Room</span>
                      </Stack>
                    }
                  />
                  <Tab
                    value="both"
                    label={
                      <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 0.75 }}>
                        <MeetingRoom sx={{ fontSize: { xs: 14, sm: 18 }, display: { xs: 'none', sm: 'block' } }} />
                        <span>Both</span>
                      </Stack>
                    }
                  />
                </Tabs>
              </Box>

              {/* Advanced Filter Button - Compact for mobile */}
              <Tooltip title="Advanced Filters">
                <IconButton
                  onClick={() => setFilterOpen(true)}
                  sx={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    '&:hover': {
                      backgroundColor: '#f8fafc',
                      borderColor: '#cbd5e1'
                    }
                  }}
                >
                  <Badge badgeContent={activeFilters.length} color="primary">
                    <FilterList sx={{ fontSize: { xs: 16, sm: 20 } }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <Box>
              <Divider sx={{ mb: 2 }} />
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  Active filters:
                </Typography>
                {activeFilters.map((filter, index) => (
                  <Chip
                    key={index}
                    label={filter}
                    onDelete={() => {
                      const newActiveFilters = activeFilters.filter((_, i) => i !== index);
                      setActiveFilters(newActiveFilters);
                      // You could also update the actual filters here
                    }}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: '0.7rem',
                      backgroundColor: '#f3f0ff',
                      color: '#6c5ce7',
                      '& .MuiChip-deleteIcon': {
                        color: '#6c5ce7',
                        fontSize: 16,
                        '&:hover': {
                          color: '#5f3dc4'
                        }
                      }
                    }}
                  />
                ))}
                <Button
                  size="small"
                  onClick={() => {
                    setActiveFilters([]);
                    setCurrentFilters({
                      priceRange: [500, 2000],
                      lookingFor: 'any',
                      propertyType: []
                    });
                    // Notify parent about cleared filters
                    if (onFiltersChange) {
                      onFiltersChange({
                        priceRange: [500, 2000],
                        lookingFor: 'any',
                        propertyType: []
                      });
                    }
                  }}
                  sx={{
                    textTransform: 'none',
                    color: '#6c5ce7',
                    fontSize: '0.7rem',
                    minWidth: 'auto',
                    px: 1,
                    '&:hover': {
                      backgroundColor: '#f3f0ff'
                    }
                  }}
                >
                  Clear all
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>

      <FilterSidebar
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onFiltersChange={handleFiltersChange}
      />
    </Paper>
  );
}