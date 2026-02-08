import { aiAnalyzeIssue } from './utils/aiAnalyzeIssue.js';

const testIssues = [
    "Broken streetlight on Main Street near school",
    "Garbage pile on street corner for 2 weeks",
    "Pothole on highway causing accidents",
    "Water leakage flooding residential area",
    "Broken traffic light at busy intersection"
];

console.log('🤖 Testing Hugging Face (Mistral-7B) Integration\n');
console.log('='.repeat(60));
console.log('Note: First request may take 20-30 seconds (cold start)');
console.log('Subsequent requests will be fast (2-3 seconds)');
console.log('='.repeat(60));

for (const issue of testIssues) {
    console.log(`\n📝 Issue: "${issue}"`);
    console.log('-'.repeat(60));

    try {
        const startTime = Date.now();
        const result = await aiAnalyzeIssue(issue);
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        console.log('✅ Analysis Result:');
        console.log(`   Severity: ${result.severity}/10`);
        console.log(`   Urgency Boost: ${result.urgencyBoost}/15`);
        console.log(`   Category: ${result.category}`);
        console.log(`   Explanation: ${result.explanation}`);
        console.log(`   Response Time: ${duration}s`);

        // Calculate final priority score (simplified)
        const baseScore = result.severity * 10;
        const finalScore = Math.min(100, baseScore + result.urgencyBoost);
        console.log(`   Final Priority Score: ${finalScore}/100`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Test completed!');
console.log('\nNote: If you see "Default priority applied", make sure:');
console.log('1. HUGGINGFACE_API_KEY is set in .env');
console.log('2. API key starts with "hf_"');
console.log('3. You have internet connection');
console.log('='.repeat(60));
console.log('\n');

// Exit after tests
process.exit(0);
