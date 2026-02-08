// Smart rule-based issue analysis (No API required!)
export const aiAnalyzeIssue = async (text) => {
    try {
        const lowerText = text.toLowerCase();

        // Initialize scores
        let severity = 5;
        let urgencyBoost = 0;
        let category = "Other";
        let explanation = "Standard priority";

        // Category Detection
        if (lowerText.includes('garbage') || lowerText.includes('trash') || lowerText.includes('waste') || lowerText.includes('dump')) {
            category = "Waste";
        } else if (lowerText.includes('road') || lowerText.includes('pothole') || lowerText.includes('street') || lowerText.includes('highway') || lowerText.includes('traffic')) {
            category = "Road";
        } else if (lowerText.includes('water') || lowerText.includes('pipe') || lowerText.includes('leak') || lowerText.includes('flood') || lowerText.includes('drain')) {
            category = "Water";
        } else if (lowerText.includes('light') || lowerText.includes('electricity') || lowerText.includes('power') || lowerText.includes('electric')) {
            category = "Electricity";
        }

        // Severity Keywords (High Priority)
        const highSeverityKeywords = ['broken', 'damaged', 'dangerous', 'hazard', 'emergency', 'urgent', 'critical', 'severe', 'major', 'accident', 'injury', 'flood', 'overflow', 'burst'];
        const mediumSeverityKeywords = ['leaking', 'cracked', 'blocked', 'stuck', 'malfunctioning', 'not working', 'problem', 'issue'];
        const lowSeverityKeywords = ['minor', 'small', 'slight', 'little'];

        // Count severity indicators
        let highCount = 0;
        let mediumCount = 0;
        let lowCount = 0;

        highSeverityKeywords.forEach(keyword => {
            if (lowerText.includes(keyword)) highCount++;
        });
        mediumSeverityKeywords.forEach(keyword => {
            if (lowerText.includes(keyword)) mediumCount++;
        });
        lowSeverityKeywords.forEach(keyword => {
            if (lowerText.includes(keyword)) lowCount++;
        });

        // Calculate base severity
        if (highCount > 0) {
            severity = 8 + Math.min(highCount, 2);
            explanation = "High severity issue requiring immediate attention";
        } else if (mediumCount > 0) {
            severity = 6 + Math.min(mediumCount, 2);
            explanation = "Moderate severity issue needing prompt action";
        } else if (lowCount > 0) {
            severity = 3 + lowCount;
            explanation = "Low severity issue for routine maintenance";
        } else {
            severity = 5;
            explanation = "Standard priority issue";
        }

        // Location Impact (Urgency Boost)
        const highImpactLocations = ['hospital', 'school', 'college', 'university', 'station', 'airport', 'main road', 'highway', 'market', 'mall', 'temple', 'church', 'mosque'];
        const mediumImpactLocations = ['residential', 'neighborhood', 'colony', 'society', 'park', 'garden'];

        highImpactLocations.forEach(location => {
            if (lowerText.includes(location)) {
                urgencyBoost += 10;
                explanation = `Critical location (${location}) - high priority`;
            }
        });

        mediumImpactLocations.forEach(location => {
            if (lowerText.includes(location)) {
                urgencyBoost += 5;
            }
        });

        // Time-sensitive keywords
        const urgentKeywords = ['now', 'immediately', 'asap', 'urgent', 'emergency', 'quickly', 'fast'];
        urgentKeywords.forEach(keyword => {
            if (lowerText.includes(keyword)) {
                urgencyBoost += 3;
            }
        });

        // Safety concerns
        const safetyKeywords = ['unsafe', 'danger', 'risk', 'accident', 'injury', 'hurt', 'harm', 'hazard'];
        safetyKeywords.forEach(keyword => {
            if (lowerText.includes(keyword)) {
                urgencyBoost += 5;
                severity = Math.min(10, severity + 1);
                explanation = "Safety concern - requires immediate attention";
            }
        });

        // Duration indicators (longer duration = higher priority)
        if (lowerText.includes('weeks') || lowerText.includes('months')) {
            urgencyBoost += 5;
            explanation = "Long-standing issue requiring resolution";
        } else if (lowerText.includes('days')) {
            urgencyBoost += 3;
        }

        // Impact scale
        const largeScaleKeywords = ['entire', 'whole', 'all', 'multiple', 'many', 'several'];
        largeScaleKeywords.forEach(keyword => {
            if (lowerText.includes(keyword)) {
                urgencyBoost += 3;
                severity = Math.min(10, severity + 1);
            }
        });

        // Cap values
        severity = Math.min(10, Math.max(1, severity));
        urgencyBoost = Math.min(15, Math.max(0, urgencyBoost));

        console.log(`✅ Smart Analysis: Severity=${severity}, Boost=${urgencyBoost}, Category=${category}`);

        return {
            severity,
            urgencyBoost,
            category,
            explanation
        };

    } catch (error) {
        console.error("Analysis failed:", error.message);
        return {
            severity: 6,
            urgencyBoost: 5,
            category: "Other",
            explanation: "Default priority scoring applied"
        };
    }
};
