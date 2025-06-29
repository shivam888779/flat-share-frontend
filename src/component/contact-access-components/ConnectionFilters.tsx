import React from "react";
import { 
    Box, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    SelectChangeEvent 
} from "@mui/material";

export interface ConnectionFilters {
    status: "all" | "PENDING" | "APPROVED" | "REJECTED";
}

interface ConnectionFiltersProps {
    filters: ConnectionFilters;
    onFiltersChange: (filters: ConnectionFilters) => void;
}

const ConnectionFilters: React.FC<ConnectionFiltersProps> = ({
    filters,
    onFiltersChange,
}) => {
    const handleStatusChange = (event: SelectChangeEvent) => {
        onFiltersChange({
            ...filters,
            status: event.target.value as ConnectionFilters["status"],
        });
    };

    return (
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value={filters.status}
                    label="Filter by Status"
                    onChange={handleStatusChange}
                >
                    <MenuItem value="all">All Connections</MenuItem>
                    <MenuItem value="PENDING">Pending Requests</MenuItem>
                    <MenuItem value="APPROVED">Approved Connections</MenuItem>
                    <MenuItem value="REJECTED">Rejected Requests</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ConnectionFilters; 