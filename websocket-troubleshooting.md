# WebSocket Connection Troubleshooting

## 🔍 Current Issue
- URL: `ws://35.232.250.35/ws`
- Error: 400 Bad Request
- Status: Connection rejected by server

## 🛠️ Troubleshooting Steps

### 1. **Backend WebSocket Endpoint Check**

Verify your backend has the correct WebSocket endpoint:

```java
// Spring Boot WebSocket Configuration
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler(), "/ws")
               .setAllowedOrigins("*"); // For development
    }
}
```

### 2. **Check Server Status**

Test if the server is running:
```bash
# Test HTTP endpoint
curl -I http://35.232.250.35/health

# Test WebSocket upgrade
curl -i -N -H "Connection: Upgrade" \
     -H "Upgrade: websocket" \
     -H "Sec-WebSocket-Version: 13" \
     -H "Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==" \
     http://35.232.250.35/ws
```

### 3. **Common Issues & Solutions**

#### **Issue 1: CORS Configuration**
```java
// Add CORS for WebSocket
registry.addHandler(webSocketHandler(), "/ws")
       .setAllowedOrigins("http://localhost:3000", "https://yourdomain.com");
```

#### **Issue 2: Missing WebSocket Handler**
```java
@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // Handle new connection
    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Handle incoming messages
    }
}
```

#### **Issue 3: Port Configuration**
```yaml
# application.yml
server:
  port: 8080
  # Ensure WebSocket is enabled
```

### 4. **Alternative URLs to Test**

Try these variations:
```javascript
// Test different paths
const urls = [
  'ws://35.232.250.35:8080/ws',
  'ws://35.232.250.35/chat/ws',
  'ws://35.232.250.35/api/ws',
  'ws://35.232.250.35:8080/chat/ws'
];
```

### 5. **Frontend Configuration**

Update your environment variables:
```bash
# .env.local
NEXT_PUBLIC_WS_URL=ws://35.232.250.35:8080/ws
# or
NEXT_PUBLIC_WS_URL=ws://35.232.250.35/chat/ws
```

### 6. **Debug Backend Logs**

Check your backend logs for:
- WebSocket upgrade requests
- CORS errors
- Handler registration
- Connection attempts

### 7. **Test with Different Client**

```javascript
// Browser test
const ws = new WebSocket('ws://35.232.250.35/ws');
ws.onopen = () => console.log('Connected!');
ws.onerror = (e) => console.error('Error:', e);
```

## 🚀 Quick Fixes

### **Option 1: Check Port**
```bash
# Test if port 8080 is needed
ws://35.232.250.35:8080/ws
```

### **Option 2: Check Path**
```bash
# Test different paths
ws://35.232.250.35/chat/ws
ws://35.232.250.35/api/ws
```

### **Option 3: Check Backend Status**
```bash
# Test if server is responding
curl http://35.232.250.35/health
```

## 📞 Next Steps

1. **Check Backend Logs**: Look for WebSocket-related errors
2. **Verify Endpoint**: Confirm `/ws` is the correct path
3. **Test Port**: Try adding `:8080` to the URL
4. **Check CORS**: Ensure WebSocket CORS is configured
5. **Verify Handler**: Confirm WebSocket handler is registered

## 🔧 Backend Checklist

- [ ] WebSocket handler registered at `/ws`
- [ ] CORS configured for WebSocket
- [ ] Server running on correct port
- [ ] No firewall blocking WebSocket
- [ ] WebSocket upgrade headers handled
- [ ] Connection logging enabled 