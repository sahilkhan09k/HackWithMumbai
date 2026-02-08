import { aiAnalyzeIssue } from "./utils/aiAnalyzeIssue.js";

const testCases = [
    {
        title: "Dangerous pothole on highway near hospital",
        description: "Large dangerous pothole on main highway near city hospital causing multiple accidents. Urgent repair needed."
    },
    {
        title: "Deep pothole causing accidents",
        description: "Deep pothole on highway near school. Multiple vehicles damaged. Very dangerous for two-wheelers."
    },
    {
        title: "Critical road damage",
        description: "Broken road surface near hospital emergency entrance. Causing accidents and delays for ambulances."
    },
    {
        title: "Severe pothole hazard",
        description: "Severe pothole on main road near market. Has been there for weeks. Multiple injury reports."
    }
];

console.log("=== TESTING HIGH PRIORITY POTHOLE DETECTION ===\n");

for (const testCase of testCases) {
    const fullText = `${testCase.title}. ${testCase.description}`;
    console.log(`📝 Test: "${testCase.title}"`);
    console.log(`Description: "${testCase.description}"`);

    const result = await aiAnalyzeIssue(fullText);

    // Simulate the actual calculation from createIssue
    const severityScore = result.severity * 10;
    const locationImpact = 90; // hospital/school
    const frequencyScore = 20; // default
    const timeScore = 10; // default

    const baseScore = Math.round(
        severityScore * 0.50 +
        locationImpact * 0.30 +
        frequencyScore * 0.10 +
        timeScore * 0.10
    );

    const finalScore = Math.min(100, baseScore + result.urgencyBoost);

    let priority = "Low";
    if (finalScore >= 70) priority = "High";
    else if (finalScore >= 45) priority = "Medium";

    console.log(`   Severity: ${result.severity}/10 (score: ${severityScore})`);
    console.log(`   Urgency Boost: ${result.urgencyBoost}`);
    console.log(`   Category: ${result.category}`);
    console.log(`   Base Score: ${baseScore}`);
    console.log(`   Final Score: ${finalScore}`);
    console.log(`   Priority: ${priority}`);
    console.log(`   Explanation: ${result.explanation}`);
    console.log("");
}

console.log("=== PRIORITY THRESHOLDS ===");
console.log("High: >= 70");
console.log("Medium: >= 45");
console.log("Low: < 45");
