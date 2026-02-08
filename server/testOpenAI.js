import { aiAnalyzeIssue } from './utils/aiAnalyzeIssue.js';

const testIssues = [
    "Broken streetlight on Main Street near school",
    "Garbage pile on street corner for 2 weeks",
    "Pothole on highway causing accidents",
    "Water leakage flooding residential area",
    "Broken traffic light at busy intersection"
];

console.log('🤖 Testing OpenAI Integration\n');
console.log('='.repeat(60));

for (const issue of testIssues) {
    console.log(`\n📝 Issue: "${issue}"`);
    console.log('-'.repeat(60));

    try {
        const result = await aiAnalyzeIssue(issue);

        console.log('✅ Analysis Result:');
        console.log(`   Severity: ${result.severity}/10`);
        console.log(`   Urgency Boost: ${result.urgencyBoost}/15`);
        console.log(`   Category: ${result.category}`);
        console.log(`   Explanation: ${result.explanation}`);

        // Calculate final priority score (simplified)
        const baseScore = result.severity * 10;
        const finalScore = Math.min(100, baseScore + result.urgencyBoost);
        console.log(`   Final Priority Score: ${finalScore}/100`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Test completed!\n');

// Exit after tests
process.exit(0);
