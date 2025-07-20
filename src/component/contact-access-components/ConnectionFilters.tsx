import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, IconButton, Popover, Stack, Typography, Chip, Button, Divider } from "@mui/material";
import { FilterList, Clear } from '@mui/icons-material';
import { IConnectionFilters } from "@/types/connection";

interface ConnectionFiltersProps {
    filters: IConnectionFilters;
    onFiltersChange: (filters: IConnectionFilters) => void;
}

const ConnectionFilters: React.FC<ConnectionFiltersProps> = ({
    filters,
    onFiltersChange,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleStatusChange = (event: SelectChangeEvent) => {
        onFiltersChange({
            ...filters,
            status: event.target.value as IConnectionFilters["status"],
        });
    };

    const handleClearFilters = () => {
        onFiltersChange({
            status: "all",
        });
        handleClose();
    };

    const activeFiltersCount = filters.status !== "all" ? 1 : 0;

    const statusOptions = [
        { value: "all", label: "All Connections", color: null },
        { value: "PENDING", label: "Pending Requests", color: "warning" },
        { value: "APPROVED", label: "Approved Connections", color: "success" },
        { value: "REJECTED", label: "Rejected Requests", color: "error" },
    ];

    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    onClick={handleClick}
                    sx={{
                        borderRadius: '8px',
                        borderColor: 'grey.300',
                        color: activeFiltersCount > 0 ? 'primary.main' : 'text.secondary',
                        backgroundColor: activeFiltersCount > 0 ? 'primary.light' : 'transparent',
                        fontWeight: 500,
                        textTransform: 'none',
                        '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: activeFiltersCount > 0 ? 'primary.dark' : 'transparent',
                        },
                    }}
                    endIcon={
                        activeFiltersCount > 0 && (
                            <Chip
                                label={activeFiltersCount}
                                size="small"
                                sx={{
                                    height: 20,
                                    backgroundColor: 'primary.main',
                                    color: 'common.white',
                                    fontSize: '0.75rem',
                                }}
                            />
                        )
                    }
                >
                    Filter
                </Button>
            </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        borderRadius: '12px',
                        mt: 1,
                        minWidth: 300,
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="subtitle1" fontWeight={600}>
                                Filters
                            </Typography>
                            {activeFiltersCount > 0 && (
                                <IconButton
                                    size="small"
                                    onClick={handleClearFilters}
                                    sx={{ color: 'text.secondary' }}
                                >
                                    <Clear fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>

                        <Divider />

                        <FormControl fullWidth size="small">
                            <InputLabel id="status-filter-label">Status</InputLabel>
                            <Select
                                labelId="status-filter-label"
                                id="status-filter"
                                value={filters.status}
                                label="Status"
                                onChange={handleStatusChange}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'grey.300',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'grey.400',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'primary.main',
                                        borderWidth: '1px',
                                    },
                                }}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography>{option.label}</Typography>
                                            {option.color && (
                                                <Box
                                                    sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        backgroundColor: `${option.color}.main`,
                                                    }}
                                                />
                                            )}
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {activeFiltersCount > 0 && (
                            <>
                                <Divider />
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        Active filters:
                                    </Typography>
                                    {filters.status !== "all" && (
                                        <Chip
                                            label={statusOptions.find(opt => opt.value === filters.status)?.label}
                                            size="small"
                                            onDelete={() => handleStatusChange({ target: { value: "all" } } as SelectChangeEvent)}
                                            sx={{
                                                height: 24,
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    )}
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Box>
            </Popover>
        </>
    );
};

export default ConnectionFilters;