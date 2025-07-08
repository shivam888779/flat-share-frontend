import { useEffect, useRef, useCallback, useState } from 'react';
import { IWebSocketMessage, ITypingIndicator, IReadReceipt, IUserPresence } from '../types/chat';

interface UseWebSocketProps {
    userId: number;
    onMessage?: (message: any) => void;
    onTyping?: (typing: ITypingIndicator) => void;
    onReadReceipt?: (receipt: IReadReceipt) => void;
    onUserPresence?: (presence: IUserPresence) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
}

export const useWebSocket = ({
    userId,
    onMessage,
    onTyping,
    onReadReceipt,
    onUserPresence,
    onConnect,
    onDisconnect
}: UseWebSocketProps) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;

    const connect = useCallback(() => {
        if (isConnecting || isConnected) return;

        setIsConnecting(true);
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || `ws://35.232.250.35/ws`;

        try {
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                setIsConnecting(false);
                reconnectAttempts.current = 0;
                onConnect?.();

                // Send user identification
                ws.send(JSON.stringify({
                    type: 'USER_CONNECT',
                    data: { userId }
                }));
            };

            ws.onmessage = (event) => {
                try {
                    const message: IWebSocketMessage = JSON.parse(event.data);

                    switch (message.type) {
                        case 'MESSAGE':
                            onMessage?.(message.data);
                            break;
                        case 'TYPING':
                        case 'STOP_TYPING':
                            onTyping?.(message.data);
                            break;
                        case 'READ_RECEIPT':
                            onReadReceipt?.(message.data);
                            break;
                        case 'USER_PRESENCE':
                            onUserPresence?.(message.data);
                            break;
                        default:
                            console.log('Unknown message type:', message.type);
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            ws.onclose = (event) => {
                console.log('WebSocket disconnected:', event.code, event.reason);
                setIsConnected(false);
                setIsConnecting(false);
                onDisconnect?.();

                // Attempt to reconnect
                if (reconnectAttempts.current < maxReconnectAttempts) {
                    reconnectAttempts.current++;
                    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);

                    reconnectTimeoutRef.current = setTimeout(() => {
                        console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})`);
                        connect();
                    }, delay);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setIsConnecting(false);
            };
        } catch (error) {
            console.error('Error creating WebSocket connection:', error);
            setIsConnecting(false);
        }
    }, []);

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        setIsConnected(false);
        setIsConnecting(false);
    }, []);

    const sendMessage = useCallback((message: any) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not connected');
        }
    }, []);

    const sendTyping = useCallback((chatRoomId: number, isTyping: boolean) => {
        sendMessage({
            type: isTyping ? 'TYPING' : 'STOP_TYPING',
            data: {
                userId,
                chatRoomId,
                isTyping
            },
            timestamp: new Date().toISOString()
        });
    }, [userId, sendMessage]);

    const sendReadReceipt = useCallback((messageId: number, chatRoomId: number) => {
        sendMessage({
            type: 'READ_RECEIPT',
            data: {
                messageId,
                chatRoomId,
                readBy: userId,
                readAt: new Date().toISOString()
            },
            timestamp: new Date().toISOString()
        });
    }, [userId, sendMessage]);

    useEffect(() => {
        if (userId) {
            connect();
        }

        return () => {
            disconnect();
        };
    }, [userId, connect, disconnect]);

    return {
        isConnected,
        isConnecting,
        sendMessage,
        sendTyping,
        sendReadReceipt,
        connect,
        disconnect
    };
}; 