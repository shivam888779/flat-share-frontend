// Updated chat types to ensure consistency across components

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
    password?: string | null;
    connections?: number[];
}

export interface IChatMessage {
    id: number;
    chatRoomId: number;
    senderId: number;
    receiverId: number;
    content?: string; // For compatibility with WebSocket messages
    message: string; // Primary message content
    messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'LOCATION';
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
    sender?: IUserData;
    receiver?: IUserData;
    sending?: boolean; // For optimistic messages
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
    user1?: IUserData;
    user2?: IUserData;
    participants?: IUserData[];
    receiverId?: number; // For compatibility
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

// WebSocket hook types
export interface UseChatWebSocketOptions {
    userId: string;
    token?: string;
}

export type ChatEvent =
    | { type: 'message'; data: ChatMessage }
    | { type: 'typing'; data: WebSocketMessage }
    | { type: 'read-receipt'; data: WebSocketMessage };

// ChatRoom interface for WebSocket
export interface ChatRoom {
    id: string;
    name: string;
    participants: UserResponse[];
    createdAt: string;
    updatedAt: string;
}

// Enum for message types
export enum ChatMessageType {
    CHAT = 'CHAT',
    JOIN = 'JOIN',
    LEAVE = 'LEAVE',
    TEXT = 'TEXT',
    TYPING = 'TYPING',
    READ = 'READ',
}

// ChatMessage interface for WebSocket
export interface ChatMessage {
    id: string | number;
    roomId?: string;
    chatRoomId?: string | number;
    sender?: UserResponse | IUserData;
    senderId?: string | number;
    receiverId?: string | number;
    content?: string;
    message?: string;
    timestamp?: string;
    createdAt?: string;
    messageType?: ChatMessageType | 'TEXT' | 'IMAGE' | 'FILE' | 'LOCATION';
    readBy?: string[]; // userIds who have read
    isRead?: boolean;
}

// WebSocketMessage for events like typing, read receipt, etc.
export interface WebSocketMessage {
    type: 'TYPING' | 'STOP_TYPING' | 'READ_RECEIPT' | 'SYSTEM';
    roomId?: string;
    chatRoomId?: string | number;
    senderId?: string | number;
    payload?: any;
    timestamp: string;
}

// UserResponse interface for WebSocket
export interface UserResponse {
    id: string | number;
    username?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    profileImage?: string;
    displayName?: string;
}

// Generic API response
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

// Connection interface
export interface IConnection {
    id: number;
    requesterId: number;
    recipientId: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
    requester: IUserData;
    recipient: IUserData;
}

// Component prop interfaces
export interface ChatWindowProps {
    events: ChatEvent[];
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
    typingUsers?: string[];
}

export interface ChatSidebarProps {
    chatRooms: IChatRoom[];
    unreadCount: number;
    isConnected: boolean;
    loading: boolean;
    onChatRoomSelect: (chatRoomId: string) => void;
    onDeleteChatRoom: (chatRoomId: number) => void;
    userData: IUserData;
    approvedConnections?: IUserData[];
}

export interface ChatHeaderProps {
    chatRoom: IChatRoom;
    isConnected: boolean;
    onBack?: () => void;
    onDeleteChatRoom: () => void;
}

export interface MessageBubbleProps {
    message: IChatMessage;
    isOwnMessage: boolean;
    onDelete: () => void;
    showAvatar: boolean;
    isSending?: boolean;
}

export interface TypingIndicatorProps {
    isTyping?: boolean;
    typingUser?: string;
}