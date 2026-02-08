// Test Priority Calculation for High-Priority Pothole Issues

const getPriorityLabel = (score) => {
    if (score >= 70) return "High";
    if (score >= 40) return "Medium";
    return "Low";
};

const calculateBaseScore = ({
    severity,
    frequency,
    locationImpact,
    timePending
}) => {
    return Math.round(
        severity * 0.50 +        // 50% - Primary factor
        locationImpact * 0.30 +  // 30% - High-impact locations
        frequency * 0.10 +       // 10% - Issue frequency
        timePending * 0.10       // 10% - Time pending
    );
};

// Simulate AI analysis for dangerous pothole near hospital
const mockAIAnalysis = {
    severity: 10,        // Maximum severity (dangerous, hospital, accidents)
    urgencyBoost: 15     // Maximum boost (hospital + dangerous + accidents)
};

// Simulate other scores
const severityScore = mockAIAnalysis.severity * 10;  // 100
const locationImpact = 90;  // Hospital location
const frequencyScore = 20;  // Default
const timeScore = 10;       // Default

console.log("\n🧪 Testing Priority Calculation");
console.log("================================");
console.log("\n📝 Test Case: 'Dangerous pothole on highway near hospital causing accidents'");
console.log("\n📊 Input Scores:");
console.log(`   - Severity Score: ${severityScore} (AI severity: ${mockAIAnalysis.severity})`);
console.log(`   - Location Impact: ${locationImpact} (hospital)`);
console.log(`   - Frequency Score: ${frequencyScore}`);
console.log(`   - Time Score: ${timeScore}`);
console.log(`   - AI Urgency Boost: ${mockAIAnalysis.urgencyBoost}`);

const baseScore = calculateBaseScore({
    severity: severityScore,
    frequency: frequencyScore,
    locationImpact,
    timePending: timeScore
});

const finalScore = Math.min(100, baseScore + mockAIAnalysis.urgencyBoost);
const priority = getPriorityLabel(finalScore);

console.log("\n🔢 Calculation:");
console.log(`   Base Score = (${severityScore} × 0.50) + (${locationImpact} × 0.30) + (${frequencyScore} × 0.10) + (${timeScore} × 0.10)`);
console.log(`   Base Score = ${severityScore * 0.50} + ${locationImpact * 0.30} + ${frequencyScore * 0.10} + ${timeScore * 0.10}`);
console.log(`   Base Score = ${baseScore}`);
console.log(`   Final Score = ${baseScore} + ${mockAIAnalysis.urgencyBoost} = ${finalScore}`);

console.log("\n✅ Result:");
console.log(`   Priority: ${priority}`);
console.log(`   Final Score: ${finalScore}/100`);

if (priority === "High") {
    console.log("\n🎉 SUCCESS! Dangerous pothole near hospital is correctly marked as HIGH priority");
} else {
    console.log("\n❌ FAILED! Expected HIGH priority but got:", priority);
}

// Test a few more cases
console.log("\n\n🧪 Additional Test Cases");
console.log("========================");

const testCases = [
    {
        title: "Minor pothole on residential street",
        severity: 4,
        urgencyBoost: 5,
        locationImpact: 40,
        expected: "Low"
    },
    {
        title: "Broken streetlight near school",
        severity: 7,
        urgencyBoost: 10,
        locationImpact: 90,
        expected: "High"
    },
    {
        title: "Garbage pile in market area",
        severity: 6,
        urgencyBoost: 5,
        locationImpact: 65,
        expected: "Medium"
    }
];

testCases.forEach((testCase, index) => {
    const severityScore = testCase.severity * 10;
    const baseScore = calculateBaseScore({
        severity: severityScore,
        frequency: 20,
        locationImpact: testCase.locationImpact,
        timePending: 10
    });
    const finalScore = Math.min(100, baseScore + testCase.urgencyBoost);
    const priority = getPriorityLabel(finalScore);

    console.log(`\n${index + 1}. ${testCase.title}`);
    console.log(`   Final Score: ${finalScore} → Priority: ${priority}`);
    console.log(`   ${priority === testCase.expected ? '✅ PASS' : '❌ FAIL (Expected: ' + testCase.expected + ')'}`);
});

console.log("\n");
