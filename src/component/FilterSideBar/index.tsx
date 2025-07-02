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
    Badge
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
                    maxWidth: '90vw'
                }
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <FilterList sx={{ color: '#6c5ce7' }} />
                            <Typography variant="h6" fontWeight={600}>
                                Filters
                            </Typography>
                            {getActiveFiltersCount() > 0 && (
                                <Badge badgeContent={getActiveFiltersCount()} color="primary" />
                            )}
                        </Stack>
                        <IconButton onClick={onClose} size="small">
                            <Close />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Filter Content */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                    <Stack spacing={3}>
                        {/* Search Radius */}
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LocationOn sx={{ color: '#6c5ce7', fontSize: 20 }} />
                                    <Typography variant="subtitle1" fontWeight={600}>
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
                                            color: '#6c5ce7',
                                            '& .MuiSlider-thumb': {
                                                backgroundColor: '#6c5ce7'
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
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <AttachMoney sx={{ color: '#6c5ce7', fontSize: 20 }} />
                                    <Typography variant="subtitle1" fontWeight={600}>
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
                                            color: '#6c5ce7',
                                            '& .MuiSlider-thumb': {
                                                backgroundColor: '#6c5ce7'
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
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <People sx={{ color: '#6c5ce7', fontSize: 20 }} />
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        Looking For
                                    </Typography>
                                </Stack>
                                <FormControl>
                                    <RadioGroup
                                        value={filters.gender}
                                        onChange={handleGenderChange}
                                        sx={{ gap: 1 }}
                                    >
                                        <FormControlLabel
                                            value="any"
                                            control={<Radio sx={{ color: '#6c5ce7', '&.Mui-checked': { color: '#6c5ce7' } }} />}
                                            label="Any Gender"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio sx={{ color: '#6c5ce7', '&.Mui-checked': { color: '#6c5ce7' } }} />}
                                            label="Male Only"
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio sx={{ color: '#6c5ce7', '&.Mui-checked': { color: '#6c5ce7' } }} />}
                                            label="Female Only"
                                        />
                                        <FormControlLabel
                                            value="coed"
                                            control={<Radio sx={{ color: '#6c5ce7', '&.Mui-checked': { color: '#6c5ce7' } }} />}
                                            label="Co-ed"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </Paper>


                    </Stack>
                </Box>

                {/* Footer Actions */}
                <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={handleClearFilters}
                            sx={{
                                flex: 1,
                                borderColor: '#e0e0e0',
                                color: '#666',
                                '&:hover': {
                                    borderColor: '#6c5ce7',
                                    backgroundColor: '#f3f0ff'
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
                                backgroundColor: '#6c5ce7',
                                '&:hover': {
                                    backgroundColor: '#5f3dc4'
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
    return (
        <IconButton
            onClick={onFilterClick}
            sx={{
                border: '1px solid',
                borderColor: activeFiltersCount > 0 ? '#6c5ce7' : '#e0e0e0',
                backgroundColor: activeFiltersCount > 0 ? '#f3f0ff' : 'transparent',
                '&:hover': {
                    backgroundColor: '#f3f0ff',
                    borderColor: '#6c5ce7'
                }
            }}
        >
            <Badge badgeContent={activeFiltersCount} color="primary">
                <FilterList sx={{ fontSize: 20, color: activeFiltersCount > 0 ? '#6c5ce7' : '#636e72' }} />
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