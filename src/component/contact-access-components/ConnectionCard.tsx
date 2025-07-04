import React, { ReactElement } from "react";
import {
    Card,
    CardContent,
    Stack,
    Avatar,
    Typography,
    Button,
    Chip,
    Box,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";
import { IConnection } from "@/types/connection";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import ReplayIcon from '@mui/icons-material/Replay';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ConnectionCardProps {
    connection: IConnection;
    isIncoming: boolean;
    currentUserId: number;
    onApprove?: () => void;
    onReject?: () => void;
    onCancel?: () => void;
    showActions?: boolean;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
    connection,
    isIncoming,
    currentUserId,
    onApprove,
    onReject,
    onCancel,
    showActions = true,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Get the other user's information
    const otherUser = isIncoming ? connection.requester : connection.receiver;
    const isOnline = Math.random() > 0.5; // Mock online status

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    // Get status config
    const getStatusConfig = () => {
        switch (connection.status) {
            case 'PENDING':
                return {
                    label: isIncoming ? 'Incoming Request' : 'Outgoing Request',
                    color: 'warning' as const,
                    icon: isIncoming ? <CallReceivedIcon fontSize="small" /> : <CallMadeIcon fontSize="small" />,
                };
            case 'APPROVED':
                return {
                    label: 'Connected',
                    color: 'success' as const,
                    icon: <CheckIcon fontSize="small" />,
                };
            case 'REJECTED':
                return {
                    label: 'Rejected',
                    color: 'error' as const,
                    icon: <CloseIcon fontSize="small" />,
                };
            default:
                return {
                    label: connection.status,
                    color: 'default' as const,
                    icon: null,
                };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <Card
            sx={{
                borderRadius: '12px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'visible',
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    backgroundColor: `${statusConfig.color}.main`,
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                    {/* Main Content Row */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        {/* Avatar */}
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={otherUser?.profileImage}
                                sx={{
                                    width: 56,
                                    height: 56,
                                    backgroundColor: 'primary.light',
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                }}
                            >
                                {otherUser?.firstName?.[0]?.toUpperCase()}
                                {otherUser?.lastName?.[0]?.toUpperCase()}
                            </Avatar>
                            {isOnline && connection.status === 'APPROVED' && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 2,
                                        right: 2,
                                        width: 14,
                                        height: 14,
                                        backgroundColor: 'success.main',
                                        border: '2px solid white',
                                        borderRadius: '50%',
                                    }}
                                />
                            )}
                        </Box>

                        {/* User Info */}
                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {otherUser?.firstName} {otherUser?.lastName}
                                </Typography>
                                <Chip
                                    label={statusConfig.label}
                                    size="small"
                                    icon={statusConfig.icon as ReactElement}
                                    color={statusConfig.color}
                                    sx={{
                                        height: 24,
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                    }}
                                />
                            </Stack>

                            <Stack direction="row" spacing={2} alignItems="center">
                                {otherUser?.email && (
                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {otherUser.email}
                                        </Typography>
                                    </Stack>
                                )}
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                    <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {formatDate(connection.createdAt ?? '')}
                                    </Typography>
                                </Stack>
                            </Stack>

                            {connection.message && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 1,
                                        fontStyle: 'italic',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            display: 'inline-block',
                                            width: 20,
                                            height: 1,
                                            backgroundColor: 'divider',
                                        }}
                                    />
                                    &quot;{connection.message}&quot;
                                </Typography>
                            )}
                        </Box>

                        {/* Actions */}
                        {showActions && (
                            <Stack direction="row" spacing={1} alignItems="center">
                                {connection.status === 'PENDING' && isIncoming && (
                                    <>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<CheckIcon />}
                                            onClick={onApprove}
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                            startIcon={<CloseIcon />}
                                            onClick={onReject}
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                            }}
                                        >
                                            Decline
                                        </Button>
                                    </>
                                )}

                                {connection.status === 'PENDING' && !isIncoming && (
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        startIcon={<CloseIcon />}
                                        onClick={onCancel}
                                        sx={{
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Cancel Request
                                    </Button>
                                )}

                                {connection.status === 'APPROVED' && (
                                    <>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<MessageIcon />}
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Message
                                        </Button>
                                        <Tooltip title="More options">
                                            <IconButton onClick={handleMenuClick}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                )}

                                {connection.status === 'REJECTED' && (
                                    <>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<VisibilityIcon />}
                                            sx={{
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                            }}
                                        >
                                            View Profile
                                        </Button>
                                        {!isIncoming && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<ReplayIcon />}
                                                sx={{
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Send Again
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </CardContent>

            {/* Options Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        borderRadius: '8px',
                        minWidth: 180,
                    },
                }}
            >
                <MenuItem onClick={handleMenuClose}>
                    <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                    View Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                    <PersonRemoveIcon fontSize="small" sx={{ mr: 1 }} />
                    Remove Connection
                </MenuItem>
            </Menu>
        </Card>
    );
};

export default ConnectionCard;