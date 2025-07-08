import React, { useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    useTheme
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Reply as ReplyIcon,
    Forward as ForwardIcon
} from '@mui/icons-material';
import { IChatMessage } from '../../types/chat';
import { formatDistanceToNow } from 'date-fns';

interface MessageBubbleProps {
    message: IChatMessage;
    isOwnMessage: boolean;
    onDelete: () => void;
    showAvatar: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isOwnMessage,
    onDelete,
    showAvatar
}) => {
    const theme = useTheme();
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
                        {message.content}
                    </Typography>
                );

            case 'IMAGE':
                return (
                    <Box
                        component="img"
                        src={message.content}
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
                            📎 {message.content}
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
                        {message.content}
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
                gap: 1
            }}
        >
            {/* Avatar (for received messages) */}
            {!isOwnMessage && showAvatar && (
                <Avatar
                    src={message.sender?.profileImage}
                    alt={`${message.sender?.firstName} ${message.sender?.lastName}`}
                    sx={{ width: 32, height: 32, mt: 'auto' }}
                >
                    {message.sender?.firstName?.charAt(0)}{message.sender?.lastName?.charAt(0)}
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
                        '&:hover .message-actions': {
                            opacity: 1
                        }
                    }}
                >
                    {/* Message Content */}
                    {renderMessageContent()}

                    {/* Message Actions */}
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
                        {formatTime(message.createdAt)}
                    </Typography>

                    {isOwnMessage && (
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
                    src={message.sender?.profileImage}
                    alt={`${message.sender?.firstName} ${message.sender?.lastName}`}
                    sx={{ width: 32, height: 32, mt: 'auto' }}
                >
                    {message.sender?.firstName?.charAt(0)}{message.sender?.lastName?.charAt(0)}
                </Avatar>
            )}

            {/* Message Menu */}
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
        </Box>
    );
};

export default MessageBubble; 