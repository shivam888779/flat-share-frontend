import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Stack,
    Fade,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    Tabs,
    Tab,
    Badge,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    Chip,
} from "@mui/material";
import { getConnectionsApi, approveRequestApi, rejectRequestApi, cancelRequestApi } from "@/api/connections";
import { useGlobalContext } from "@/global-context";
import { IConnection, IConnectionFilters } from "@/types/connection";
import { useGlobalSnackbar } from "@/hooks/useSnackbar";
import {
    ConnectionList,
    ConnectionFilters,
} from "@/component/contact-access-components";
import { People, Schedule, Send, FiberNew, Search, Refresh, PersonAdd } from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ConnectionsPage: React.FC = () => {
    const { state } = useGlobalContext();
    const { userData } = state;
    const [connections, setConnections] = useState<IConnection[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [filters, setFilters] = useState<IConnectionFilters>({
        status: "all",
    });
    const snackbar = useGlobalSnackbar();

    // Get filtered connections
    const getFilteredConnections = (filterValue: string, currentUserId: number): IConnection[] => {
        if (!connections || connections.length === 0) {
            return [];
        }

        let filtered = connections;

        // Apply status filter
        if (filterValue !== "all") {
            filtered = filtered.filter(conn => conn.status === filterValue);
        }

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(conn => {
                const otherUser = conn.requesterId === currentUserId ? conn.receiver : conn.requester;
                const searchLower = searchQuery.toLowerCase();
                return (
                    otherUser?.firstName?.toLowerCase().includes(searchLower) ||
                    otherUser?.lastName?.toLowerCase().includes(searchLower) ||
                    otherUser?.email?.toLowerCase().includes(searchLower)
                );
            });
        }

        return filtered;
    };

    // Get filtered connections
    const filteredConnections = getFilteredConnections(filters.status, userData.id);

    // Categorize connections
    const allConnections = connections;
    const incomingRequests = connections.filter(
        conn => conn.receiverId === userData.id && conn.status === 'PENDING'
    );
    const sentRequests = connections.filter(
        conn => conn.requesterId === userData.id && conn.status === 'PENDING'
    );
    const connectedUsers = connections.filter(
        conn => conn.status === 'APPROVED'
    );
    const rejectedConnections = connections.filter(
        conn => conn.status === 'REJECTED'
    );

    // Get tab-specific connections
    const getTabConnections = () => {
        switch (tabValue) {
            case 0: // All
                return filteredConnections;
            case 1: // Received
                return filteredConnections.filter(conn =>
                    conn.receiverId === userData.id && conn.status === 'PENDING'
                );
            case 2: // Sent
                return filteredConnections.filter(conn =>
                    conn.requesterId === userData.id && conn.status === 'PENDING'
                );
            case 3: // Connected
                return filteredConnections.filter(conn => conn.status === 'APPROVED');
            default:
                return filteredConnections;
        }
    };

    // Stats calculations
    const stats = {
        total: connectedUsers.length,
        pending: incomingRequests.length,
        sent: sentRequests.length,
        new: incomingRequests.filter(conn => {
            // Handle potential undefined createdAt by providing default date
            const createdDate = new Date(conn.createdAt || new Date());
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return createdDate > weekAgo;
        }).length,
    };

    const handleApprove = async (connectionId: number) => {
        try {
            const response = await approveRequestApi(connectionId);
            snackbar.success(response.data.message || "Request approved successfully!");
            getConnections();
        } catch (error) {
            snackbar.error("Failed to approve request");
        }
    };

    const handleReject = async (connectionId: number) => {
        try {
            const response = await rejectRequestApi(connectionId);
            snackbar.success(response.data.message || "Request rejected successfully!");
            getConnections();
        } catch (error) {
            snackbar.error("Failed to reject request");
        }
    };

    const handleCancelRequest = async (connectionId: number) => {
        try {
            const response = await cancelRequestApi(connectionId);
            snackbar.success(response.data.message || "Request cancelled successfully!");
            getConnections();
        } catch (error) {
            snackbar.error("Failed to cancel request");
        }
    };

    const handleFiltersChange = (newFilters: IConnectionFilters) => {
        setFilters(newFilters);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await getConnections();
        setRefreshing(false);
    };

    const getConnections = async () => {
        try {
            setLoading(true);
            const response = await getConnectionsApi();
            const connectionsData = Array.isArray(response?.data?.data) ? response.data?.data : [];
            setConnections(connectionsData);
        } catch (error) {
            console.error("Failed to fetch connections:", error);
            snackbar.error("Failed to load connections");
            setConnections([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f3f4f6',
                py: 4,
            }}
        >
            <Box maxWidth="1200px" mx="auto" px={2}>
                <Fade in={true} timeout={600}>
                    <Stack spacing={3}>
                        {/* Page Header */}
                        <Box>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                justifyContent="space-between"
                                alignItems={{ xs: 'flex-start', sm: 'center' }}
                                spacing={2}
                                mb={1}
                            >
                                <Typography variant="h4" fontWeight={700}>
                                    Connections
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Tooltip title="Find new connections">
                                        <IconButton
                                            sx={{
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark',
                                                },
                                            }}
                                        >
                                            <PersonAdd />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refresh">
                                        <IconButton
                                            onClick={handleRefresh}
                                            disabled={refreshing}
                                            sx={{
                                                backgroundColor: 'white',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <Refresh
                                                sx={{
                                                    animation: refreshing ? 'spin 1s linear infinite' : 'none',
                                                    '@keyframes spin': {
                                                        '0%': { transform: 'rotate(0deg)' },
                                                        '100%': { transform: 'rotate(360deg)' },
                                                    },
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Stack>
                            <Typography variant="body1" color="text.secondary">
                                Manage your learning network and connection requests
                            </Typography>
                        </Box>

                        {/* Stats Cards */}
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                                <Card
                                    sx={{
                                        borderRadius: '12px',
                                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Stack spacing={1}>
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <People sx={{ color: 'primary.main' }} />
                                            </Box>
                                            <Typography variant="h4" fontWeight={700}>
                                                {stats.total}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Total Connections
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={3}>
                                <Card
                                    sx={{
                                        borderRadius: '12px',
                                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Stack spacing={1}>
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Schedule sx={{ color: 'warning.main' }} />
                                            </Box>
                                            <Typography variant="h4" fontWeight={700}>
                                                {stats.pending}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Pending Requests
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={3}>
                                <Card
                                    sx={{
                                        borderRadius: '12px',
                                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Stack spacing={1}>
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Send sx={{ color: 'secondary.main' }} />
                                            </Box>
                                            <Typography variant="h4" fontWeight={700}>
                                                {stats.sent}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Sent Requests
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={3}>
                                <Card
                                    sx={{
                                        borderRadius: '12px',
                                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Stack spacing={1}>
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <FiberNew sx={{ color: 'success.main' }} />
                                            </Box>
                                            <Typography variant="h4" fontWeight={700}>
                                                {stats.new}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                New This Week
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Main Content Card */}
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '16px',
                                backgroundColor: 'white',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                                overflow: 'hidden',
                            }}
                        >
                            <Box sx={{ p: { xs: 2, sm: 3 } }}>
                                {/* Search and Filter Bar */}
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    mb={3}
                                    alignItems={{ xs: 'stretch', sm: 'center' }}
                                >
                                    <TextField
                                        placeholder="Search connections..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        size="small"
                                        sx={{
                                            flex: 1,
                                            maxWidth: { sm: 400 },
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: '#f9fafb',
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: '#e5e7eb',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#9ca3af',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main',
                                                    borderWidth: '1px',
                                                },
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search sx={{ color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <ConnectionFilters
                                        filters={filters}
                                        onFiltersChange={handleFiltersChange}
                                    />
                                </Stack>

                                {/* Tabs */}
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs
                                        value={tabValue}
                                        onChange={handleTabChange}
                                        sx={{
                                            '& .MuiTabs-indicator': {
                                                height: 3,
                                                borderRadius: '3px 3px 0 0',
                                            },
                                        }}
                                    >
                                        <Tab
                                            label={
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <span>All</span>
                                                    <Chip
                                                        label={allConnections.length}
                                                        size="small"
                                                        sx={{
                                                            height: 20,
                                                            fontSize: '0.75rem',
                                                            backgroundColor: 'primary.main',
                                                            color: 'white',
                                                        }}
                                                    />
                                                </Stack>
                                            }
                                        />
                                        <Tab
                                            label={
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <span>Received</span>
                                                    {incomingRequests.length > 0 && (
                                                        <Chip
                                                            label={incomingRequests.length}
                                                            size="small"
                                                            sx={{
                                                                height: 20,
                                                                fontSize: '0.75rem',
                                                                backgroundColor: 'error.main',
                                                                color: 'white',
                                                            }}
                                                        />
                                                    )}
                                                </Stack>
                                            }
                                        />
                                        <Tab
                                            label={
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <span>Sent</span>
                                                    {sentRequests.length > 0 && (
                                                        <Chip
                                                            label={sentRequests.length}
                                                            size="small"
                                                            sx={{
                                                                height: 20,
                                                                fontSize: '0.75rem',
                                                                backgroundColor: 'warning.main',
                                                                color: 'white',
                                                            }}
                                                        />
                                                    )}
                                                </Stack>
                                            }
                                        />
                                        <Tab
                                            label={
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <span>Connected</span>
                                                    <Chip
                                                        label={connectedUsers.length}
                                                        size="small"
                                                        sx={{
                                                            height: 20,
                                                            fontSize: '0.75rem',
                                                            backgroundColor: 'success.main',
                                                            color: 'white',
                                                        }}
                                                    />
                                                </Stack>
                                            }
                                        />
                                    </Tabs>
                                </Box>

                                {/* Tab Panels */}
                                <TabPanel value={tabValue} index={0}>
                                    <ConnectionList
                                        connections={getTabConnections()}
                                        currentUserId={userData.id}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                        onCancel={handleCancelRequest}
                                    />
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                    <ConnectionList
                                        connections={getTabConnections()}
                                        currentUserId={userData.id}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                        onCancel={handleCancelRequest}
                                    />
                                </TabPanel>
                                <TabPanel value={tabValue} index={2}>
                                    <ConnectionList
                                        connections={getTabConnections()}
                                        currentUserId={userData.id}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                        onCancel={handleCancelRequest}
                                    />
                                </TabPanel>
                                <TabPanel value={tabValue} index={3}>
                                    <ConnectionList
                                        connections={getTabConnections()}
                                        currentUserId={userData.id}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                        onCancel={handleCancelRequest}
                                    />
                                </TabPanel>
                            </Box>
                        </Paper>
                    </Stack>
                </Fade>
            </Box>
        </Box>
    );
};

export default ConnectionsPage;