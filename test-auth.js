// Simple test script to verify auth endpoints
const API_URL = 'http://localhost:5000/api/v1';

async function testRegister() {
    console.log('\n🧪 Testing Registration...');
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                password: 'password123'
            })
        });

        const data = await response.json();
        console.log('✅ Registration Response:', data);
        return data;
    } catch (error) {
        console.error('❌ Registration Error:', error.message);
    }
}

async function testLogin() {
    console.log('\n🧪 Testing Login...');
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });

        const data = await response.json();
        console.log('✅ Login Response:', data);
        return data;
    } catch (error) {
        console.error('❌ Login Error:', error.message);
    }
}

async function runTests() {
    console.log('🚀 Starting Auth API Tests...\n');
    console.log('Server URL:', API_URL);

    await testRegister();
    await testLogin();

    console.log('\n✨ Tests completed!');
}

runTests();
