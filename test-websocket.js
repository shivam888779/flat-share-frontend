// WebSocket Connection Test
const WebSocket = require('ws');

const wsUrl = 'ws://35.232.250.35/ws';

console.log('Testing WebSocket connection to:', wsUrl);

try {
    const ws = new WebSocket(wsUrl);

    ws.on('open', () => {
        console.log('✅ WebSocket connection established successfully!');

        // Send a test message
        const testMessage = {
            type: 'TEST',
            data: { message: 'Hello from test client' },
            timestamp: new Date().toISOString()
        };

        ws.send(JSON.stringify(testMessage));
        console.log('📤 Test message sent');
    });

    ws.on('message', (data) => {
        console.log('📥 Received message:', data.toString());
    });

    ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error.message);
    });

    ws.on('close', (code, reason) => {
        console.log('🔌 WebSocket closed:', code, reason.toString());
    });

    // Close connection after 5 seconds
    setTimeout(() => {
        ws.close();
        console.log('🔄 Test completed');
    }, 5000);

} catch (error) {
    console.error('❌ Failed to create WebSocket connection:', error.message);
} 