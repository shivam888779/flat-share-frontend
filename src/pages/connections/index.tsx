import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getConnectionsApi, approveRequestApi, rejectRequestApi } from "@/api/connections";
import { useGlobalContext } from "@/global-context";
import { IConnection } from "@/types/connection";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";
import { 
  ConnectionList, 
  ConnectionFilters, 
  ConnectionFiltersType 
} from "@/component/contact-access-components";

const ConnectionsPage: React.FC = () => {
    const { state } = useGlobalContext();
    const { userData } = state;
    const [connections, setConnections] = useState<IConnection[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<ConnectionFiltersType>({
        status: "all",
    });
    const snackbar = useGlobalSnackbar();

    // Function to get filtered connections based on filter values
    const getFilteredConnections = (filterValue: string, currentUserId: number): IConnection[] => {
        if (!connections || connections.length === 0) {
            return [];
        }

        // Apply status filter
        if (filterValue === "all") {
            return connections;
        }

        return connections.filter(conn => conn.status === filterValue);
    };

    // Get filtered connections using the function
    const filteredConnections = getFilteredConnections(filters.status, userData.id);

    // Categorize filtered connections for display
    const incomingRequests = filteredConnections.filter(
        conn => conn.receiverId === userData.id && conn.status === 'PENDING'
    );
    
    const outgoingRequests = filteredConnections.filter(
        conn => conn.requesterId === userData.id && conn.status === 'PENDING'
    );
    
    const approvedConnections = filteredConnections.filter(
        conn => conn.status === 'APPROVED' && 
        (conn.requesterId === userData.id || conn.receiverId === userData.id)
    );
    
    const rejectedConnections = filteredConnections.filter(
        conn => conn.status === 'REJECTED' && 
        (conn.requesterId === userData.id || conn.receiverId === userData.id)
    );

    const handleApprove = async (connectionId: number) => {
        try {
            const response = await approveRequestApi(connectionId);
            snackbar.success(response.data.message || "Request approved successfully!");
            getConnections(); // Refresh the list
        } catch (error) {
            snackbar.error("Failed to approve request");
        }
    };

    const handleReject = async (connectionId: number) => {
        try {
            const response = await rejectRequestApi(connectionId);
            snackbar.success(response.data.message || "Request rejected successfully!");
            getConnections(); // Refresh the list
        } catch (error) {
            snackbar.error("Failed to reject request");
        }
    };

    const handleCancelRequest = async (connectionId: number) => {
        try {
            // You might need to add a cancel API endpoint
            // const response = await cancelRequestApi(connectionId);
            snackbar.success("Request cancelled successfully!");
            getConnections(); // Refresh the list
        } catch (error) {
            snackbar.error("Failed to cancel request");
        }
    };

    const handleFiltersChange = (newFilters: ConnectionFiltersType) => {
        setFilters(newFilters);
    };

    const getConnections = async () => {
        try {
            setLoading(true);
            const response = await getConnectionsApi();
            console.log("API Response:", response);
            // Ensure we're setting an array
            const connectionsData = Array.isArray(response?.data?.data) ? response.data?.data : [];
            setConnections(connectionsData);
        } catch (error) {
            console.error("Failed to fetch connections:", error);
            snackbar.error("Failed to load connections");
            setConnections([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    if (loading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>Loading connections...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Connections
            </Typography>

            {/* Status Filter */}
            <ConnectionFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
            />

            {/* Results Summary */}
            {filters.status !== "all" && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1, color: 'white' }}>
                    <Typography variant="body2">
                        Showing {filteredConnections.length} of {connections.length} connections (Filtered by: {filters.status})
                    </Typography>
                </Box>
            )}

            {/* Connection List */}
            <ConnectionList
                connections={filteredConnections}
                currentUserId={userData.id}
                onApprove={handleApprove}
                onReject={handleReject}
                onCancel={handleCancelRequest}
            />
        </Box>
    );
};

export default ConnectionsPage;
