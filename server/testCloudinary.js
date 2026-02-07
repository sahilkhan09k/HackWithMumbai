import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('=== Testing Cloudinary Configuration ===\n');

// Check environment variables
console.log('Environment Variables:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'NOT SET');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY || 'NOT SET');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET (hidden)' : 'NOT SET');
console.log('');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary Configuration:');
console.log('Cloud Name:', cloudinary.config().cloud_name || 'NOT SET');
console.log('API Key:', cloudinary.config().api_key || 'NOT SET');
console.log('API Secret:', cloudinary.config().api_secret ? 'SET (hidden)' : 'NOT SET');
console.log('');

// Test API connection
console.log('Testing Cloudinary API connection...');
cloudinary.api.ping()
    .then(result => {
        console.log('✓ Cloudinary API connection successful!');
        console.log('Response:', result);
    })
    .catch(error => {
        console.error('✗ Cloudinary API connection failed!');
        console.error('Error:', error.message);
        if (error.error) {
            console.error('Details:', error.error);
        }
    });
