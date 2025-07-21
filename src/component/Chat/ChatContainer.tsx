import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, useTheme, useMediaQuery, Paper, Fade } from '@mui/material';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import ChatHeader from './ChatHeader';
import { IUserData } from '@/types/user';
import { IChatRoom } from '@/types/chat';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { useGlobalContext } from '@/global-context';
import { useRouter } from 'next/router';

interface ChatContainerProps {
    approvedConnections?: IUserData[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ approvedConnections = [] }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null);
    const [showSidebar, setShowSidebar] = useState(true);
    const { state } = useGlobalContext();
    const { userData } = state;

    // Memoize rooms to prevent dependency issues
    const rooms = useMemo(() => state.chatRooms || [], [state.chatRooms]);

    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') || '' : '';
    const userId = userData?.id ? String(userData.id) : '';

    // Chat state - using proper typing from existing interfaces
    const [chatRooms, setChatRooms] = useState<IChatRoom[]>(rooms);
    const [sending, setSending] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    // WebSocket hook
    const { connected, events, sendMessage } = useChatWebSocket({ userId, token });

    // Update chat rooms when state changes
    useEffect(() => {
        setChatRooms(rooms);
    }, [rooms]);

    // Find current chat room based on selected ID
    const currentChatRoom = useMemo(() => {
        if (!selectedChatRoom) return null;
        return chatRooms.find(room => room.id.toString() === selectedChatRoom) || null;
    }, [selectedChatRoom, chatRooms]);

    // Calculate total unread count
    const unreadCount = useMemo(() => {
        return chatRooms.reduce((total, room) => total + (room.unreadCount || 0), 0);
    }, [chatRooms]);

    // Helper function with proper typing
    const getReceiverId = useCallback((chatRoom: IChatRoom | null): number => {
        if (!chatRoom || !userData) return 0;
        return chatRoom.user1Id === userData.id ? chatRoom.user2Id : chatRoom.user1Id;
    }, [userData]);

    // Chat room selection logic with proper dependencies
    const handleChatRoomSelect = useCallback((roomId: string) => {
        setSelectedChatRoom(roomId);

        // Mark room as read
        setChatRooms((prev) =>
            prev.map(room =>
                room.id.toString() === roomId
                    ? { ...room, unreadCount: 0 }
                    : room
            )
        );

        if (isMobile) setShowSidebar(false);
    }, [isMobile]);

    // Auto-select chat room from URL parameter
    useEffect(() => {
        if (chatRooms.length > 0 && id) {
            const chatRoom = chatRooms.find(room => room.otherUser?.id === Number(id));
            if (chatRoom) {
                handleChatRoomSelect(chatRoom.id.toString());
            }
        }
    }, [id, chatRooms, handleChatRoomSelect]);

    // Handle incoming events
    useEffect(() => {
        if (!events.length) return;
        const lastEvent = events[events.length - 1];

        switch (lastEvent.type) {
            case 'message':
                // Update chat rooms to reflect new message
                setChatRooms((prev) =>
                    prev.map(room => {
                        const eventChatRoomId = lastEvent.data.chatRoomId?.toString() || lastEvent.data.roomId?.toString();

                        if (room.id.toString() === eventChatRoomId) {
                            return {
                                ...room,
                                lastMessage: {
                                    id: Number(lastEvent.data.id) || Date.now(),
                                    chatRoomId: room.id,
                                    senderId: Number(lastEvent.data.senderId || lastEvent.data.sender?.id) || 0,
                                    receiverId: getReceiverId(room),
                                    message: lastEvent.data.message || lastEvent.data.content || '',
                                    messageType: (lastEvent.data.messageType === 'TEXT' || lastEvent.data.messageType === 'IMAGE' || lastEvent.data.messageType === 'FILE' || lastEvent.data.messageType === 'LOCATION') ? lastEvent.data.messageType : 'TEXT',
                                    isRead: false,
                                    createdAt: lastEvent.data.timestamp || lastEvent.data.createdAt || new Date().toISOString(),
                                    updatedAt: new Date().toISOString()
                                },
                                unreadCount: selectedChatRoom === eventChatRoomId
                                    ? room.unreadCount
                                    : (room.unreadCount || 0) + 1
                            };
                        }
                        return room;
                    })
                );
                break;

            case 'typing':
                // Handle typing indicators if needed in the future
                console.log('Typing event received:', lastEvent.data);
                break;

            case 'read-receipt':
                // Handle read receipts if needed
                console.log('Read receipt received:', lastEvent.data);
                break;
        }
    }, [events, selectedChatRoom, getReceiverId]);

    // Back to sidebar handler with useCallback
    const handleBackToSidebar = useCallback(() => {
        setShowSidebar(true);
        setSelectedChatRoom(null);
    }, []);

    // Send message handler
    const handleSendMessage = useCallback(async (content: string) => {
        if (!selectedChatRoom || !userData) return;

        try {
            setSending(true);

            const messageData = {
                chatRoomId: selectedChatRoom,
                senderId: Number(userId),
                receiverId: getReceiverId(currentChatRoom),
                message: content,
                messageType: 'TEXT',
                timestamp: new Date().toISOString(),
            };

            // Send via WebSocket
            sendMessage(`/app/chat.send`, messageData);

            // Update the chat room's last message optimistically
            setChatRooms((prev) =>
                prev.map(room =>
                    room.id.toString() === selectedChatRoom
                        ? {
                            ...room,
                            lastMessage: {
                                id: Date.now(),
                                chatRoomId: room.id,
                                senderId: userData.id,
                                receiverId: getReceiverId(currentChatRoom),
                                message: content,
                                messageType: 'TEXT' as const,
                                isRead: false,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString()
                            }
                        }
                        : room
                )
            );

        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setSending(false);
        }
    }, [selectedChatRoom, userId, currentChatRoom, userData, sendMessage, getReceiverId]);

    // Typing handlers
    const handleTypingStart = useCallback(() => {
        if (!selectedChatRoom) return;
        sendMessage('/app/chat.typing', {
            chatRoomId: selectedChatRoom,
            senderId: userId,
            type: 'TYPING',
            timestamp: new Date().toISOString(),
        });
    }, [selectedChatRoom, userId, sendMessage]);

    const handleTypingStop = useCallback(() => {
        if (!selectedChatRoom) return;
        sendMessage('/app/chat.typing', {
            chatRoomId: selectedChatRoom,
            senderId: userId,
            type: 'STOP_TYPING',
            timestamp: new Date().toISOString(),
        });
    }, [selectedChatRoom, userId, sendMessage]);

    // Mark as read handler
    const handleMarkAsRead = useCallback(() => {
        if (!selectedChatRoom) return;
        sendMessage('/app/chat.read', {
            chatRoomId: selectedChatRoom,
            senderId: userId,
            type: 'READ_RECEIPT',
            timestamp: new Date().toISOString(),
        });
    }, [selectedChatRoom, userId, sendMessage]);

    // Delete chat room handler
    const handleDeleteChatRoom = useCallback((chatRoomId: number) => {
        setChatRooms((prev) => prev.filter(room => room.id !== chatRoomId));

        // If the deleted room was selected, clear selection
        if (selectedChatRoom === chatRoomId.toString()) {
            setSelectedChatRoom(null);
        }
    }, [selectedChatRoom]);

    if (!userId) {
        return (
            <Box
                sx={{
                    height: 'calc(100vh - 100px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
                        : 'linear-gradient(135deg, #f0f2f5 0%, #e8eaf6 100%)',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: theme.palette.mode === 'dark'
                            ? 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
                            : 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
                        zIndex: 0
                    }
                }}
            >
                <Fade in={true} timeout={600}>
                    <Paper
                        elevation={20}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 4,
                            bgcolor: theme.palette.mode === 'dark'
                                ? 'rgba(18, 18, 18, 0.95)'
                                : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${theme.palette.divider}`,
                            maxWidth: 400,
                            zIndex: 1,
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3,
                                boxShadow: theme.shadows[8]
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    fontSize: '2rem',
                                    color: 'white'
                                }}
                            >
                                💬
                            </Box>
                        </Box>
                        <Box
                            component="h2"
                            sx={{
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                mb: 2,
                                color: 'text.primary',
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)'
                                    : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            Welcome to Chat
                        </Box>
                        <Box
                            component="p"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                                mb: 0
                            }}
                        >
                            Please log in to start conversations with your connections
                        </Box>
                    </Paper>
                </Fade>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height: 'calc(100vh - 65px)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                bgcolor: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
                    : 'linear-gradient(135deg, #f0f2f5 0%, #e8eaf6 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark'
                        ? 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
                    zIndex: 0
                }
            }}
        >
            {/* Sidebar */}
            {showSidebar && (
                <Fade in={showSidebar} timeout={300}>
                    <Paper
                        elevation={isMobile ? 0 : 8}
                        sx={{
                            width: isMobile ? '100%' : 380,
                            height: isMobile ? '100%' : 'calc(100vh - 100px)',
                            my: isMobile ? 0 : 2,
                            ml: isMobile ? 0 : 2,
                            borderRadius: isMobile ? 0 : 3,
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: theme.palette.mode === 'dark'
                                ? 'rgba(18, 18, 18, 0.95)'
                                : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${theme.palette.divider}`,
                            overflow: 'hidden',
                            zIndex: 2,
                            position: 'relative'
                        }}
                    >
                        <ChatSidebar
                            chatRooms={chatRooms}
                            unreadCount={unreadCount}
                            isConnected={connected}
                            loading={false}
                            onChatRoomSelect={handleChatRoomSelect}
                            onDeleteChatRoom={handleDeleteChatRoom}
                            userData={userData}
                            approvedConnections={approvedConnections}
                        />
                    </Paper>
                </Fade>
            )}

            {/* Chat Window */}
            {(!showSidebar || !isMobile) && (
                <Fade in={!showSidebar || !isMobile} timeout={300}>
                    <Paper
                        elevation={isMobile ? 0 : 8}
                        sx={{
                            flex: 1,
                            height: isMobile ? '100%' : 'calc(100vh - 100px)',
                            my: isMobile ? 0 : 2,
                            mr: isMobile ? 0 : 2,
                            ml: isMobile ? 0 : showSidebar ? 1 : 2,
                            borderRadius: isMobile ? 0 : 3,
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: theme.palette.mode === 'dark'
                                ? 'rgba(18, 18, 18, 0.95)'
                                : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${theme.palette.divider}`,
                            overflow: 'hidden',
                            zIndex: 2,
                            position: 'relative'
                        }}
                    >
                        {currentChatRoom ? (
                            <>
                                <ChatHeader
                                    chatRoom={currentChatRoom}
                                    isConnected={connected}
                                    onBack={isMobile ? handleBackToSidebar : undefined}
                                    onDeleteChatRoom={() => handleDeleteChatRoom(currentChatRoom.id)}
                                />
                                <ChatWindow
                                    events={events}
                                    currentChatRoom={currentChatRoom}
                                    loading={false}
                                    sending={sending}
                                    error={null}
                                    onSendMessage={handleSendMessage}
                                    onTypingStart={handleTypingStart}
                                    onTypingStop={handleTypingStop}
                                    onMarkAsRead={handleMarkAsRead}
                                    onDeleteMessage={() => { }}
                                    userData={userData}
                                    messages={[]}
                                />
                            </>
                        ) : (
                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: 3,
                                    p: 4,
                                    textAlign: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2,
                                        opacity: 0.1,
                                        boxShadow: theme.shadows[8]
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            fontSize: '3rem',
                                            color: 'white'
                                        }}
                                    >
                                        💬
                                    </Box>
                                </Box>
                                <Box
                                    component="h3"
                                    sx={{
                                        fontSize: '2rem',
                                        fontWeight: 700,
                                        mb: 1,
                                        color: 'text.primary',
                                        background: theme.palette.mode === 'dark'
                                            ? 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)'
                                            : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    Start a Conversation
                                </Box>
                                <Box
                                    component="p"
                                    sx={{
                                        fontSize: '1.1rem',
                                        maxWidth: 500,
                                        lineHeight: 1.7,
                                        color: 'text.secondary'
                                    }}
                                >
                                    Select a chat from the sidebar to start messaging with your connections.
                                    Only approved connections can chat with each other.
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Fade>
            )}
        </Box>
    );
};

export default ChatContainer;