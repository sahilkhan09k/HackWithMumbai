import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('=== Testing Gemini AI ===\n');

const apiKey = process.env.GEMINI_API_KEY;
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');

if (!apiKey) {
    console.error('❌ No API key found');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Test with gemini-pro
console.log('\nTesting gemini-pro model...');
try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say hello in JSON format with a 'message' field");
    const response = await result.response;
    const text = response.text();
    console.log('✅ gemini-pro works!');
    console.log('Response:', text.substring(0, 100));
} catch (error) {
    console.error('❌ gemini-pro failed:', error.message);
}

// Test with gemini-1.5-flash
console.log('\nTesting gemini-1.5-flash model...');
try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello in JSON format with a 'message' field");
    const response = await result.response;
    const text = response.text();
    console.log('✅ gemini-1.5-flash works!');
    console.log('Response:', text.substring(0, 100));
} catch (error) {
    console.error('❌ gemini-1.5-flash failed:', error.message);
}

// Test with gemini-1.5-pro
console.log('\nTesting gemini-1.5-pro model...');
try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Say hello in JSON format with a 'message' field");
    const response = await result.response;
    const text = response.text();
    console.log('✅ gemini-1.5-pro works!');
    console.log('Response:', text.substring(0, 100));
} catch (error) {
    console.error('❌ gemini-1.5-pro failed:', error.message);
}

console.log('\n=== Test Complete ===');
