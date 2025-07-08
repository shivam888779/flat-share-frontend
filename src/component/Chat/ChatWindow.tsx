import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Typography,
    CircularProgress,
    Alert,
    Paper,
    useTheme
} from '@mui/material';
import {
    Send as SendIcon,
    AttachFile as AttachFileIcon,
    Image as ImageIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import { IChatMessage, IChatRoom, IUserData } from '../../types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { formatDistanceToNow } from 'date-fns';

interface ChatWindowProps {
    messages: IChatMessage[];
    currentChatRoom: IChatRoom;
    loading: boolean;
    sending: boolean;
    error: string | null;
    onSendMessage: (content: string, messageType?: 'TEXT' | 'IMAGE' | 'FILE' | 'LOCATION') => void;
    onTypingStart: () => void;
    onTypingStop: () => void;
    onMarkAsRead: () => void;
    onDeleteMessage: (messageId: number) => void;
    userData: IUserData;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    currentChatRoom,
    loading,
    sending,
    error,
    onSendMessage,
    onTypingStart,
    onTypingStop,
    onMarkAsRead,
    onDeleteMessage,
    userData
}) => {
    const theme = useTheme();
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Mark messages as read when chat window is focused
    useEffect(() => {
        if (messages.length > 0) {
            onMarkAsRead();
        }
    }, [messages, onMarkAsRead]);

    const handleSendMessage = () => {
        if (message.trim() && !sending) {
            onSendMessage(message.trim());
            setMessage('');
            setIsTyping(false);
            onTypingStop();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        if (!isTyping) {
            setIsTyping(true);
            onTypingStart();
        }
    };

    const handleInputBlur = () => {
        setIsTyping(false);
        onTypingStop();
    };

    const groupMessagesByDate = (messages: IChatMessage[]) => {
        const groups: { [key: string]: IChatMessage[] } = {};

        messages.forEach(msg => {
            const date = new Date(msg.createdAt).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(msg);
        });

        return Object.entries(groups).map(([date, msgs]) => ({
            date,
            messages: msgs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        }));
    };

    const messageGroups = groupMessagesByDate(messages);

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default'
            }}
        >
            {/* Messages Area */}
            <Box
                sx={{
                    flex: 1,
                    overflow: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : messages.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'text.secondary',
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            No messages yet
                        </Typography>
                        <Typography variant="body2">
                            Start the conversation by sending a message
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {messageGroups.map(({ date, messages: groupMessages }) => (
                            <Box key={date}>
                                {/* Date Separator */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        my: 2
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            px: 2,
                                            py: 0.5,
                                            bgcolor: 'background.paper',
                                            border: `1px solid ${theme.palette.divider}`
                                        }}
                                    >
                                        <Typography variant="caption" color="text.secondary">
                                            {formatDistanceToNow(new Date(date), { addSuffix: true })}
                                        </Typography>
                                    </Paper>
                                </Box>

                                {/* Messages */}
                                {groupMessages.map((msg, index) => (
                                    <MessageBubble
                                        key={msg.id}
                                        message={msg}
                                        isOwnMessage={msg.senderId === userData.id}
                                        onDelete={() => onDeleteMessage(msg.id)}
                                        showAvatar={index === 0 || groupMessages[index - 1]?.senderId !== msg.senderId}
                                    />
                                ))}
                            </Box>
                        ))}

                        {/* Typing Indicator */}
                        <TypingIndicator />

                        {/* Scroll anchor */}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </Box>

            {/* Error Display */}
            {error && (
                <Box sx={{ p: 2 }}>
                    <Alert severity="error" onClose={() => { }}>
                        {error}
                    </Alert>
                </Box>
            )}

            {/* Message Input */}
            <Box
                sx={{
                    p: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    bgcolor: 'background.paper'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 1
                    }}
                >
                    {/* Attachment Buttons */}
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton size="small" disabled={sending}>
                            <ImageIcon />
                        </IconButton>
                        <IconButton size="small" disabled={sending}>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton size="small" disabled={sending}>
                            <LocationIcon />
                        </IconButton>
                    </Box>

                    {/* Message Input */}
                    <TextField
                        ref={inputRef}
                        fullWidth
                        multiline
                        maxRows={4}
                        placeholder="Type a message..."
                        value={message}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        onBlur={handleInputBlur}
                        disabled={sending}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                            }
                        }}
                    />

                    {/* Send Button */}
                    <IconButton
                        onClick={handleSendMessage}
                        disabled={!message.trim() || sending}
                        color="primary"
                        sx={{
                            bgcolor: message.trim() ? 'primary.main' : 'action.disabledBackground',
                            color: message.trim() ? 'primary.contrastText' : 'action.disabled',
                            '&:hover': {
                                bgcolor: message.trim() ? 'primary.dark' : 'action.disabledBackground'
                            }
                        }}
                    >
                        {sending ? <CircularProgress size={20} /> : <SendIcon />}
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatWindow; 