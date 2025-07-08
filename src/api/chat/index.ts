import authApi from '../../api-service/authApi';
import {
    ISendMessageRequest,
    ISendMessageResponse,
    IChatHistoryResponse,
    IChatRoomsResponse,
    IChatRoom
} from '../../types/chat';

export const chatApi = {
    // Send a message
    sendMessage: async (data: ISendMessageRequest): Promise<ISendMessageResponse> => {
        const response = await authApi.post('/chat/send', data);
        return response.data;
    },

    // Get chat history with pagination
    getChatHistory: async (chatRoomId: number, page: number = 0, size: number = 20): Promise<IChatHistoryResponse> => {
        const response = await authApi.get(`/chat/history/${chatRoomId}`, {
            params: { page, size }
        });
        return response.data;
    },

    // Get user's chat rooms
    getChatRooms: async (): Promise<IChatRoomsResponse> => {
        const response = await authApi.get('/chat/rooms');
        return response.data;
    },

    // Get or create chat room with another user
    getChatRoom: async (otherUserId: number): Promise<IChatRoom> => {
        const response = await authApi.get(`/chat/room/${otherUserId}`);
        return response.data;
    },

    // Mark messages as read
    markAsRead: async (chatRoomId: number): Promise<void> => {
        await authApi.post(`/chat/read/${chatRoomId}`);
    },

    // Get unread message count
    getUnreadCount: async (): Promise<{ unreadCount: number }> => {
        const response = await authApi.get('/chat/unread-count');
        return response.data;
    },

    // Delete a message
    deleteMessage: async (messageId: number): Promise<void> => {
        await authApi.delete(`/chat/message/${messageId}`);
    },

    // Delete a chat room
    deleteChatRoom: async (chatRoomId: number): Promise<void> => {
        await authApi.delete(`/chat/room/${chatRoomId}`);
    }
}; 