# One-to-One Chat Guide

## 🎯 How to Use One-to-One Chat

The chat feature is designed specifically for one-to-one conversations between approved connections. Here's how to use it effectively:

## 📱 Getting Started

### 1. **Access Chat**
- Navigate to `/chat` in your application
- You must be logged in to access the chat feature
- Only approved connections can chat with each other

### 2. **Start a New Chat**
- Click the **"Start New Chat"** button in the sidebar
- Search for approved connections by name
- Select a connection to start chatting
- The chat room will be created automatically

### 3. **Existing Conversations**
- View all your existing chat rooms in the sidebar
- Click on any chat room to open the conversation
- Unread messages are highlighted with badges

## 🔄 One-to-One Chat Flow

### **Step 1: Connection Approval**
```
User A → Sends connection request to User B
User B → Approves the connection request
✅ Both users can now chat with each other
```

### **Step 2: Starting a Chat**
```
1. User A clicks "Start New Chat"
2. Searches for User B in approved connections
3. Selects User B to create chat room
4. Chat room is created automatically
5. Both users can now send messages
```

### **Step 3: Real-time Messaging**
```
User A sends message → WebSocket delivers instantly to User B
User B receives message → Can reply immediately
Typing indicators show when someone is typing
Read receipts confirm when messages are read
```

## 🎨 User Interface Features

### **Sidebar Features**
- ✅ **Chat Rooms List**: All your conversations
- ✅ **Start New Chat Button**: Create new conversations
- ✅ **Search Connections**: Find approved contacts
- ✅ **Unread Counts**: See how many unread messages
- ✅ **Online Status**: See who's online (future feature)
- ✅ **Last Message Preview**: Quick preview of recent messages

### **Chat Window Features**
- ✅ **Message Bubbles**: Clear sender/receiver distinction
- ✅ **Timestamps**: When messages were sent
- ✅ **Read Receipts**: ✓ for sent, ✓✓ for read
- ✅ **Typing Indicators**: Shows when someone is typing
- ✅ **Message Actions**: Reply, forward, delete options
- ✅ **File Attachments**: Support for images, files, location

### **Mobile Responsive**
- ✅ **Mobile Layout**: Stacked view on small screens
- ✅ **Touch Friendly**: Large touch targets
- ✅ **Swipe Navigation**: Easy navigation between sidebar and chat

## 🔒 Security & Privacy

### **Connection Validation**
- Only approved connections can chat
- Connection requests must be approved first
- Users cannot chat with strangers
- All messages are private between the two users

### **Message Security**
- Messages are sent via secure WebSocket
- JWT authentication required
- Messages are stored securely
- Users can only delete their own messages

## 📊 Message Types

### **Text Messages**
```
User: "Hello! How are you?"
→ Sent instantly via WebSocket
→ Stored in database
→ Shows read receipts
```

### **Image Messages** (Future)
```
User: [Sends image]
→ Image uploaded to server
→ URL stored in message
→ Displayed in chat
```

### **File Messages** (Future)
```
User: [Sends document]
→ File uploaded to server
→ Download link in message
→ File preview available
```

### **Location Messages** (Future)
```
User: [Shares location]
→ GPS coordinates stored
→ Map preview in chat
→ Click to open in maps
```

## 🚀 Advanced Features

### **Real-time Updates**
- ✅ **Instant Delivery**: Messages appear immediately
- ✅ **Typing Indicators**: See when someone is typing
- ✅ **Read Receipts**: Know when messages are read
- ✅ **Online Status**: See who's currently online
- ✅ **Message Status**: Sent, delivered, read

### **Message Management**
- ✅ **Delete Messages**: Remove your own messages
- ✅ **Chat History**: Scroll through all messages
- ✅ **Search Messages**: Find specific messages (future)
- ✅ **Message Reactions**: React to messages (future)

### **Chat Room Management**
- ✅ **Delete Chat Room**: Remove entire conversation
- ✅ **Archive Chat**: Hide from main list (future)
- ✅ **Pin Chat**: Keep important chats at top (future)
- ✅ **Mute Notifications**: Stop message alerts (future)

## 🛠️ Technical Implementation

### **WebSocket Connection**
```typescript
// Real-time message delivery
ws.send({
  type: 'MESSAGE',
  data: {
    content: 'Hello!',
    receiverId: 123,
    messageType: 'TEXT'
  }
});
```

### **API Endpoints**
```typescript
// Get chat rooms
GET /chat/rooms

// Send message
POST /chat/send

// Get chat history
GET /chat/history/{chatRoomId}

// Mark as read
POST /chat/read/{chatRoomId}
```

### **Database Schema**
```sql
-- Chat rooms (one-to-one)
CREATE TABLE chat_rooms (
  id SERIAL PRIMARY KEY,
  user1_id INTEGER NOT NULL,
  user2_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  chat_room_id INTEGER NOT NULL,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'TEXT',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Best Practices

### **For Users**
1. **Be Respectful**: Only chat with approved connections
2. **Use Clear Messages**: Write clear, understandable messages
3. **Check Read Receipts**: Know when your message is read
4. **Use Typing Indicators**: Let others know you're responding
5. **Delete Sensitive Messages**: Remove private information when needed

### **For Developers**
1. **Handle Disconnections**: Implement reconnection logic
2. **Validate Input**: Sanitize all message content
3. **Rate Limiting**: Prevent spam messages
4. **Error Handling**: Graceful error recovery
5. **Performance**: Optimize for large message histories

## 🐛 Troubleshooting

### **Common Issues**

1. **Can't Start Chat**
   - ✅ Check if connection is approved
   - ✅ Verify user is logged in
   - ✅ Refresh the page

2. **Messages Not Sending**
   - ✅ Check internet connection
   - ✅ Verify WebSocket connection
   - ✅ Check browser console for errors

3. **Real-time Updates Not Working**
   - ✅ Check WebSocket URL configuration
   - ✅ Verify backend WebSocket endpoint
   - ✅ Check firewall settings

4. **Chat Room Not Loading**
   - ✅ Check API endpoint configuration
   - ✅ Verify JWT token validity
   - ✅ Check network connectivity

### **Debug Steps**
```javascript
// Check WebSocket connection
console.log('WebSocket status:', isConnected);

// Check chat rooms
console.log('Chat rooms:', chatRooms);

// Check current messages
console.log('Messages:', messages);

// Check approved connections
console.log('Approved connections:', approvedConnections);
```

## 🚀 Future Enhancements

### **Planned Features**
- ✅ **Voice Messages**: Send audio recordings
- ✅ **Video Calls**: Face-to-face conversations
- ✅ **Message Reactions**: Like, love, laugh reactions
- ✅ **Message Search**: Find specific messages
- ✅ **File Sharing**: Share documents and media
- ✅ **Group Chats**: Multiple participants (if needed)

### **UI Improvements**
- ✅ **Message Reactions UI**: Click to react
- ✅ **Advanced File Preview**: Document previews
- ✅ **Custom Themes**: Personalize chat appearance
- ✅ **Accessibility**: Screen reader support
- ✅ **Keyboard Shortcuts**: Quick actions

## 📞 Support

If you encounter issues with one-to-one chat:

1. **Check Connection Status**: Ensure WebSocket is connected
2. **Verify Permissions**: Confirm connection is approved
3. **Clear Browser Cache**: Refresh and try again
4. **Check Console**: Look for error messages
5. **Contact Support**: Reach out to development team

---

**Note**: This one-to-one chat system is designed to provide a secure, real-time messaging experience between approved connections only. All messages are private and encrypted for your security. 