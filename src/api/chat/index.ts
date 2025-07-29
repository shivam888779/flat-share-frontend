import authApi from '../../api-service/authApi';
import { ISendMessageRequest, ISendMessageResponse, IChatHistoryResponse } from '../../types/chat';

export const sendMessage = async (data: ISendMessageRequest): Promise<ISendMessageResponse> => {
    const response = await authApi.post('/chat/send', data);
    return response.data;
}

export const getChatHistoryApi = async (chatRoomId: number, page: number = 0, size: number = 20): Promise<IChatHistoryResponse> => {
    const response = await authApi.get(`/chat/history/${chatRoomId}`, {
        params: { page, size }
    });
    return response.data;
}

export const getChatRooms = async () => {
    return await authApi.get('/chat/rooms');

}

export const getOrCreateChatRoom = async (otherUserId: number) => {
    return await authApi.get(`/chat/room/${otherUserId}`);

}

export const markAsRead = async (chatRoomId: number) => {
    return await authApi.post(`/chat/read/${chatRoomId}`);
}

export const getUnreadCount = async () => {
    return await authApi.get('/chat/unread-count');

}

export const deleteMessage = async (messageId: number) => {
    return await authApi.delete(`/chat/message/${messageId}`);
}

export const deleteChatRoom = async (chatRoomId: number) => {
    return await authApi.delete(`/chat/room/${chatRoomId}`);
}
