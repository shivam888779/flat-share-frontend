import React, { useState, useEffect } from 'react';
import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import { useChat } from '../../hooks/useChat';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import ChatHeader from './ChatHeader';
import { IUserData } from '../../types/user';

interface ChatContainerProps {
    userId: number;
    userData: IUserData;
    approvedConnections?: IUserData[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ userId, userData, approvedConnections = [] }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedChatRoom, setSelectedChatRoom] = useState<number | null>(null);
    const [showSidebar, setShowSidebar] = useState(true);

    const {
        chatRooms,
        currentChatRoom,
        messages,
        unreadCount,
        isConnected,
        loading,
        error,
        loadChatRooms,
        selectChatRoom,
        sendMessage,
        handleTypingStart,
        handleTypingStop,
        markAsRead,
        deleteMessage,
        deleteChatRoom,
        clearError
    } = useChat({ userId });

    useEffect(() => {
        if (userId) {
            loadChatRooms();
        }
    }, [userId, loadChatRooms]);

    const handleChatRoomSelect = async (otherUserId: number) => {
        setSelectedChatRoom(otherUserId);
        await selectChatRoom(otherUserId);
        if (isMobile) {
            setShowSidebar(false);
        }
    };

    const handleBackToSidebar = () => {
        setShowSidebar(true);
        setSelectedChatRoom(null);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                bgcolor: 'background.default'
            }}
        >
            <ChatWindow
                messages={messages}
                currentChatRoom={currentChatRoom}
                loading={loading.messages}
                sending={loading.sending}
                error={error}
                onSendMessage={sendMessage}
                onTypingStart={handleTypingStart}
                onTypingStop={handleTypingStop}
                onMarkAsRead={() => markAsRead(currentChatRoom.id)}
                onDeleteMessage={deleteMessage}
                userData={userData}
            />
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
                        isConnected={isConnected}
                        loading={loading.chatRooms}
                        onChatRoomSelect={handleChatRoomSelect}
                        onDeleteChatRoom={deleteChatRoom}
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
                                isConnected={isConnected}
                                onBack={isMobile ? handleBackToSidebar : undefined}
                                onDeleteChatRoom={() => deleteChatRoom(currentChatRoom.id)}
                            />
                            <ChatWindow
                                messages={messages}
                                currentChatRoom={currentChatRoom}
                                loading={loading.messages}
                                sending={loading.sending}
                                error={error}
                                onSendMessage={sendMessage}
                                onTypingStart={handleTypingStart}
                                onTypingStop={handleTypingStop}
                                onMarkAsRead={() => markAsRead(currentChatRoom.id)}
                                onDeleteMessage={deleteMessage}
                                userData={userData}
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