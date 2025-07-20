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
    useTheme,
    useMediaQuery,
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Get the other user's information
    const otherUser = connection.otherUser;
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
        if (isMobile && diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`;
        if (isMobile) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return date.toLocaleDateString();
    };

    // Get status config
    const getStatusConfig = () => {
        switch (connection.status) {
            case 'PENDING':
                return {
                    label: isIncoming ? (isMobile ? 'Incoming' : 'Incoming Request') : (isMobile ? 'Outgoing' : 'Outgoing Request'),
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

    // Render action buttons based on status and screen size
    const renderActionButtons = () => {
        if (!showActions) return null;

        const buttonProps = {
            size: (isMobile ? 'small' : 'small') as 'small',
            sx: {
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: isMobile ? 500 : 600,
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                minWidth: isMobile ? 'auto' : 'auto',
                px: isMobile ? 1.5 : 2,
            },
        };

        if (connection.status === 'PENDING' && isIncoming) {
            return (
                <Stack
                    direction="row"
                    spacing={isMobile ? 1 : 1}
                    width={isMobile ? '100%' : 'auto'}
                >
                    <Button
                        variant="contained"
                        onClick={onApprove}
                        fullWidth={isMobile}
                        {...buttonProps}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onReject}
                        fullWidth={isMobile}
                        {...buttonProps}
                    >
                        Decline
                    </Button>
                </Stack>
            );
        }

        if (connection.status === 'PENDING' && !isIncoming) {
            return (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={onCancel}
                    fullWidth={isMobile}
                    {...buttonProps}
                >
                    Cancel Request
                </Button>
            );
        }

        if (connection.status === 'APPROVED') {
            return (
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    width={isMobile ? '100%' : 'auto'}
                >
                    <Button
                        variant="contained"
                        fullWidth={isMobile}
                        {...buttonProps}
                    >
                        Message
                    </Button>
                    <Tooltip title="More options">
                        <IconButton
                            onClick={handleMenuClick}
                            sx={{
                                minWidth: isMobile ? 40 : 48,
                                height: isMobile ? 40 : 48,
                            }}
                        >
                            <MoreVertIcon fontSize={isMobile ? 'small' : 'medium'} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            );
        }

        if (connection.status === 'REJECTED') {
            return (
                <Stack
                    direction="row"
                    spacing={isMobile ? 1 : 1}
                    width={isMobile ? '100%' : 'auto'}
                >
                    <Button
                        variant="outlined"
                        fullWidth={isMobile}
                        {...buttonProps}
                    >
                        View Profile
                    </Button>
                    {!isIncoming && (
                        <Button
                            variant="outlined"
                            fullWidth={isMobile}
                            {...buttonProps}
                        >
                            Send Again
                        </Button>
                    )}
                </Stack>
            );
        }

        return null;
    };

    return (
        <Card
            sx={{
                borderRadius: isMobile ? '8px' : '12px',
                boxShadow: isMobile
                    ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'visible',
                transition: 'all 0.3s ease',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': !isMobile ? {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                } : {},
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: isMobile ? 3 : 4,
                    backgroundColor: `${statusConfig.color}.main`,
                },
            }}
        >
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                <Stack spacing={isMobile ? 2 : 2}>
                    {/* Main Content */}
                    <Stack
                        direction={isMobile ? 'column' : 'row'}
                        alignItems={isMobile ? 'flex-start' : 'center'}
                        spacing={2}
                    >
                        {/* Avatar and User Info Row */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            sx={{ flex: 1, width: '100%' }}
                        >
                            {/* Avatar */}
                            <Box sx={{ position: 'relative', flexShrink: 0 }}>
                                <Avatar
                                    src={otherUser?.profileImage}
                                    sx={{
                                        width: isMobile ? 48 : 56,
                                        height: isMobile ? 48 : 56,
                                        backgroundColor: 'primary.light',
                                        fontSize: isMobile ? '1rem' : '1.25rem',
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
                                            bottom: isMobile ? 1 : 2,
                                            right: isMobile ? 1 : 2,
                                            width: isMobile ? 12 : 14,
                                            height: isMobile ? 12 : 14,
                                            backgroundColor: 'success.main',
                                            border: '2px solid white',
                                            borderRadius: '50%',
                                        }}
                                    />
                                )}
                            </Box>

                            {/* User Info */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Stack
                                    direction={isMobile ? 'column' : 'row'}
                                    alignItems={isMobile ? 'flex-start' : 'center'}
                                    spacing={isMobile ? 0.5 : 1}
                                    mb={0.5}
                                >
                                    <Typography
                                        variant={isMobile ? 'body1' : 'subtitle1'}
                                        fontWeight={600}
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        {otherUser?.firstName} {otherUser?.lastName}  <Chip
                                            label={statusConfig.label}
                                            size="small"
                                            icon={statusConfig.icon as ReactElement}
                                            color={statusConfig.color}
                                            sx={{
                                                height: isMobile ? 20 : 24,
                                                fontSize: isMobile ? '0.6rem' : '0.75rem',
                                                fontWeight: 500,
                                                alignSelf: isMobile ? 'flex-start' : 'center',
                                            }}
                                        />
                                    </Typography>

                                </Stack>

                                <Stack
                                    direction={isMobile ? 'column' : 'row'}
                                    spacing={isMobile ? 0.5 : 2}
                                    alignItems={isMobile ? 'flex-start' : 'center'}
                                >

                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                        <CalendarTodayIcon sx={{
                                            fontSize: isMobile ? 14 : 16,
                                            color: 'text.secondary',
                                            flexShrink: 0,
                                        }} />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                                        >
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
                                            fontSize: isMobile ? '0.75rem' : '0.875rem',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 0.5,
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                display: 'inline-block',
                                                width: isMobile ? 16 : 20,
                                                height: 1,
                                                backgroundColor: 'divider',
                                                flexShrink: 0,
                                                mt: 0.7,
                                            }}
                                        />
                                        <Box
                                            component="span"
                                            sx={{
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: isMobile ? 2 : 3,
                                                WebkitBoxOrient: 'vertical',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            &quot;{connection.message}&quot;
                                        </Box>
                                    </Typography>
                                )}
                            </Box>
                        </Stack>

                        {/* Actions - Desktop */}
                        {!isMobile && showActions && (
                            <Box sx={{ flexShrink: 0 }}>
                                {renderActionButtons()}
                            </Box>
                        )}
                    </Stack>

                    {/* Actions - Mobile */}
                    {isMobile && showActions && (
                        <Box sx={{ width: '100%' }}>
                            {renderActionButtons()}
                        </Box>
                    )}
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
                        minWidth: isMobile ? 160 : 180,
                        '& .MuiMenuItem-root': {
                            fontSize: isMobile ? '0.875rem' : '1rem',
                            py: isMobile ? 1 : 1.5,
                        },
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