import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Box, TextField, IconButton, Typography, CircularProgress, Alert, Paper, useTheme, Fade, Zoom, Divider, Tooltip } from '@mui/material';
import { Send, AttachFile, EmojiEmotions, MoreVert } from '@mui/icons-material';
import { ChatWindowProps, IChatMessage } from '@/types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { formatDistanceToNow } from 'date-fns';
import { getChatHistoryApi } from '@/api/chat';

const ChatWindow: React.FC<ChatWindowProps> = ({
    events,
    currentChatRoom,
    loading,
    sending,
    error,
    onSendMessage,
    onTypingStart,
    onTypingStop,
    onMarkAsRead,
    onDeleteMessage,
    userData,
}) => {
    const theme = useTheme();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Load chat history when chat room changes
    useEffect(() => {
        const getChatHistory = async () => {
            if (!currentChatRoom?.id) return;

            try {
                setChatLoading(true);
                const { data } = await getChatHistoryApi(currentChatRoom.id);

                if (data && Array.isArray(data)) {
                    setMessages(data);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                console.error('Error fetching chat history:', error);
                setMessages([]);
            } finally {
                setChatLoading(false);
            }
        };

        // Clear messages when switching rooms
        setMessages([]);
        setTypingUsers(new Set());
        getChatHistory();
    }, [currentChatRoom?.id]);

    // Handle incoming WebSocket events
    useEffect(() => {
        if (!events || !Array.isArray(events) || !currentChatRoom?.id) return;

        // Filter events for current chat room
        const relevantEvents = events.filter(event =>
            event.data?.chatRoomId === currentChatRoom.id
        );

        // Process events
        relevantEvents.forEach(event => {
            if (event.type === 'message') {
                const newMessage = {
                    id: event.data.id,
                    chatRoomId: event.data.chatRoomId,
                    senderId: event.data.senderId,
                    receiverId: event.data.receiverId,
                    message: event.data.message,
                    messageType: event.data.messageType || 'TEXT',
                    isRead: event.data.isRead || false,
                    createdAt: event.data.createdAt || new Date().toISOString(),
                    updatedAt: event.data.updatedAt || event.data.createdAt || new Date().toISOString(),
                    sender: event.data.sender,
                    receiver: event.data.receiver
                };

                // Add message if it doesn't already exist
                setMessages(prevMessages => {
                    const exists = prevMessages.some(msg =>
                        msg.id === newMessage.id ||
                        (msg.senderId === newMessage.senderId &&
                            msg.message === newMessage.message &&
                            Math.abs(new Date(msg.createdAt).getTime() - new Date(newMessage.createdAt).getTime()) < 2000)
                    );

                    if (!exists) {
                        return [...prevMessages, newMessage].sort((a, b) =>
                            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        );
                    }
                    return prevMessages;
                });
            } else if (event.type === 'typing') {
                const senderId = Number(event.data.senderId);

                if (senderId !== userData.id) { // Don't show own typing
                    setTypingUsers(prev => {
                        const newSet = new Set(prev);
                        if (event.data.type === 'TYPING') {
                            newSet.add(senderId);
                        } else if (event.data.type === 'STOP_TYPING') {
                            newSet.delete(senderId);
                        }
                        return newSet;
                    });
                }
            }
        });
    }, [events, currentChatRoom?.id, userData.id]);

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

    // Memoize receiver ID calculation
    const receiverId = useMemo(() => {
        if (currentChatRoom?.otherUser?.id) {
            return currentChatRoom.otherUser.id;
        }
        if (currentChatRoom?.user1Id && currentChatRoom?.user2Id) {
            return currentChatRoom.user1Id === userData.id ? currentChatRoom.user2Id : currentChatRoom.user1Id;
        }
        return 0;
    }, [currentChatRoom, userData.id]);

    // Handle send message with useCallback
    const handleSendMessage = useCallback(() => {
        if (message.trim() && !sending) {
            // Create optimistic message
            const optimisticMessage = {
                id: `temp-${Date.now()}`, // Temporary ID
                chatRoomId: currentChatRoom.id,
                senderId: userData.id,
                receiverId,
                message: message.trim(),
                messageType: 'TEXT' as const,
                isRead: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sender: userData,
                receiver: currentChatRoom?.otherUser,
                sending: true // Flag for optimistic message
            };

            // Add optimistic message immediately
            setMessages(prev => [...prev, optimisticMessage]);

            // Send message through parent component
            onSendMessage(message.trim());

            setMessage('');
            setIsTyping(false);
            onTypingStop();
        }
    }, [message, sending, currentChatRoom, userData, receiverId, onSendMessage, onTypingStop]);

    // Handle key press with useCallback
    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    // Handle input change with useCallback
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        if (!isTyping) {
            setIsTyping(true);
            onTypingStart();
        }

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set new timeout to stop typing after 3 seconds of inactivity
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            onTypingStop();
        }, 3000);
    }, [isTyping, onTypingStart, onTypingStop]);

    // Handle input blur with useCallback
    const handleInputBlur = useCallback(() => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        setIsTyping(false);
        onTypingStop();
    }, [onTypingStop]);

    // Handle attachment button click
    const handleAttachmentClick = useCallback(() => {
        // TODO: Implement file attachment
        console.log('Attachment clicked');
    }, []);

    // Handle emoji button click
    const handleEmojiClick = useCallback(() => {
        // TODO: Implement emoji picker
        console.log('Emoji clicked');
    }, []);

    // Transform API response to match component's expected format
    const transformMessage = useCallback((apiMessage: any): IChatMessage => {
        return {
            id: apiMessage.id,
            chatRoomId: apiMessage.chatRoomId,
            senderId: apiMessage.senderId,
            receiverId: apiMessage.receiverId,
            message: apiMessage.message,
            content: apiMessage.message, // For compatibility
            messageType: apiMessage.messageType,
            isRead: apiMessage.isRead,
            createdAt: apiMessage.createdAt,
            updatedAt: apiMessage.updatedAt || apiMessage.createdAt,
        };
    }, []);

    // Group messages by date
    const groupMessagesByDate = useCallback((messages: any[]) => {
        const groups: { [key: string]: any[] } = {};

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
    }, []);

    // Get other user info for typing indicator
    const getOtherUser = useCallback(() => {
        if (currentChatRoom?.otherUser) {
            return currentChatRoom.otherUser;
        }
        if (currentChatRoom?.user1 && currentChatRoom?.user2) {
            return currentChatRoom.user1Id === userData.id ? currentChatRoom.user2 : currentChatRoom.user1;
        }
        return null;
    }, [currentChatRoom, userData.id]);

    const messageGroups = useMemo(() => groupMessagesByDate(messages), [messages, groupMessagesByDate]);
    const isLoading = loading || chatLoading;
    const otherUser = getOtherUser();
    const isOtherUserTyping = typingUsers.size > 0;
    const canSend = message.trim() && !sending;

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Messages Area */}
            <Box

                sx={{
                    flex: 1,
                    overflow: 'auto',
                    p: { xs: 1, sm: 2 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    paddingBottom: '120px', // More space for enhanced input area
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(180deg, rgba(18, 18, 18, 0.3) 0%, rgba(24, 24, 24, 0.5) 100%)'
                        : 'linear-gradient(180deg, rgba(248, 250, 252, 0.3) 0%, rgba(241, 245, 249, 0.5) 100%)',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        bgcolor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                        '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                        },
                    },
                }}
            >
                {isLoading ? (
                    <Fade in={isLoading}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                flexDirection: 'column',
                                gap: 3
                            }}
                        >
                            <CircularProgress
                                size={50}
                                thickness={4}
                                sx={{
                                    color: 'primary.main',
                                    '& .MuiCircularProgress-circle': {
                                        strokeLinecap: 'round',
                                    }
                                }}
                            />
                            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Loading conversation...
                            </Typography>
                        </Box>
                    </Fade>
                ) : messages.length === 0 ? (
                    <Fade in={messages.length === 0}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                textAlign: 'center',
                                gap: 3,
                                p: 4
                            }}
                        >
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    opacity: 0.15,
                                    boxShadow: theme.shadows[8]
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        fontSize: '3.5rem',
                                        color: 'white'
                                    }}
                                >
                                    💬
                                </Box>
                            </Box>
                            <Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        background: theme.palette.mode === 'dark'
                                            ? 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)'
                                            : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    Start the conversation
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        maxWidth: 500,
                                        lineHeight: 1.7,
                                        color: 'text.secondary',
                                        fontWeight: 400
                                    }}
                                >
                                    Send your first message to {otherUser?.firstName} and begin your conversation
                                </Typography>
                            </Box>
                        </Box>
                    </Fade>
                ) : (
                    <>
                        {messageGroups.map(({ date, messages: groupMessages }) => (
                            <Box key={date} sx={{ scrollBehavior: 'smooth', scrollMarginTop: '100px', maxHeight: '65vh', overflow: 'auto', marginBottom: '100px' }} >
                                {/* Date Separator */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        my: 4
                                    }}
                                >
                                    <Zoom in={true} timeout={500}>
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                background: theme.palette.mode === 'dark'
                                                    ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(24, 24, 24, 0.9) 100%)'
                                                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                                                borderRadius: 25,
                                                border: `1px solid ${theme.palette.divider}`,
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '0.875rem',
                                                    letterSpacing: 0.5
                                                }}
                                            >
                                                {formatDistanceToNow(new Date(date), { addSuffix: true })}
                                            </Typography>
                                        </Paper>
                                    </Zoom>
                                </Box>

                                {/* Messages */}
                                {groupMessages.map((msg, index) => (
                                    <Fade key={msg.id} in={true} timeout={400 + index * 100}>
                                        <Box sx={{ mb: 1 }} id={msg.id} >
                                            <MessageBubble
                                                message={transformMessage(msg)}
                                                isOwnMessage={msg.senderId === userData.id}
                                                onDelete={() => onDeleteMessage(msg.id)}
                                                showAvatar={index === 0 || groupMessages[index - 1]?.senderId !== msg.senderId}
                                                // isSending={msg.sending || false}
                                                isSending={false}
                                            />
                                        </Box>
                                    </Fade>
                                ))}
                            </Box>
                        ))}

                        {/* Typing Indicator */}
                        {isOtherUserTyping && otherUser && (
                            <Fade in={isOtherUserTyping}>
                                <Box sx={{ mt: 2 }}>
                                    <TypingIndicator
                                        isTyping={true}
                                        typingUser={`${otherUser.firstName} ${otherUser.lastName}`}
                                    />
                                </Box>
                            </Fade>
                        )}

                        {/* Scroll anchor */}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </Box>

            {/* Error Display */}
            {error && (
                <Fade in={!!error}>
                    <Box sx={{ p: 2 }}>
                        <Alert
                            severity="error"
                            onClose={() => { }}
                            sx={{
                                borderRadius: 3,
                                fontWeight: 500
                            }}
                        >
                            {error}
                        </Alert>
                    </Box>
                </Fade>
            )}

            {/* Enhanced Message Input Area */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, sm: 3 },
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(180deg, rgba(18, 18, 18, 0.95) 0%, rgba(24, 24, 24, 0.98) 100%)'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderTop: `1px solid ${theme.palette.divider}`,
                    zIndex: 1000
                }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        border: `2px solid ${canSend ? theme.palette.primary.main + '40' : theme.palette.divider}`,
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(24, 24, 24, 0.9) 100%)'
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                        transition: 'all 0.3s ease',
                        '&:focus-within': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: `0 0 0 4px ${theme.palette.primary.main}20`
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: 1.5,
                            p: 2
                        }}
                    >
                        {/* Attachment Button */}
                        <Tooltip title="Attach file">
                            <IconButton
                                onClick={handleAttachmentClick}
                                size="medium"
                                sx={{
                                    color: 'text.secondary',
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <AttachFile />
                            </IconButton>
                        </Tooltip>

                        {/* Message Input */}
                        <TextField
                            ref={inputRef}
                            fullWidth
                            multiline
                            maxRows={4}
                            placeholder={`Message ${otherUser?.firstName || 'user'}...`}
                            value={message}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            onBlur={handleInputBlur}
                            disabled={sending}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    px: 2,
                                    py: 1,
                                    fontSize: '1rem',
                                    lineHeight: 1.5,
                                    '& input::placeholder, & textarea::placeholder': {
                                        color: 'text.secondary',
                                        opacity: 0.8,
                                        fontWeight: 400
                                    }
                                }
                            }}
                        />

                        {/* Emoji Button */}
                        <Tooltip title="Add emoji">
                            <IconButton
                                onClick={handleEmojiClick}
                                size="medium"
                                sx={{
                                    color: 'text.secondary',
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                    '&:hover': {
                                        bgcolor: 'warning.main',
                                        color: 'white',
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <EmojiEmotions />
                            </IconButton>
                        </Tooltip>

                        {/* Send Button */}
                        <Tooltip title={canSend ? "Send message" : "Type a message"}>
                            <Box>
                                <IconButton
                                    onClick={handleSendMessage}
                                    disabled={!canSend}
                                    sx={{
                                        background: canSend
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                        color: canSend ? 'white' : 'text.disabled',
                                        width: 48,
                                        height: 48,
                                        '&:hover': {
                                            background: canSend
                                                ? 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                                                : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                            transform: canSend ? 'scale(1.1) rotate(5deg)' : 'none',
                                            boxShadow: canSend ? theme.shadows[8] : 'none'
                                        },
                                        '&:disabled': {
                                            background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                            color: 'text.disabled'
                                        },
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: canSend ? theme.shadows[4] : 'none'
                                    }}
                                >
                                    {sending ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        <Send />
                                    )}
                                </IconButton>
                            </Box>
                        </Tooltip>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default ChatWindow;