import { useEffect, useRef, useState, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage, StompSubscription, CompatClient, Stomp } from '@stomp/stompjs';

interface UseChatWebSocketOptions {
  userId: string;
  token?: string;
}

export type ChatEvent =
  | { type: 'message'; data: ChatMessage }
  | { type: 'typing'; data: WebSocketMessage }
  | { type: 'read-receipt'; data: WebSocketMessage }
  | { type: 'user-presence'; data: WebSocketMessage };

export interface ChatMessage {
  id: string | number;
  roomId?: string;
  chatRoomId?: string | number;
  sender?: UserResponse;
  senderId?: string | number;
  receiverId?: string | number;
  content?: string;
  message?: string;
  timestamp?: string;
  createdAt?: string;
  messageType?: ChatMessageType | 'TEXT' | 'IMAGE' | 'FILE' | 'LOCATION';
  readBy?: string[];
  isRead?: boolean;
}

export interface WebSocketMessage {
  type: 'TYPING' | 'STOP_TYPING' | 'READ_RECEIPT' | 'SYSTEM' | 'USER_PRESENCE';
  roomId?: string;
  chatRoomId?: string | number;
  senderId?: string | number;
  payload?: any;
  timestamp: string;
}

export interface UserResponse {
  id: string | number;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  profileImage?: string;
  displayName?: string;
}

export enum ChatMessageType {
  CHAT = 'CHAT',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  TEXT = 'TEXT',
  TYPING = 'TYPING',
  READ = 'READ',
}

export function useChatWebSocket({ userId, token }: UseChatWebSocketOptions) {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<ChatEvent[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const clientRef = useRef<CompatClient | null>(null);
  const subscriptions = useRef<StompSubscription[]>([]);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3 seconds

  // Connect function
  const connect = useCallback(() => {
    if (clientRef.current?.connected) {
      return; // Already connected
    }

    try {
      const socket = new SockJS('http://35.232.250.35/ws');
      const stompClient = Stomp.over(socket);

      // Disable debug logging in production
      stompClient.debug = (msg) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('STOMP:', msg);
        }
      };

      clientRef.current = stompClient;

      // Set connection headers
      const connectHeaders = token
        ? { Authorization: `Bearer ${token}` }
        : { Authorization: `Bearer rfrmoko` }; // Fallback token

      stompClient.connect(
        connectHeaders,
        // On successful connection
        () => {
          console.log('WebSocket connected successfully');
          setConnected(true);
          setReconnectAttempts(0);

          // Clear any existing subscriptions
          subscriptions.current.forEach(sub => sub.unsubscribe());
          subscriptions.current = [];

          try {
            // Subscribe to personal messages
            const messagesSub = stompClient.subscribe(
              `/user/${userId}/queue/messages`,
              (message: IMessage) => {
                try {
                  const data: ChatMessage = JSON.parse(message.body);
                  console.log('Received message:', data);
                  setEvents((prev) => [...prev, { type: 'message', data }]);
                } catch (error) {
                  console.error('Error parsing message:', error);
                }
              }
            );
            subscriptions.current.push(messagesSub);

            // Subscribe to typing indicators
            const typingSub = stompClient.subscribe(
              '/topic/typing',
              (message: IMessage) => {
                try {
                  const data: WebSocketMessage = JSON.parse(message.body);
                  console.log('Received typing indicator:', data);
                  setEvents((prev) => [...prev, { type: 'typing', data }]);
                } catch (error) {
                  console.error('Error parsing typing indicator:', error);
                }
              }
            );
            subscriptions.current.push(typingSub);

            // Subscribe to read receipts
            const readReceiptsSub = stompClient.subscribe(
              `/user/${userId}/queue/read-receipts`,
              (message: IMessage) => {
                try {
                  const data: WebSocketMessage = JSON.parse(message.body);
                  console.log('Received read receipt:', data);
                  setEvents((prev) => [...prev, { type: 'read-receipt', data }]);
                } catch (error) {
                  console.error('Error parsing read receipt:', error);
                }
              }
            );
            subscriptions.current.push(readReceiptsSub);

            // Subscribe to user presence updates (optional)
            const presenceSub = stompClient.subscribe(
              '/topic/presence',
              (message: IMessage) => {
                try {
                  const data: WebSocketMessage = JSON.parse(message.body);
                  console.log('Received presence update:', data);
                  setEvents((prev) => [...prev, { type: 'user-presence', data }]);
                } catch (error) {
                  console.error('Error parsing presence update:', error);
                }
              }
            );
            subscriptions.current.push(presenceSub);

          } catch (subscriptionError) {
            console.error('Error setting up subscriptions:', subscriptionError);
          }
        },
        // On connection error
        (error: any) => {
          console.error('WebSocket connection error:', error);
          setConnected(false);

          // Attempt to reconnect
          if (reconnectAttempts < maxReconnectAttempts) {
            const nextAttempt = reconnectAttempts + 1;
            setReconnectAttempts(nextAttempt);

            console.log(`Attempting to reconnect (${nextAttempt}/${maxReconnectAttempts}) in ${reconnectDelay}ms...`);

            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, reconnectDelay * nextAttempt); // Exponential backoff
          } else {
            console.error('Max reconnection attempts reached');
          }
        }
      );
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      setConnected(false);
    }
  }, [userId, token, reconnectAttempts]);

  // Disconnect function
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    subscriptions.current.forEach((sub) => sub.unsubscribe());
    subscriptions.current = [];

    if (clientRef.current) {
      clientRef.current.disconnect(() => {
        console.log('WebSocket disconnected');
        setConnected(false);
      });
    }
  }, []);

  // Send message function
  const sendMessage = useCallback(
    (destination: string, payload: object) => {
      if (clientRef.current?.connected) {
        try {
          const messageBody = JSON.stringify(payload);
          console.log('Sending message:', { destination, payload });
          clientRef.current.send(destination, {}, messageBody);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        console.warn('Cannot send message: WebSocket not connected');
        // Optionally attempt to reconnect
        if (!connected && reconnectAttempts < maxReconnectAttempts) {
          connect();
        }
      }
    },
    [connected, reconnectAttempts, connect]
  );

  // Clear events function
  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  // Effect to establish connection
  useEffect(() => {
    if (userId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [userId, connect, disconnect]);

  // Effect to handle page visibility (reconnect when page becomes visible)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !connected && userId) {
        console.log('Page became visible, attempting to reconnect...');
        connect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [connected, userId, connect]);

  // Effect to handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      console.log('Connection restored, attempting to reconnect...');
      if (!connected && userId) {
        connect();
      }
    };

    const handleOffline = () => {
      console.log('Connection lost');
      setConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [connected, userId, connect]);

  return {
    connected,
    events,
    sendMessage,
    clearEvents,
    reconnectAttempts,
    connect,
    disconnect
  };
}