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
import { chatApi } from '@/api/chat';

interface ChatWindowProps {
    events: any[];
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
    userData
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
                const { data } = await chatApi.getChatHistory(currentChatRoom.id);
                console.log('Chat history response:', data);

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

    console.log(messages, 'messages');

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
            // Create optimistic message
            const optimisticMessage = {
                id: `temp-${Date.now()}`, // Temporary ID
                chatRoomId: currentChatRoom.id,
                senderId: userData.id,
                receiverId: getReceiverId(),
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
    };

    const getReceiverId = () => {
        if (currentChatRoom?.otherUser?.id) {
            return currentChatRoom.otherUser.id;
        }
        if (currentChatRoom?.user1Id && currentChatRoom?.user2Id) {
            return currentChatRoom.user1Id === userData.id ? currentChatRoom.user2Id : currentChatRoom.user1Id;
        }
        return 0;
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

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set new timeout to stop typing after 3 seconds of inactivity
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            onTypingStop();
        }, 3000);
    };

    const handleInputBlur = () => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        setIsTyping(false);
        onTypingStop();
    };

    // Transform API response to match component's expected format
    const transformMessage = (apiMessage: any): IChatMessage => {
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
            sender: apiMessage.sender,
            receiver: apiMessage.receiver
        };
    };

    const groupMessagesByDate = (messages: any[]) => {
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
    };

    // Get other user info for typing indicator
    const getOtherUser = () => {
        if (currentChatRoom?.otherUser) {
            return currentChatRoom.otherUser;
        }
        if (currentChatRoom?.user1 && currentChatRoom?.user2) {
            return currentChatRoom.user1Id === userData.id ? currentChatRoom.user2 : currentChatRoom.user1;
        }
        return null;
    };

    const messageGroups = groupMessagesByDate(messages);
    const isLoading = loading || chatLoading;
    const otherUser = getOtherUser();
    const isOtherUserTyping = typingUsers.size > 0;

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
                {isLoading ? (
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
                                        message={transformMessage(msg)}
                                        isOwnMessage={msg.senderId === userData.id}
                                        onDelete={() => onDeleteMessage(msg.id)}
                                        showAvatar={index === 0 || groupMessages[index - 1]?.senderId !== msg.senderId}
                                        isSending={false} // Pass sending state for optimistic messages
                                    />
                                ))}
                            </Box>
                        ))}

                        {/* Typing Indicator */}
                        {isOtherUserTyping && otherUser && (
                            <TypingIndicator
                                isTyping={true}
                                typingUser={`${otherUser.firstName} ${otherUser.lastName}`}
                            />
                        )}

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