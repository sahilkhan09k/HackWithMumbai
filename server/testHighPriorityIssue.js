import { aiAnalyzeIssue } from "./utils/aiAnalyzeIssue.js";

// Test high-priority pothole scenarios
const testCases = [
    {
        title: "Dangerous pothole on highway near hospital causing accidents",
        description: "Large dangerous pothole on main highway near City Hospital. Multiple accidents reported. Urgent repair needed."
    },
    {
        title: "Critical road damage near school",
        description: "Broken road surface near ABC School creating hazard for children. Emergency attention required."
    },
    {
        title: "Severe pothole on highway",
        description: "Major pothole causing traffic issues on highway. Dangerous for vehicles."
    }
];

console.log("\n🧪 Testing High-Priority Issue Detection");
console.log("=========================================\n");

for (const testCase of testCases) {
    const fullText = `${testCase.title}. ${testCase.description}`;
    console.log(`📝 Test: "${testCase.title}"`);

    const aiResult = await aiAnalyzeIssue(fullText);
    const severityScore = aiResult.severity * 10;
    const aiBoost = aiResult.urgencyBoost;

    // Simulate location impact (hospital/school = 90)
    const locationImpact = fullText.toLowerCase().includes('hospital') ||
        fullText.toLowerCase().includes('school') ? 90 : 40;

    // Calculate base score with new formula
    const baseScore = Math.round(
        severityScore * 0.50 +
        locationImpact * 0.30 +
        20 * 0.10 +  // frequency
        10 * 0.10    // time
    );

    const finalScore = Math.min(100, baseScore + aiBoost);
    const priority = finalScore >= 70 ? "High" : finalScore >= 45 ? "Medium" : "Low";

    console.log(`   AI Severity: ${aiResult.severity}/10`);
    console.log(`   Urgency Boost: ${aiBoost}`);
    console.log(`   Location Impact: ${locationImpact}`);
    console.log(`   Base Score: ${baseScore}`);
    console.log(`   Final Score: ${finalScore}/100`);
    console.log(`   Priority: ${priority}`);
    console.log(`   ${priority === "High" ? "✅ HIGH PRIORITY" : "⚠️ " + priority}\n`);
}
