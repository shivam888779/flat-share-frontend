import React from 'react';
import {
    Box,
    Avatar,
    Typography,
    IconButton,
    Badge,
    Chip,
    useTheme
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
    FiberManualRecord as FiberManualRecordIcon
} from '@mui/icons-material';
import { IChatRoom } from '../../types/chat';

interface ChatHeaderProps {
    chatRoom: IChatRoom;
    isConnected: boolean;
    onBack?: () => void;
    onDeleteChatRoom: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
    chatRoom,
    isConnected,
    onBack,
    onDeleteChatRoom
}) => {
    const theme = useTheme();

    const getOtherUser = () => {
        return chatRoom.otherUser || { firstName: 'Unknown', lastName: 'User', profileImage: '' };
    };

    const otherUser = getOtherUser();
    const isOnline = false; // TODO: Implement online status

    return (
        <Box
            sx={{
                p: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'background.paper'
            }}
        >
            {/* Back Button (Mobile) */}
            {onBack && (
                <IconButton
                    onClick={onBack}
                    sx={{
                        display: { xs: 'flex', md: 'none' }
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            )}

            {/* User Avatar */}
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <FiberManualRecordIcon
                        sx={{
                            color: isOnline ? theme.palette.success.main : theme.palette.grey[400],
                            fontSize: '0.75rem'
                        }}
                    />
                }
            >
                <Avatar
                    src={otherUser.profileImage}
                    alt={`${otherUser.firstName} ${otherUser.lastName}`}
                    sx={{ width: 48, height: 48 }}
                >
                    {otherUser.firstName.charAt(0)}{otherUser.lastName.charAt(0)}
                </Avatar>
            </Badge>

            {/* User Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {otherUser.firstName} {otherUser.lastName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        icon={
                            <FiberManualRecordIcon
                                sx={{
                                    color: isOnline ? theme.palette.success.main : theme.palette.grey[400],
                                    fontSize: '0.75rem'
                                }}
                            />
                        }
                        label={isOnline ? 'Online' : 'Offline'}
                        size="small"
                        color={isOnline ? 'success' : 'default'}
                        variant="outlined"
                    />
                    <Chip
                        icon={
                            <FiberManualRecordIcon
                                sx={{
                                    color: isConnected ? theme.palette.success.main : theme.palette.error.main,
                                    fontSize: '0.75rem'
                                }}
                            />
                        }
                        label={isConnected ? 'Connected' : 'Disconnected'}
                        size="small"
                        color={isConnected ? 'success' : 'error'}
                        variant="outlined"
                    />
                </Box>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                    onClick={onDeleteChatRoom}
                    sx={{
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.light',
                            color: 'error.contrastText'
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatHeader; 