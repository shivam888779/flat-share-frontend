import { useState, useEffect, useCallback, useRef } from 'react';
import { chatApi } from '../api/chat';
import { useWebSocket } from './useWebSocket';
import {
    IChatMessage,
    IChatRoom,
    IChatState,
    ISendMessageRequest,
    ITypingIndicator,
    IReadReceipt,
    IUserPresence
} from '../types/chat';

interface UseChatProps {
    userId: number;
}

export const useChat = ({ userId }: UseChatProps) => {
    const [state, setState] = useState<IChatState>({
        chatRooms: [],
        currentChatRoom: null,
        messages: [],
        unreadCount: 0,
        isConnected: false,
        typingUsers: new Set(),
        onlineUsers: new Set()
    });

    const [loading, setLoading] = useState({
        chatRooms: false,
        messages: false,
        sending: false
    });

    const [error, setError] = useState<string | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // WebSocket handlers
    const handleMessage = useCallback((message: IChatMessage) => {
        setState(prev => {
            const newMessages = [...prev.messages];
            const existingIndex = newMessages.findIndex(m => m.id === message.id);

            if (existingIndex >= 0) {
                newMessages[existingIndex] = message;
            } else {
                newMessages.unshift(message);
            }

            // Update chat rooms with new message
            const updatedChatRooms = prev.chatRooms.map(room => {
                if (room.id === message.chatRoomId) {
                    return {
                        ...room,
                        lastMessage: message,
                        unreadCount: room.unreadCount + (message.senderId !== userId ? 1 : 0)
                    };
                }
                return room;
            });

            return {
                ...prev,
                messages: newMessages,
                chatRooms: updatedChatRooms
            };
        });
    }, [userId]);

    const handleTyping = useCallback((typing: ITypingIndicator) => {
        setState(prev => {
            const newTypingUsers = new Set(prev.typingUsers);
            if (typing.isTyping) {
                newTypingUsers.add(typing.userId);
            } else {
                newTypingUsers.delete(typing.userId);
            }
            return { ...prev, typingUsers: newTypingUsers };
        });
    }, []);

    const handleReadReceipt = useCallback((receipt: IReadReceipt) => {
        setState(prev => {
            const updatedMessages = prev.messages.map(message => {
                if (message.id === receipt.messageId) {
                    return { ...message, isRead: true };
                }
                return message;
            });

            return { ...prev, messages: updatedMessages };
        });
    }, []);

    const handleUserPresence = useCallback((presence: IUserPresence) => {
        setState(prev => {
            const newOnlineUsers = new Set(prev.onlineUsers);
            if (presence.isOnline) {
                newOnlineUsers.add(presence.userId);
            } else {
                newOnlineUsers.delete(presence.userId);
            }
            return { ...prev, onlineUsers: newOnlineUsers };
        });
    }, []);

    // Initialize WebSocket
    const {
        isConnected,
        sendMessage,
        sendTyping,
        sendReadReceipt
    } = useWebSocket({
        userId,
        onMessage: handleMessage,
        onTyping: handleTyping,
        onReadReceipt: handleReadReceipt,
        onUserPresence: handleUserPresence,
        onConnect: () => setState(prev => ({ ...prev, isConnected: true })),
        onDisconnect: () => setState(prev => ({ ...prev, isConnected: false }))
    });

    // Load chat rooms
    const loadChatRooms = useCallback(async () => {
        try {
            setLoading(prev => ({ ...prev, chatRooms: true }));
            setError(null);

            const response = await chatApi.getChatRooms();
            setState(prev => ({
                ...prev,
                chatRooms: response.chatRooms,
                unreadCount: response.totalUnreadCount
            }));
        } catch (err) {
            setError('Failed to load chat rooms');
            console.error('Error loading chat rooms:', err);
        } finally {
            setLoading(prev => ({ ...prev, chatRooms: false }));
        }
    }, []);

    // Load chat history
    const loadChatHistory = useCallback(async (chatRoomId: number, page: number = 0) => {
        try {
            setLoading(prev => ({ ...prev, messages: true }));
            setError(null);

            const response = await chatApi.getChatHistory(chatRoomId, page);

            if (page === 0) {
                setState(prev => ({ ...prev, messages: response.messages }));
            } else {
                setState(prev => ({
                    ...prev,
                    messages: [...prev.messages, ...response.messages]
                }));
            }
        } catch (err) {
            setError('Failed to load chat history');
            console.error('Error loading chat history:', err);
        } finally {
            setLoading(prev => ({ ...prev, messages: false }));
        }
    }, []);

    // Select chat room
    const selectChatRoom = useCallback(async (otherUserId: number) => {
        try {
            setError(null);

            const chatRoom = await chatApi.getChatRoom(otherUserId);
            setState(prev => ({ ...prev, currentChatRoom: chatRoom }));

            // Load chat history
            await loadChatHistory(chatRoom.id);

            // Mark messages as read
            await chatApi.markAsRead(chatRoom.id);

            // Update unread count
            setState(prev => ({
                ...prev,
                chatRooms: prev.chatRooms.map(room =>
                    room.id === chatRoom.id ? { ...room, unreadCount: 0 } : room
                )
            }));
        } catch (err) {
            setError('Failed to select chat room');
            console.error('Error selecting chat room:', err);
        }
    }, [loadChatHistory]);

    // Send message
    const sendChatMessage = useCallback(async (content: string, messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'LOCATION' = 'TEXT') => {
        if (!state.currentChatRoom) return;

        try {
            setLoading(prev => ({ ...prev, sending: true }));
            setError(null);

            const request: ISendMessageRequest = {
                receiverId: state.currentChatRoom.otherUser?.id || 0,
                content,
                messageType
            };

            const response = await chatApi.sendMessage(request);

            // Add message to local state
            setState(prev => ({
                ...prev,
                messages: [response.message, ...prev.messages]
            }));

            // Send via WebSocket
            sendMessage({
                type: 'MESSAGE',
                data: response.message,
                timestamp: new Date().toISOString()
            });

            // Stop typing indicator
            sendTyping(state.currentChatRoom.id, false);
        } catch (err) {
            setError('Failed to send message');
            console.error('Error sending message:', err);
        } finally {
            setLoading(prev => ({ ...prev, sending: false }));
        }
    }, [state.currentChatRoom, sendMessage, sendTyping]);

    // Handle typing
    const handleTypingStart = useCallback(() => {
        if (!state.currentChatRoom) return;

        sendTyping(state.currentChatRoom.id, true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            sendTyping(state.currentChatRoom!.id, false);
        }, 3000);
    }, [state.currentChatRoom, sendTyping]);

    const handleTypingStop = useCallback(() => {
        if (!state.currentChatRoom) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        sendTyping(state.currentChatRoom.id, false);
    }, [state.currentChatRoom, sendTyping]);

    // Mark messages as read
    const markAsRead = useCallback(async (chatRoomId: number) => {
        try {
            await chatApi.markAsRead(chatRoomId);

            setState(prev => ({
                ...prev,
                messages: prev.messages.map(msg =>
                    msg.chatRoomId === chatRoomId ? { ...msg, isRead: true } : msg
                ),
                chatRooms: prev.chatRooms.map(room =>
                    room.id === chatRoomId ? { ...room, unreadCount: 0 } : room
                )
            }));
        } catch (err) {
            console.error('Error marking messages as read:', err);
        }
    }, []);

    // Delete message
    const deleteMessage = useCallback(async (messageId: number) => {
        try {
            await chatApi.deleteMessage(messageId);

            setState(prev => ({
                ...prev,
                messages: prev.messages.filter(msg => msg.id !== messageId)
            }));
        } catch (err) {
            setError('Failed to delete message');
            console.error('Error deleting message:', err);
        }
    }, []);

    // Delete chat room
    const deleteChatRoom = useCallback(async (chatRoomId: number) => {
        try {
            await chatApi.deleteChatRoom(chatRoomId);

            setState(prev => ({
                ...prev,
                chatRooms: prev.chatRooms.filter(room => room.id !== chatRoomId),
                currentChatRoom: prev.currentChatRoom?.id === chatRoomId ? null : prev.currentChatRoom,
                messages: prev.currentChatRoom?.id === chatRoomId ? [] : prev.messages
            }));
        } catch (err) {
            setError('Failed to delete chat room');
            console.error('Error deleting chat room:', err);
        }
    }, []);

    // Load initial data
    useEffect(() => {
        if (userId) {
            loadChatRooms();
        }
    }, [userId, loadChatRooms]);

    // Cleanup typing timeout
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    return {
        // State
        chatRooms: state.chatRooms,
        currentChatRoom: state.currentChatRoom,
        messages: state.messages,
        unreadCount: state.unreadCount,
        isConnected: state.isConnected,
        typingUsers: state.typingUsers,
        onlineUsers: state.onlineUsers,
        loading,
        error,

        // Actions
        loadChatRooms,
        loadChatHistory,
        selectChatRoom,
        sendMessage: sendChatMessage,
        handleTypingStart,
        handleTypingStop,
        markAsRead,
        deleteMessage,
        deleteChatRoom,
        clearError: () => setError(null)
    };
}; 