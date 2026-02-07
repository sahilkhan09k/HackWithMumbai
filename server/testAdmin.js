import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import { DB_NAME } from './constants.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const testAdmin = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI?.trim();
        await mongoose.connect(`${mongoUri}/${DB_NAME}`);
        console.log('Connected to MongoDB');

        // Find admin user
        const admin = await User.findOne({ email: 'admin@civic.com' }).select('+password');

        if (!admin) {
            console.log('Admin user not found. Creating admin user...');
            const newAdmin = await User.create({
                name: 'Admin',
                email: 'admin@civic.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Admin user created:', newAdmin.email);
        } else {
            console.log('Admin user found:', admin.email);
            console.log('Admin role:', admin.role);

            // Test password
            const bcrypt = await import('bcrypt');
            const isMatch = await bcrypt.compare('admin123', admin.password);
            console.log('Password test (admin123):', isMatch ? 'PASS' : 'FAIL');
        }

        // List all users
        const users = await User.find({});
        console.log('\nAll users in database:');
        users.forEach(user => {
            console.log(`- ${user.email} (${user.role})`);
        });

        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

testAdmin();
