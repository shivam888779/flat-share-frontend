export interface IChatMessage {
    id: number;
    chatRoomId: number;
    senderId: number;
    receiverId: number;
    content: string;
    messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'LOCATION';
    isRead: boolean;
    message:string;
    createdAt: string;
    updatedAt: string;
    sender?: IUserData;
    receiver?: IUserData;
}

export interface IChatRoom {
    id: number;
    user1Id: number;
    user2Id: number;
    createdAt: string;
    updatedAt: string;
    lastMessage?: IChatMessage;
    unreadCount: number;
    otherUser?: IUserData;
}

export interface ISendMessageRequest {
    receiverId: number;
    content: string;
    messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'LOCATION';
}

export interface ISendMessageResponse {
    success: boolean;
    message: IChatMessage;
}

export interface IChatHistoryResponse {
    messages: IChatMessage[];
    totalPages: number;
    currentPage: number;
    totalElements: number;
}

export interface IChatRoomsResponse {
    chatRooms: IChatRoom[];
    totalUnreadCount: number;
}

export interface IWebSocketMessage {
    type: 'MESSAGE' | 'TYPING' | 'STOP_TYPING' | 'READ_RECEIPT' | 'USER_PRESENCE';
    data: any;
    timestamp: string;
}

export interface ITypingIndicator {
    userId: number;
    chatRoomId: number;
    isTyping: boolean;
}

export interface IReadReceipt {
    messageId: number;
    chatRoomId: number;
    readBy: number;
    readAt: string;
}

export interface IUserPresence {
    userId: number;
    isOnline: boolean;
    lastSeen?: string;
}

export interface IChatState {
    chatRooms: IChatRoom[];
    currentChatRoom: IChatRoom | null;
    messages: IChatMessage[];
    unreadCount: number;
    isConnected: boolean;
    typingUsers: Set<number>;
    onlineUsers: Set<number>;
}

export interface IUserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string | null;
    phoneNo: string;
    gender: 'Male' | 'Female' | 'Other';
    description: string | null;
    profileImage: string;
    createdAt: string;
    updatedAt: string;
    verified: boolean;
    isLoggedIn: boolean;
    requirementListed: boolean;
} 