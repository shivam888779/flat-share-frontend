import React, { useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    useTheme,
    CircularProgress
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Reply as ReplyIcon,
    Forward as ForwardIcon
} from '@mui/icons-material';
import { IChatMessage } from '../../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { useGlobalContext } from '@/global-context';

interface MessageBubbleProps {
    message: IChatMessage;
    isOwnMessage: boolean;
    onDelete: () => void;
    showAvatar: boolean;
    isSending?: boolean; // New prop for optimistic messages
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isOwnMessage,
    onDelete,
    showAvatar,
    isSending = false
}) => {
    const theme = useTheme();
    const {state} = useGlobalContext();
    const {userData,connections} = state;
    const sender = connections.find(c => c.otherUser?.id === message.senderId)?.otherUser;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        onDelete();
        handleMenuClose();
    };

    const formatTime = (timestamp: string) => {
        try {
            return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
        } catch {
            return 'Unknown time';
        }
    };

    const renderMessageContent = () => {
        const content = message.message || message.content || '';

        switch (message.messageType) {
            case 'TEXT':
                return (
                    <Typography
                        variant="body2"
                        sx={{
                            color: isOwnMessage ? 'white' : 'text.primary',
                            wordBreak: 'break-word'
                        }}
                    >
                        {content}
                    </Typography>
                );

            case 'IMAGE':
                return (
                    <Box
                        component="img"
                        src={content}
                        alt="Image"
                        sx={{
                            maxWidth: 200,
                            maxHeight: 200,
                            borderRadius: 1,
                            cursor: 'pointer'
                        }}
                    />
                );

            case 'FILE':
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 1,
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 1
                        }}
                    >
                        <Typography variant="body2" sx={{ color: isOwnMessage ? 'white' : 'text.primary' }}>
                            📎 {content}
                        </Typography>
                    </Box>
                );

            case 'LOCATION':
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 1,
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 1
                        }}
                    >
                        <Typography variant="body2" sx={{ color: isOwnMessage ? 'white' : 'text.primary' }}>
                            📍 Location shared
                        </Typography>
                    </Box>
                );

            default:
                return (
                    <Typography variant="body2" sx={{ color: isOwnMessage ? 'white' : 'text.primary' }}>
                        {content}
                    </Typography>
                );
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                mb: 1,
                gap: 1,
                opacity: isSending ? 0.7 : 1, // Dim optimistic messages
                transition: 'opacity 0.3s ease'
            }}
        >
            {/* Avatar (for received messages) */}
            {!isOwnMessage && showAvatar && (
                <Avatar
                    src={sender?.profileImage}
                    alt={`${sender?.firstName} ${sender?.lastName}`}
                    sx={{ width: 32, height: 32, mt: 'auto' }}
                >
                    {sender?.firstName?.charAt(0)}{sender?.lastName?.charAt(0)}
                </Avatar>
            )}

            {/* Message Bubble */}
            <Box
                sx={{
                    maxWidth: '70%',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isOwnMessage ? 'flex-end' : 'flex-start'
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        p: 1.5,
                        bgcolor: isOwnMessage ? 'primary.main' : 'background.paper',
                        color: isOwnMessage ? 'white' : 'text.primary',
                        borderRadius: 2,
                        position: 'relative',
                        border: isSending ? `1px dashed ${theme.palette.primary.main}` : 'none',
                        '&:hover .message-actions': {
                            opacity: 1
                        }
                    }}
                >
                    {/* Message Content */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {renderMessageContent()}
                        {isSending && (
                            <CircularProgress
                                size={12}
                                sx={{
                                    color: isOwnMessage ? 'white' : 'primary.main',
                                    ml: 1
                                }}
                            />
                        )}
                    </Box>

                    {/* Message Actions - Hide for sending messages */}
                    {!isSending && (
                        <Box
                            className="message-actions"
                            sx={{
                                position: 'absolute',
                                top: -8,
                                right: isOwnMessage ? -8 : 'auto',
                                left: isOwnMessage ? 'auto' : -8,
                                opacity: 0,
                                transition: 'opacity 0.2s',
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 2,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={handleMenuOpen}
                                sx={{ p: 0.5 }}
                            >
                                <MoreVertIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Paper>

                {/* Message Info */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mt: 0.5,
                        px: 1
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem'
                        }}
                    >
                        {isSending ? 'Sending...' : formatTime(message.createdAt)}
                    </Typography>

                    {isOwnMessage && !isSending && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: message.isRead ? 'success.main' : 'text.secondary',
                                fontSize: '0.75rem'
                            }}
                        >
                            {message.isRead ? '✓✓' : '✓'}
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Avatar (for sent messages) */}
            {isOwnMessage && showAvatar && (
                <Avatar
                    src={userData?.profileImage}
                    alt={`${userData?.firstName} ${userData?.lastName}`}
                    sx={{ width: 32, height: 32, mt: 'auto' }}
                >
                    {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
                </Avatar>
            )}

            {/* Message Menu - Don't show for sending messages */}
            {!isSending && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                >
                    <MenuItem onClick={handleMenuClose}>
                        <ReplyIcon fontSize="small" sx={{ mr: 1 }} />
                        Reply
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <ForwardIcon fontSize="small" sx={{ mr: 1 }} />
                        Forward
                    </MenuItem>
                    {isOwnMessage && (
                        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                            Delete
                        </MenuItem>
                    )}
                </Menu>
            )}
        </Box>
    );
};

export default MessageBubble;