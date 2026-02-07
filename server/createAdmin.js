import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/user.model.js';
import { DB_NAME } from './constants.js';

dotenv.config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('✅ Connected to MongoDB');

        const adminData = {
            name: 'Admin User',
            email: 'admin@civic.com',
            password: 'admin123',
            role: 'admin'
        };

        const existingAdmin = await User.findOne({ email: adminData.email });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('   Email:', existingAdmin.email);
            console.log('   Role:', existingAdmin.role);
            console.log('   ID:', existingAdmin._id);
        } else {
            const admin = await User.create(adminData);
            console.log('✅ Admin user created successfully!');
            console.log('   ID:', admin._id);
            console.log('   Email:', admin.email);
            console.log('   Role:', admin.role);
        }

        console.log('\n📝 Admin Login Credentials:');
        console.log('   Email: admin@civic.com');
        console.log('   Password: admin123');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createAdminUser();
