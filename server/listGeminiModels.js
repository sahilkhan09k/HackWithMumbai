import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('=== Listing Available Gemini Models ===\n');

const apiKey = process.env.GEMINI_API_KEY;
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');

if (!apiKey) {
    console.error('❌ No API key found');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

try {
    // Try to list models
    const models = await genAI.listModels();
    console.log('\n✅ Available models:');
    models.forEach(model => {
        console.log(`- ${model.name}`);
        console.log(`  Display Name: ${model.displayName}`);
        console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
        console.log('');
    });
} catch (error) {
    console.error('❌ Failed to list models:', error.message);
    console.log('\nYour API key might be invalid or expired.');
    console.log('Get a new one from: https://aistudio.google.com/app/apikey');
}
