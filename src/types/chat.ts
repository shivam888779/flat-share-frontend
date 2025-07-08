// ChatRoom interface
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

// ChatMessage interface
export interface ChatMessage {
  id: string;
  roomId: string;
  sender: UserResponse;
  content: string;
  timestamp: string;
  messageType: ChatMessageType;
  readBy: string[]; // userIds who have read
}

// WebSocketMessage for events like typing, read receipt, etc.
export interface WebSocketMessage {
  type: 'TYPING' | 'READ_RECEIPT' | 'SYSTEM';
  roomId: string;
  senderId: string;
  payload?: any;
  timestamp: string;
}

// UserResponse interface
export interface UserResponse {
  id: string;
  username: string;
  avatarUrl?: string;
  displayName?: string;
}

// Generic API response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
} 