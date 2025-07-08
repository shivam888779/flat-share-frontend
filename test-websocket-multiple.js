// Test multiple WebSocket URLs
const WebSocket = require('ws');

const urls = [
    'ws://35.232.250.35:8080/ws',
    'ws://35.232.250.35/chat/ws',
    'ws://35.232.250.35/api/ws',
    'ws://35.232.250.35:8080/chat/ws',
    'ws://35.232.250.35:8080/api/ws'
];

async function testUrl(url) {
    return new Promise((resolve) => {
        console.log(`\n🔍 Testing: ${url}`);

        try {
            const ws = new WebSocket(url);

            ws.on('open', () => {
                console.log(`✅ SUCCESS: ${url}`);
                ws.close();
                resolve({ url, status: 'success' });
            });

            ws.on('error', (error) => {
                console.log(`❌ FAILED: ${url} - ${error.message}`);
                resolve({ url, status: 'failed', error: error.message });
            });

            ws.on('close', (code, reason) => {
                if (code !== 1000) {
                    console.log(`🔌 CLOSED: ${url} - Code: ${code}, Reason: ${reason}`);
                }
            });

            // Timeout after 5 seconds
            setTimeout(() => {
                if (ws.readyState === WebSocket.CONNECTING) {
                    console.log(`⏰ TIMEOUT: ${url}`);
                    ws.terminate();
                    resolve({ url, status: 'timeout' });
                }
            }, 5000);

        } catch (error) {
            console.log(`💥 ERROR: ${url} - ${error.message}`);
            resolve({ url, status: 'error', error: error.message });
        }
    });
}

async function testAllUrls() {
    console.log('🚀 Testing WebSocket URLs...\n');

    const results = [];

    for (const url of urls) {
        const result = await testUrl(url);
        results.push(result);
    }

    console.log('\n📊 Results Summary:');
    console.log('==================');

    const successful = results.filter(r => r.status === 'success');
    const failed = results.filter(r => r.status !== 'success');

    if (successful.length > 0) {
        console.log('✅ Working URLs:');
        successful.forEach(r => console.log(`   - ${r.url}`));
    }

    if (failed.length > 0) {
        console.log('\n❌ Failed URLs:');
        failed.forEach(r => console.log(`   - ${r.url} (${r.status})`));
    }

    if (successful.length === 0) {
        console.log('\n💡 Suggestions:');
        console.log('   1. Check if backend WebSocket is running');
        console.log('   2. Verify the correct endpoint path');
        console.log('   3. Check if port 8080 is needed');
        console.log('   4. Ensure CORS is configured');
        console.log('   5. Check backend logs for errors');
    }
}

testAllUrls(); 