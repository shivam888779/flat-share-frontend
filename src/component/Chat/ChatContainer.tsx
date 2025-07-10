import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import ChatHeader from './ChatHeader';
import { IUserData } from '../../types/user';
import { useChatWebSocket, ChatEvent, ChatMessage, WebSocketMessage } from '../../hooks/useChatWebSocket';
import { useGlobalContext } from '@/global-context';

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
    const rooms = state.chatRooms || [];

    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') || '' : '';
    const userId = userData?.id ? String(userData.id) : '';

    // Chat state
    const [chatRooms, setChatRooms] = useState<any[]>(rooms);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
    const [sending, setSending] = useState(false);

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
                                    id: lastEvent.data.id,
                                    message: lastEvent.data.message || lastEvent.data.content,
                                    createdAt: lastEvent.data.timestamp || lastEvent.data.createdAt,
                                    senderId: lastEvent.data.senderId || lastEvent.data.sender?.id,
                                    messageType: lastEvent.data.messageType || 'TEXT'
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
                setTypingUsers((prev) => {
                    const newSet = new Set(prev);
                    const senderId = lastEvent.data.senderId?.toString();

                    if (lastEvent.data.type === 'TYPING') {
                        newSet.add(senderId || '');
                    } else {
                        newSet.delete(senderId || '');
                    }
                    return newSet;
                });
                break;

            case 'read-receipt':
                // Handle read receipts if needed
                console.log('Read receipt received:', lastEvent.data);
                break;
        }
    }, [events, selectedChatRoom]);

    // Chat room selection logic
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

    const handleBackToSidebar = () => {
        setShowSidebar(true);
        setSelectedChatRoom(null);
    };

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
                                message: content,
                                createdAt: new Date().toISOString(),
                                senderId: userData.id,
                                messageType: 'TEXT'
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
    }, [selectedChatRoom, userId, currentChatRoom, userData, sendMessage]);

    // Helper function to get receiver ID from chat room
    const getReceiverId = (chatRoom: any): number => {
        if (!chatRoom || !userData) return 0;
        return chatRoom.user1Id === userData.id ? chatRoom.user2Id : chatRoom.user1Id;
    };

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
    const handleDeleteChatRoom = (chatRoomId: number) => {
        setChatRooms((prev) => prev.filter(room => room.id !== chatRoomId));

        // If the deleted room was selected, clear selection
        if (selectedChatRoom === chatRoomId.toString()) {
            setSelectedChatRoom(null);
            setMessages([]);
        }
    };

    if (!userId) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default'
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Box
                        component="h2"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            mb: 1,
                            color: 'text.primary'
                        }}
                    >
                        Please log in to access chat
                    </Box>
                    <Box
                        component="p"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '1rem'
                        }}
                    >
                        You need to be logged in to use the chat feature.
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                bgcolor: 'background.default'
            }}
        >
            {/* Sidebar */}
            {showSidebar && (
                <Box
                    sx={{
                        width: isMobile ? '100%' : 320,
                        height: isMobile ? '100%' : '100vh',
                        borderRight: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
                        display: 'flex',
                        flexDirection: 'column'
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
                </Box>
            )}

            {/* Chat Window */}
            {(!showSidebar || !isMobile) && (
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh'
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
                                typingUsers={Array.from(typingUsers)}
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
                                gap: 2,
                                p: 3
                            }}
                        >
                            <Box
                                component="img"
                                src="/images/chat-placeholder.svg"
                                alt="Start a conversation"
                                sx={{
                                    width: 200,
                                    height: 200,
                                    opacity: 0.6,
                                    mb: 2
                                }}
                                onError={(e) => {
                                    // Hide image if it fails to load
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    color: 'text.secondary'
                                }}
                            >
                                <Box
                                    component="h3"
                                    sx={{
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                        mb: 1,
                                        color: 'text.primary'
                                    }}
                                >
                                    Start a Conversation
                                </Box>
                                <Box
                                    component="p"
                                    sx={{
                                        fontSize: '1rem',
                                        maxWidth: 400,
                                        lineHeight: 1.6
                                    }}
                                >
                                    Select a chat from the sidebar to start messaging with your connections.
                                    Only approved connections can chat with each other.
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ChatContainer;