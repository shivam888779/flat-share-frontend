import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Stack,
    Slider,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    Button,
    Paper,
    Switch,
    FormGroup,
    Checkbox,
    Badge,
    useTheme,
    alpha
} from '@mui/material';
import {
    Close,
    FilterList,
    LocationOn,
    AttachMoney,
    People,
    Home,
    DirectionsCar,
    Pets,
    Wifi,
    LocalLaundryService,
    Kitchen,
    FitnessCenter
} from '@mui/icons-material';

interface FilterSidebarProps {
    open: boolean;
    onClose: () => void;
    onFiltersChange: (filters: any) => void;
}

interface Filters {
    radius: number;
    priceRange: [number, number];
    gender: string;
    propertyType: string[];
    amenities: string[];
    moveInDate: string;
    petFriendly: boolean;
    furnished: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ open, onClose, onFiltersChange }) => {
    const theme = useTheme();
    const [filters, setFilters] = useState<Filters>({
        radius: 10,
        priceRange: [500, 2000],
        gender: 'any',
        propertyType: [],
        amenities: [],
        moveInDate: 'flexible',
        petFriendly: false,
        furnished: false
    });

    const handleRadiusChange = (event: Event, newValue: number | number[]) => {
        const updatedFilters = { ...filters, radius: newValue as number };
        setFilters(updatedFilters);
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        const updatedFilters = { ...filters, priceRange: newValue as [number, number] };
        setFilters(updatedFilters);
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedFilters = { ...filters, gender: event.target.value };
        setFilters(updatedFilters);
    };

    const handlePropertyTypeToggle = (type: string) => {
        const updatedTypes = filters.propertyType.includes(type)
            ? filters.propertyType.filter(t => t !== type)
            : [...filters.propertyType, type];
        const updatedFilters = { ...filters, propertyType: updatedTypes };
        setFilters(updatedFilters);
    };

    const handleAmenityToggle = (amenity: string) => {
        const updatedAmenities = filters.amenities.includes(amenity)
            ? filters.amenities.filter(a => a !== amenity)
            : [...filters.amenities, amenity];
        const updatedFilters = { ...filters, amenities: updatedAmenities };
        setFilters(updatedFilters);
    };

    const handleApplyFilters = () => {
        onFiltersChange(filters);
        onClose();
    };

    const handleClearFilters = () => {
        const clearedFilters: Filters = {
            radius: 10,
            priceRange: [500, 2000],
            gender: 'any',
            propertyType: [],
            amenities: [],
            moveInDate: 'flexible',
            petFriendly: false,
            furnished: false
        };
        setFilters(clearedFilters);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.radius !== 10) count++;
        if (filters.priceRange[0] !== 500 || filters.priceRange[1] !== 2000) count++;
        if (filters.gender !== 'any') count++;
        if (filters.propertyType.length > 0) count++;
        if (filters.amenities.length > 0) count++;
        if (filters.petFriendly) count++;
        if (filters.furnished) count++;
        return count;
    };

    const propertyTypes = [
        { id: 'apartment', label: 'Apartment', icon: Home },
        { id: 'house', label: 'House', icon: Home },
        { id: 'studio', label: 'Studio', icon: Home },
        { id: 'shared-room', label: 'Shared Room', icon: People }
    ];

    const amenitiesList = [
        { id: 'parking', label: 'Parking', icon: DirectionsCar },
        { id: 'wifi', label: 'WiFi', icon: Wifi },
        { id: 'laundry', label: 'Laundry', icon: LocalLaundryService },
        { id: 'kitchen', label: 'Kitchen', icon: Kitchen },
        { id: 'gym', label: 'Gym', icon: FitnessCenter },
        { id: 'pets', label: 'Pet Friendly', icon: Pets }
    ];

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 400 },
                    maxWidth: '90vw',
                    backgroundColor: theme.palette.background.paper,
                    borderLeft: `1px solid ${theme.palette.divider}`
                }
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{
                    p: 3,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box sx={{
                                p: 1,
                                borderRadius: 2,
                                backgroundColor: alpha(theme.palette.primary.main, 0.1)
                            }}>
                                <FilterList sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: 20
                                }} />
                            </Box>
                            <Typography variant="h6" fontWeight={600} color="text.primary">
                                Filters
                            </Typography>
                            {getActiveFiltersCount() > 0 && (
                                <Badge
                                    badgeContent={getActiveFiltersCount()}
                                    color="primary"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }
                                    }}
                                />
                            )}
                        </Stack>
                        <IconButton
                            onClick={onClose}
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    color: theme.palette.primary.main
                                }
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Filter Content */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    <Stack spacing={3}>
                        {/* Search Radius */}
                        <Paper elevation={0} sx={{
                            p: 3,
                            backgroundColor: alpha(theme.palette.background.default, 0.5),
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`
                        }}>
                            <Stack spacing={2.5}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Box sx={{
                                        p: 0.75,
                                        borderRadius: 1.5,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1)
                                    }}>
                                        <LocationOn sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: 18
                                        }} />
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                                        Search Radius
                                    </Typography>
                                </Stack>
                                <Box sx={{ px: 1 }}>
                                    <Slider
                                        value={filters.radius}
                                        onChange={handleRadiusChange}
                                        min={1}
                                        max={50}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `${value} km`}
                                        sx={{
                                            color: theme.palette.primary.main,
                                            '& .MuiSlider-thumb': {
                                                backgroundColor: theme.palette.primary.main,
                                                width: 20,
                                                height: 20,
                                                '&:hover': {
                                                    boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.16)}`
                                                }
                                            },
                                            '& .MuiSlider-track': {
                                                height: 4,
                                                borderRadius: 2
                                            },
                                            '& .MuiSlider-rail': {
                                                height: 4,
                                                borderRadius: 2,
                                                backgroundColor: theme.palette.divider
                                            }
                                        }}
                                    />
                                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                                        <Typography variant="caption" color="text.secondary">1 km</Typography>
                                        <Typography variant="caption" color="text.secondary">50 km</Typography>
                                    </Stack>
                                </Box>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    Current: {filters.radius} km radius
                                </Typography>
                            </Stack>
                        </Paper>

                        {/* Price Range */}
                        <Paper elevation={0} sx={{
                            p: 3,
                            backgroundColor: alpha(theme.palette.background.default, 0.5),
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`
                        }}>
                            <Stack spacing={2.5}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Box sx={{
                                        p: 0.75,
                                        borderRadius: 1.5,
                                        backgroundColor: alpha(theme.palette.success.main, 0.1)
                                    }}>
                                        <AttachMoney sx={{
                                            color: theme.palette.success.main,
                                            fontSize: 18
                                        }} />
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                                        Monthly Rent
                                    </Typography>
                                </Stack>
                                <Box sx={{ px: 1 }}>
                                    <Slider
                                        value={filters.priceRange}
                                        onChange={handlePriceChange}
                                        min={0}
                                        max={5000}
                                        step={50}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `$${value}`}
                                        sx={{
                                            color: theme.palette.success.main,
                                            '& .MuiSlider-thumb': {
                                                backgroundColor: theme.palette.success.main,
                                                width: 20,
                                                height: 20,
                                                '&:hover': {
                                                    boxShadow: `0 0 0 8px ${alpha(theme.palette.success.main, 0.16)}`
                                                }
                                            },
                                            '& .MuiSlider-track': {
                                                height: 4,
                                                borderRadius: 2
                                            },
                                            '& .MuiSlider-rail': {
                                                height: 4,
                                                borderRadius: 2,
                                                backgroundColor: theme.palette.divider
                                            }
                                        }}
                                    />
                                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                                        <Typography variant="caption" color="text.secondary">$0</Typography>
                                        <Typography variant="caption" color="text.secondary">$5000+</Typography>
                                    </Stack>
                                </Box>
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    ${filters.priceRange[0]} - ${filters.priceRange[1]} per month
                                </Typography>
                            </Stack>
                        </Paper>

                        {/* Gender Preference */}
                        <Paper elevation={0} sx={{
                            p: 3,
                            backgroundColor: alpha(theme.palette.background.default, 0.5),
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`
                        }}>
                            <Stack spacing={2.5}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Box sx={{
                                        p: 0.75,
                                        borderRadius: 1.5,
                                        backgroundColor: alpha(theme.palette.info.main, 0.1)
                                    }}>
                                        <People sx={{
                                            color: theme.palette.info.main,
                                            fontSize: 18
                                        }} />
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                                        Looking For
                                    </Typography>
                                </Stack>
                                <FormControl>
                                    <RadioGroup
                                        value={filters.gender}
                                        onChange={handleGenderChange}
                                        sx={{ gap: 1.5 }}
                                    >
                                        <FormControlLabel
                                            value="any"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        '&.Mui-checked': {
                                                            color: theme.palette.primary.main
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Any Gender"
                                            sx={{ color: 'text.primary' }}
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        '&.Mui-checked': {
                                                            color: theme.palette.primary.main
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Male Only"
                                            sx={{ color: 'text.primary' }}
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        '&.Mui-checked': {
                                                            color: theme.palette.primary.main
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Female Only"
                                            sx={{ color: 'text.primary' }}
                                        />
                                        <FormControlLabel
                                            value="coed"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        '&.Mui-checked': {
                                                            color: theme.palette.primary.main
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Co-ed"
                                            sx={{ color: 'text.primary' }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </Paper>
                    </Stack>
                </Box>

                {/* Footer Actions */}
                <Box sx={{
                    p: 3,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                }}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={handleClearFilters}
                            sx={{
                                flex: 1,
                                borderColor: theme.palette.divider,
                                color: theme.palette.text.secondary,
                                borderRadius: 2,
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                    color: theme.palette.primary.main
                                }
                            }}
                        >
                            Clear All
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleApplyFilters}
                            sx={{
                                flex: 2,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                    boxShadow: theme.shadows[4]
                                }
                            }}
                        >
                            Apply Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};

// Updated Filter Icon Component to integrate with navbar
export const FilterIconButton: React.FC<{ onFilterClick: () => void; activeFiltersCount: number }> = ({
    onFilterClick,
    activeFiltersCount
}) => {
    const theme = useTheme();

    return (
        <IconButton
            onClick={onFilterClick}
            sx={{
                border: `1px solid ${activeFiltersCount > 0 ? theme.palette.primary.main : theme.palette.divider}`,
                backgroundColor: activeFiltersCount > 0
                    ? alpha(theme.palette.primary.main, 0.08)
                    : 'transparent',
                borderRadius: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-1px)',
                    boxShadow: theme.shadows[4]
                }
            }}
        >
            <Badge
                badgeContent={activeFiltersCount}
                color="primary"
                sx={{
                    '& .MuiBadge-badge': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        fontSize: '0.75rem',
                        fontWeight: 600
                    }
                }}
            >
                <FilterList sx={{
                    fontSize: 20,
                    color: activeFiltersCount > 0
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary
                }} />
            </Badge>
        </IconButton>
    );
};

// Example usage in your main component
export const ExampleUsage: React.FC = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState(0);

    const handleFiltersChange = (filters: any) => {
        // Calculate active filters count based on non-default values
        let count = 0;
        if (filters.radius !== 10) count++;
        if (filters.priceRange[0] !== 500 || filters.priceRange[1] !== 2000) count++;
        if (filters.gender !== 'any') count++;
        if (filters.propertyType.length > 0) count++;
        if (filters.amenities.length > 0) count++;
        if (filters.petFriendly) count++;
        if (filters.furnished) count++;

        setActiveFilters(count);
        console.log('Applied filters:', filters);
    };

    return (
        <Box>
            {/* This would be integrated into your existing navbar */}
            <FilterIconButton
                onFilterClick={() => setFilterOpen(true)}
                activeFiltersCount={activeFilters}
            />

            <FilterSidebar
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                onFiltersChange={handleFiltersChange}
            />
        </Box>
    );
};

export default FilterSidebar;