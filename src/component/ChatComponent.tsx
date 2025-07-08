import React, { useState } from 'react';
import { useChatWebSocket, ChatEvent } from '../hooks/useChatWebSocket';
import { ChatMessageType, ChatMessage, WebSocketMessage } from '../types/chat';
import { useTheme } from '../theme/ThemeProvider';

interface ChatComponentProps {
  userId: string;
  token?: string;
  roomId: number;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ userId, token, roomId }) => {
  const { connected, events, sendMessage } = useChatWebSocket({ userId, token });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const theme = useTheme();

  // Filter only chat messages
  const messages = events.filter(e => e.type === 'message') as { type: 'message'; data: ChatMessage }[];

  // Send chat message
  const handleSend = () => {
    if (input.trim()) {
      sendMessage('/app/chat.send', {
        receiverId: 18,
        message: input,
        messageType: ChatMessageType.TEXT,
      });
      setInput('');
    }
  };

  // Send typing indicator
  const handleTyping = () => {
    if (!typing) {
      setTyping(true);
      sendMessage('/app/chat.typing', {
        chatRoomId:123,
        senderId: userId,
        type: 'TYPING',
      });
      setTimeout(() => setTyping(false), 2000);
    }
  };

  return (
    <div
      className="rounded-lg shadow-md p-4 max-w-lg mx-auto"
      style={{ background: theme?.background, color: theme?.text }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-bold">Chat Room: {roomId}</span>
        <span className={connected ? 'text-green-500' : 'text-red-500'}>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div className="h-64 overflow-y-auto border rounded p-2 mb-2 bg-white text-black">
        {messages.length === 0 && <div className="text-gray-400">No messages yet.</div>}
        {messages.map((msg, idx) => (
          <div key={msg.data.id || idx} className="mb-1">
            <span className="font-semibold">{msg.data.sender.displayName || msg.data.sender.username}:</span>{' '}
            <span>{msg.data.content}</span>
            <span className="text-xs text-gray-400 ml-2">{new Date(msg.data.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type a message..."
          style={{ color: theme?.text }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
          onClick={handleSend}
          disabled={!connected || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent; 