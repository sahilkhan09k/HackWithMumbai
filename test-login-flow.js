// Test complete login flow
const API_URL = 'http://localhost:5000/api/v1';

async function testCompleteFlow() {
    console.log('🚀 Testing Complete Auth Flow...\n');

    const testEmail = `user${Date.now()}@test.com`;
    const testPassword = 'password123';

    // Step 1: Register
    console.log('📝 Step 1: Registering new user...');
    try {
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: testEmail,
                password: testPassword
            })
        });

        const registerData = await registerResponse.json();
        console.log('✅ Registration successful:', registerData.message);
        console.log('   User ID:', registerData.data._id);
        console.log('   Email:', registerData.data.email);
    } catch (error) {
        console.error('❌ Registration failed:', error.message);
        return;
    }

    // Step 2: Login
    console.log('\n🔐 Step 2: Logging in with same credentials...');
    try {
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: testEmail,
                password: testPassword
            })
        });

        if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            console.error('❌ Login failed:', errorData.message);
            return;
        }

        const loginData = await loginResponse.json();
        console.log('✅ Login successful:', loginData.message);
        console.log('   User:', loginData.data.name);
        console.log('   Role:', loginData.data.role);

        // Check cookies
        const cookies = loginResponse.headers.get('set-cookie');
        console.log('   Cookies set:', cookies ? 'Yes' : 'No');

    } catch (error) {
        console.error('❌ Login error:', error.message);
    }

    console.log('\n✨ Test completed!');
}

testCompleteFlow();
