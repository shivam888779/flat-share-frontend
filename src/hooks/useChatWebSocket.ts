import { useEffect, useRef, useState, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage, StompSubscription, StompHeaders, StompConfig, CompatClient, Stomp } from '@stomp/stompjs';

interface UseChatWebSocketOptions {
  userId: string;
  token?: string;
}

export type ChatEvent =
  | { type: 'message'; data: ChatMessage }
  | { type: 'typing'; data: WebSocketMessage }
  | { type: 'read-receipt'; data: WebSocketMessage };

export function useChatWebSocket({ userId, token }: UseChatWebSocketOptions) {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<ChatEvent[]>([]);
  const clientRef = useRef<CompatClient | null>(null);
  const subscriptions = useRef<StompSubscription[]>([]);
  console.log(token, userId);

  // Connect and subscribe
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    clientRef.current = stompClient;

    stompClient.connectHeaders = token
      ? { Authorization: `Bearer ${token}` }
      : { Authorization: `Bearer rfrmoko` };

    stompClient.connect(
      stompClient.connectHeaders,
      () => {
        setConnected(true);
        // Subscribe to personal messages
        subscriptions.current.push(
          stompClient.subscribe(
            `/user/${userId}/queue/messages`,
            (message: IMessage) => {
              const data: ChatMessage = JSON.parse(message.body);
              setEvents((prev) => [...prev, { type: 'message', data }]);
            }
          )
        );
        // Subscribe to typing indicators
        subscriptions.current.push(
          stompClient.subscribe('/topic/typing', (message: IMessage) => {
            const data: WebSocketMessage = JSON.parse(message.body);
            setEvents((prev) => [...prev, { type: 'typing', data }]);
          })
        );
        // Subscribe to read receipts
        subscriptions.current.push(
          stompClient.subscribe(
            `/user/${userId}/queue/read-receipts`,
            (message: IMessage) => {
              const data: WebSocketMessage = JSON.parse(message.body);
              setEvents((prev) => [...prev, { type: 'read-receipt', data }]);
            }
          )
        );
      },
      (error: any) => {
        setConnected(false);
      }
    );

    return () => {
      subscriptions.current.forEach((sub) => sub.unsubscribe());
      subscriptions.current = [];
      stompClient.disconnect(() => setConnected(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token]);

  // Send message
  const sendMessage = useCallback(
    (destination: string, payload: object) => {
      if (clientRef.current && connected) {
        clientRef.current.send(destination, {}, JSON.stringify(payload));
      }
    },
    [connected]
  );

  return {
    connected,
    events,
    sendMessage,
  };
}

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