import React, { useEffect, useState, useMemo, useCallback } from "react";
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

// Constants
const DAYS_IN_WEEK = 7;
const TAB_INDICES = {
    ALL: 0,
    RECEIVED: 1,
    SENT: 2,
    CONNECTED: 3,
} as const;

const CONNECTION_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
} as const;

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
    const { state, fetchConnections } = useGlobalContext();
    const { userData, connections } = state;
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [tabValue, setTabValue] = useState(TAB_INDICES.ALL);
    const [filters, setFilters] = useState<IConnectionFilters>({
        status: "all",
    });
    const snackbar = useGlobalSnackbar();

    // Memoized connection categorization
    const categorizedConnections = useMemo(() => {
        if (!connections?.length) {
            return {
                all: [],
                incoming: [],
                sent: [],
                connected: [],
                rejected: [],
            };
        }

        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - DAYS_IN_WEEK);

        return {
            all: connections,
            incoming: connections.filter(
                conn => conn.receiverId === userData.id && conn.status === CONNECTION_STATUS.PENDING
            ),
            sent: connections.filter(
                conn => conn.requesterId === userData.id && conn.status === CONNECTION_STATUS.PENDING
            ),
            connected: connections.filter(
                conn => conn.status === CONNECTION_STATUS.APPROVED
            ),
            rejected: connections.filter(
                conn => conn.status === CONNECTION_STATUS.REJECTED
            ),
        };
    }, [connections, userData.id]);

    // Memoized search and filter logic
    const filteredConnections = useMemo(() => {
        const { all } = categorizedConnections;

        if (!all.length) return [];

        let filtered = all;

        // Apply status filter
        if (filters.status !== "all") {
            filtered = filtered.filter(conn => conn.status === filters.status);
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(conn => {
                const { otherUser } = conn;
                return (
                    otherUser?.firstName?.toLowerCase().includes(searchLower) ||
                    otherUser?.lastName?.toLowerCase().includes(searchLower) ||
                    otherUser?.email?.toLowerCase().includes(searchLower)
                );
            });
        }

        return filtered;
    }, [categorizedConnections, filters.status, searchQuery]);

    // Memoized tab-specific connections
    const tabConnections = useMemo(() => {
        const { incoming, sent, connected } = categorizedConnections;

        switch (tabValue) {
            case TAB_INDICES.RECEIVED:
                return searchQuery.trim() ?
                    filteredConnections.filter(conn =>
                        conn.receiverId === userData.id && conn.status === CONNECTION_STATUS.PENDING
                    ) : incoming;
            case TAB_INDICES.SENT:
                return searchQuery.trim() ?
                    filteredConnections.filter(conn =>
                        conn.requesterId === userData.id && conn.status === CONNECTION_STATUS.PENDING
                    ) : sent;
            case TAB_INDICES.CONNECTED:
                return searchQuery.trim() ?
                    filteredConnections.filter(conn => conn.status === CONNECTION_STATUS.APPROVED) : connected;
            default:
                return filteredConnections;
        }
    }, [tabValue, filteredConnections, categorizedConnections, userData.id, searchQuery]);

    // Memoized stats
    const stats = useMemo(() => {
        const { connected, incoming } = categorizedConnections;
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - DAYS_IN_WEEK);

        const newThisWeek = incoming.filter(conn => {
            const createdDate = new Date(conn.createdAt || new Date());
            return createdDate > weekAgo;
        }).length;

        return {
            total: connected.length,
            pending: incoming.length,
            sent: categorizedConnections.sent.length,
            new: newThisWeek,
        };
    }, [categorizedConnections]);

    // Memoized connection card schema
    const connectionCardSchema = useMemo(() => [
        {
            title: "Total Connections",
            icon: <People sx={{ color: 'primary.main' }} />,
            value: stats.total,
            count: categorizedConnections.all.length,
        },
        {
            title: "Pending Requests",
            icon: <Schedule sx={{ color: 'warning.main' }} />,
            value: stats.pending,
            count: categorizedConnections.incoming.length,
        },
        {
            title: "Sent Requests",
            icon: <Send sx={{ color: 'secondary.main' }} />,
            value: stats.sent,
            count: categorizedConnections.sent.length,
        },
        {
            title: "New This Week",
            icon: <FiberNew sx={{ color: 'success.main' }} />,
            value: stats.new,
            count: stats.new,
        }
    ], [stats, categorizedConnections]);

    // Optimized action handlers with useCallback
    const handleConnectionAction = useCallback(async (
        action: 'approve' | 'reject' | 'cancel',
        connectionId: number
    ) => {
        try {
            const apiCall = {
                approve: approveRequestApi,
                reject: rejectRequestApi,
                cancel: cancelRequestApi,
            }[action];

            const response = await apiCall(connectionId);
            const messages = {
                approve: "Request approved successfully!",
                reject: "Request rejected successfully!",
                cancel: "Request cancelled successfully!",
            };

            snackbar.success(response.data.message || messages[action]);
            await fetchConnections();
        } catch (error) {
            const errorMessages = {
                approve: "Failed to approve request",
                reject: "Failed to reject request",
                cancel: "Failed to cancel request",
            };
            snackbar.error(errorMessages[action]);
        }
    }, [snackbar, fetchConnections]);

    const handleApprove = useCallback((connectionId: number) =>
        handleConnectionAction('approve', connectionId), [handleConnectionAction]);

    const handleReject = useCallback((connectionId: number) =>
        handleConnectionAction('reject', connectionId), [handleConnectionAction]);

    const handleCancelRequest = useCallback((connectionId: number) =>
        handleConnectionAction('cancel', connectionId), [handleConnectionAction]);

    const handleFiltersChange = useCallback((newFilters: IConnectionFilters) => {
        setFilters(newFilters);
    }, []);

    const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }, []);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchConnections();
        } catch (error) {
            snackbar.error("Failed to refresh connections");
        } finally {
            setRefreshing(false);
        }
    }, [fetchConnections, snackbar]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    // Initialize data
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchConnections();
            } catch (error) {
                snackbar.error("Failed to load connections");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchConnections, snackbar]);

    // Render tab label with count
    const renderTabLabel = useCallback((label: string, count: number, showBadge = true) => (
        <Stack direction="row" spacing={1} alignItems="center">
            <span>{label}</span>
            {(showBadge && count > 0) && (
                <Chip
                    label={count}
                    size="small"
                    sx={{
                        height: 20,
                        fontSize: '0.75rem',
                        backgroundColor: label === 'Received' ? 'error.main' :
                            label === 'Sent' ? 'warning.main' :
                                label === 'Connected' ? 'success.main' : 'primary.main',
                        color: 'white',
                    }}
                />
            )}
        </Stack>
    ), []);

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
                            <Typography display={{ xs: 'none', md: 'flex' }} variant="body1" color="text.secondary">
                                Manage your learning network and connection requests
                            </Typography>
                        </Box>

                        {/* Stats Cards */}
                        <Stack direction="row" display={{ xs: 'none', md: 'flex' }} gap={2} flexWrap="wrap" justifyContent="space-between">
                            {connectionCardSchema.map((item, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        height: 'fit-content',
                                        width: 'fit-content',
                                        minWidth: '260px',
                                    }}
                                >
                                    <CardContent>
                                        <Stack direction="row" gap={2}>
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
                                                {item.icon}
                                            </Box>
                                            <Stack direction="column" spacing={1}>
                                                <Typography variant="h4" fontWeight={700}>
                                                    {item.value}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.title}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

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
                                        onChange={handleSearchChange}
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
                                        <Tab label={renderTabLabel('All', categorizedConnections.all.length)} />
                                        <Tab label={renderTabLabel('Received', categorizedConnections.incoming.length)} />
                                        <Tab label={renderTabLabel('Sent', categorizedConnections.sent.length)} />
                                        <Tab label={renderTabLabel('Connected', categorizedConnections.connected.length)} />
                                    </Tabs>
                                </Box>

                                {/* Tab Panels */}
                                {[TAB_INDICES.ALL, TAB_INDICES.RECEIVED, TAB_INDICES.SENT, TAB_INDICES.CONNECTED].map((index) => (
                                    <TabPanel key={index} value={tabValue} index={index}>
                                        <ConnectionList
                                            connections={tabConnections}
                                            currentUserId={userData.id}
                                            onApprove={handleApprove}
                                            onReject={handleReject}
                                            onCancel={handleCancelRequest}
                                        />
                                    </TabPanel>
                                ))}
                            </Box>
                        </Paper>
                    </Stack>
                </Fade>
            </Box>
        </Box>
    );
};

export default ConnectionsPage;