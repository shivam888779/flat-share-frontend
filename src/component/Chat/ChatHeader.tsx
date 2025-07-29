import React, { useMemo, useCallback } from 'react';
import { Box, Avatar, Typography, IconButton, Badge, Chip, useTheme, Paper, Tooltip } from '@mui/material';
import { ArrowBack, Delete, MoreVert, FiberManualRecord, VideoCall, Call } from '@mui/icons-material';
import { ChatHeaderProps } from '@/types/chat';
import { useGlobalContext } from '@/global-context';

const ChatHeader: React.FC<ChatHeaderProps> = ({
    chatRoom,
    isConnected,
    onBack,
    onDeleteChatRoom
}) => {
    const theme = useTheme();
    const { state } = useGlobalContext();
    const { connections } = state;

    // Memoize other user data
    const otherUser = useMemo(() => {
        return connections.find(c => c.otherUser?.id === chatRoom.otherUser?.id)?.otherUser || {
            firstName: 'Unknown',
            lastName: 'User',
            profileImage: ''
        };
    }, [connections, chatRoom.otherUser?.id]);

    // Memoize user display name
    const userDisplayName = useMemo(() => {
        return `${otherUser.firstName} ${otherUser.lastName}`;
    }, [otherUser.firstName, otherUser.lastName]);

    // Memoize user initials
    const userInitials = useMemo(() => {
        return `${otherUser.firstName.charAt(0)}${otherUser.lastName.charAt(0)}`;
    }, [otherUser.firstName, otherUser.lastName]);

    // Handle back action with useCallback
    const handleBack = useCallback(() => {
        if (onBack) {
            onBack();
        }
    }, [onBack]);

    // Handle delete action with useCallback  
    const handleDelete = useCallback(() => {
        onDeleteChatRoom();
    }, [onDeleteChatRoom]);

    // Handle more options with useCallback
    const handleMoreOptions = useCallback(() => {
        // TODO: Implement more options menu
        console.log('More options clicked');
    }, []);

    // Handle video call
    const handleVideoCall = useCallback(() => {
        // TODO: Implement video call
        console.log('Video call clicked');
    }, []);

    // Handle voice call
    const handleVoiceCall = useCallback(() => {
        // TODO: Implement voice call
        console.log('Voice call clicked');
    }, []);

    const isOnline = false; // TODO: Implement online status

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 0,
                borderBottom: `1px solid ${theme.palette.divider}`,
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(24, 24, 24, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)'
                        : 'linear-gradient(90deg, rgba(59, 130, 246, 0.02) 0%, transparent 100%)',
                    zIndex: 0
                }
            }}
        >
            <Box
                sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {/* Back Button (Mobile) */}
                {onBack && (
                    <Tooltip title="Back to conversations">
                        <IconButton
                            onClick={handleBack}
                            size="small"
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                '&:hover': {
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                                    transform: 'scale(1.05)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <ArrowBack fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}

                {/* User Avatar with Online Status */}
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: isOnline ? 'success.main' : 'grey.400',
                                border: `2px solid ${theme.palette.background.paper}`,
                                boxShadow: theme.shadows[2]
                            }}
                        />
                    }
                >
                    <Avatar
                        src={otherUser.profileImage}
                        alt={userDisplayName}
                        sx={{
                            width: { xs: 48, sm: 56 },
                            height: { xs: 48, sm: 56 },
                            border: `3px solid ${theme.palette.primary.main}20`,
                            boxShadow: theme.shadows[4],
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: theme.shadows[8]
                            }
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {userInitials}
                        </Typography>
                    </Avatar>
                </Badge>

                {/* User Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)'
                                : 'linear-gradient(45deg, #1a1a1a 30%, #4a4a4a 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {userDisplayName}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        {/* Online Status Chip */}
                        <Chip
                            icon={
                                <FiberManualRecord
                                    sx={{
                                        color: isOnline ? 'success.main' : 'grey.400',
                                        fontSize: '0.75rem'
                                    }}
                                />
                            }
                            label={isOnline ? 'Online' : 'Offline'}
                            size="small"
                            color={isOnline ? 'success' : 'default'}
                            variant="outlined"
                            sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                borderRadius: 2,
                                '& .MuiChip-icon': {
                                    width: 12,
                                    height: 12
                                }
                            }}
                        />

                        {/* Connection Status Chip */}
                        <Chip
                            icon={
                                <FiberManualRecord
                                    sx={{
                                        color: isConnected ? 'success.main' : 'error.main',
                                        fontSize: '0.75rem'
                                    }}
                                />
                            }
                            label={isConnected ? 'Connected' : 'Disconnected'}
                            size="small"
                            color={isConnected ? 'success' : 'error'}
                            variant="outlined"
                            sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                borderRadius: 2,
                                '& .MuiChip-icon': {
                                    width: 12,
                                    height: 12
                                }
                            }}
                        />
                    </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Voice Call Button */}
                    <Tooltip title="Voice call">
                        <IconButton
                            onClick={handleVoiceCall}
                            size="small"
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                                color: 'success.main',
                                '&:hover': {
                                    bgcolor: 'success.main',
                                    color: 'white',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease',
                                display: { xs: 'none', sm: 'flex' }
                            }}
                        >
                            <Call fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    {/* Video Call Button */}
                    <Tooltip title="Video call">
                        <IconButton
                            onClick={handleVideoCall}
                            size="small"
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                                color: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease',
                                display: { xs: 'none', sm: 'flex' }
                            }}
                        >
                            <VideoCall fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip title="Delete conversation">
                        <IconButton
                            onClick={handleDelete}
                            size="small"
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                color: 'error.main',
                                '&:hover': {
                                    bgcolor: 'error.main',
                                    color: 'white',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    {/* More Options Button */}
                    <Tooltip title="More options">
                        <IconButton
                            onClick={handleMoreOptions}
                            size="small"
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                '&:hover': {
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Paper>
    );
};

export default ChatHeader; 