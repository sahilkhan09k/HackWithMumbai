import Groq from "groq-sdk";

let groqClient = null;

const getGroqClient = () => {
    if (!groqClient && process.env.GROQ_API_KEY) {
        groqClient = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });
    }
    return groqClient;
};

export const aiAnalyzeIssue = async (text) => {
    try {
        const groq = getGroqClient();

        if (!groq) {
            console.warn("GROQ_API_KEY not found, using fallback analysis");
            return fallbackAnalysis(text);
        }

        const prompt = `Analyze this civic issue report and provide a JSON response with the following fields:
- severity: number from 1-10 (1=minor, 10=critical)
- urgencyBoost: number from 0-15 (additional priority points)
- category: one of ["Road", "Water", "Electricity", "Waste", "Other"]
- explanation: brief reason for the severity rating

Issue: "${text}"

Respond ONLY with valid JSON, no other text.`;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an AI assistant that analyzes civic infrastructure issues. Always respond with valid JSON only."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 200,
        });

        const responseText = completion.choices[0]?.message?.content || "{}";
        const result = JSON.parse(responseText);

        const severity = Math.min(10, Math.max(1, result.severity || 5));
        const urgencyBoost = Math.min(15, Math.max(0, result.urgencyBoost || 0));

        console.log(`✅ Groq Analysis: Severity=${severity}, Boost=${urgencyBoost}, Category=${result.category}`);

        return {
            severity,
            urgencyBoost,
            category: result.category || "Other",
            explanation: result.explanation || "AI-based priority scoring"
        };

    } catch (error) {
        console.error("Groq API failed, using fallback:", error.message);
        return fallbackAnalysis(text);
    }
};

const fallbackAnalysis = (text) => {
    const lowerText = text.toLowerCase();

    let severity = 5;
    let urgencyBoost = 0;
    let category = "Other";
    let explanation = "Standard priority";

    if (lowerText.includes('garbage') || lowerText.includes('trash') || lowerText.includes('waste')) {
        category = "Waste";
    } else if (lowerText.includes('road') || lowerText.includes('pothole') || lowerText.includes('street')) {
        category = "Road";
    } else if (lowerText.includes('water') || lowerText.includes('pipe') || lowerText.includes('leak')) {
        category = "Water";
    } else if (lowerText.includes('light') || lowerText.includes('electricity') || lowerText.includes('power')) {
        category = "Electricity";
    }

    const highSeverityKeywords = ['broken', 'damaged', 'dangerous', 'hazard', 'emergency', 'urgent', 'critical', 'severe'];
    const mediumSeverityKeywords = ['leaking', 'cracked', 'blocked', 'stuck', 'malfunctioning'];

    let highCount = 0;
    let mediumCount = 0;

    highSeverityKeywords.forEach(keyword => {
        if (lowerText.includes(keyword)) highCount++;
    });
    mediumSeverityKeywords.forEach(keyword => {
        if (lowerText.includes(keyword)) mediumCount++;
    });

    if (highCount > 0) {
        severity = 8 + Math.min(highCount, 2);
        explanation = "High severity issue";
    } else if (mediumCount > 0) {
        severity = 6 + Math.min(mediumCount, 2);
        explanation = "Moderate severity issue";
    }

    const highImpactLocations = ['hospital', 'school', 'station', 'main road', 'highway', 'market'];
    highImpactLocations.forEach(location => {
        if (lowerText.includes(location)) {
            urgencyBoost += 10;
        }
    });

    const safetyKeywords = ['unsafe', 'danger', 'risk', 'accident', 'injury'];
    safetyKeywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
            urgencyBoost += 5;
            severity = Math.min(10, severity + 1);
        }
    });

    severity = Math.min(10, Math.max(1, severity));
    urgencyBoost = Math.min(15, Math.max(0, urgencyBoost));

    console.log(`✅ Fallback Analysis: Severity=${severity}, Boost=${urgencyBoost}, Category=${category}`);

    return {
        severity,
        urgencyBoost,
        category,
        explanation
    };
};
