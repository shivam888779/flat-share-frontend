import authApi from '../../api-service/authApi';
import {
    ISendMessageRequest,
    ISendMessageResponse,
    IChatHistoryResponse,
    IChatRoomsResponse,
    IChatRoom
} from '../../types/chat';

// Send a message
export const sendMessage = async (data: ISendMessageRequest): Promise<ISendMessageResponse> => {
    const response = await authApi.post('/chat/send', data);
    return response.data;
}

// Get chat history with pagination
export const getChatHistoryApi = async (chatRoomId: number, page: number = 0, size: number = 20): Promise<IChatHistoryResponse> => {
    const response = await authApi.get(`/chat/history/${chatRoomId}`, {
        params: { page, size }
    });
    return response.data;
}

// Get user's chat rooms
export const getChatRooms = async () => {
    return await authApi.get('/chat/rooms');

}

// Get or create chat room with another user
export const getOrCreateChatRoom = async (otherUserId: number) => {
    return await authApi.get(`/chat/room/${otherUserId}`);

}

// Mark messages as read
export const markAsRead = async (chatRoomId: number) => {
    return await authApi.post(`/chat/read/${chatRoomId}`);
}

// Get unread message count
export const getUnreadCount = async () => {
    return await authApi.get('/chat/unread-count');

}

// Delete a message
export const deleteMessage = async (messageId: number) => {
    return await authApi.delete(`/chat/message/${messageId}`);
}

// Delete a chat room
export const deleteChatRoom = async (chatRoomId: number) => {
    return await authApi.delete(`/chat/room/${chatRoomId}`);
}
