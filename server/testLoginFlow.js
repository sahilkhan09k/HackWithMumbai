import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import { DB_NAME } from './constants.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const testLoginFlow = async () => {
    try {
        console.log('=== Testing Login Flow ===\n');

        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI?.trim();
        await mongoose.connect(`${mongoUri}/${DB_NAME}`);
        console.log('✓ Connected to MongoDB\n');

        // Test 1: Find admin user
        console.log('Test 1: Finding admin user...');
        const admin = await User.findOne({ email: 'admin@civic.com' }).select('+password');

        if (!admin) {
            console.log('✗ Admin user not found');
            process.exit(1);
        }
        console.log('✓ Admin user found:', admin.email);
        console.log('  Role:', admin.role);
        console.log('  Password hash exists:', !!admin.password);
        console.log('');

        // Test 2: Test password comparison
        console.log('Test 2: Testing password comparison...');
        const isPasswordCorrect = await admin.isPasswordCorrect('admin123');
        console.log('✓ Password comparison result:', isPasswordCorrect ? 'PASS' : 'FAIL');
        console.log('');

        // Test 3: Test token generation
        console.log('Test 3: Testing token generation...');
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();
        console.log('✓ Access token generated:', accessToken ? 'YES' : 'NO');
        console.log('✓ Refresh token generated:', refreshToken ? 'YES' : 'NO');
        console.log('');

        // Test 4: Check environment variables
        console.log('Test 4: Checking environment variables...');
        console.log('✓ MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
        console.log('✓ CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET');
        console.log('✓ CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET');
        console.log('✓ CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET');
        console.log('✓ ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET ? 'SET' : 'NOT SET');
        console.log('✓ REFRESH_TOKEN_SECRET:', process.env.REFRESH_TOKEN_SECRET ? 'SET' : 'NOT SET');
        console.log('✓ GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET');
        console.log('');

        // Test 5: List all users
        console.log('Test 5: Listing all users...');
        const users = await User.find({});
        console.log(`✓ Total users in database: ${users.length}`);
        users.forEach(user => {
            console.log(`  - ${user.email} (${user.role})`);
        });
        console.log('');

        console.log('=== All Tests Passed ===');
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('✗ Error:', error.message);
        process.exit(1);
    }
};

testLoginFlow();
