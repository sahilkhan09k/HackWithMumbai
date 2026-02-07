import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiAnalyzeIssue = async (text) => {
    try {
        // Get API key with fallback
        const apiKey = process.env.GEMINI_API_KEY;

        // AI is enabled but will use default if API key is invalid
        if (!apiKey) {
            console.log('AI analysis disabled - no API key provided');
            return {
                severity: 6,
                urgencyBoost: 5,
                category: "Other",
                explanation: "Default priority scoring applied (no API key)"
            };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-pro model (stable version)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
You are an assistant helping a civic issue prioritization system.

Return ONLY valid JSON with these fields:
- severity (integer from 1 to 10)
- urgencyBoost (integer from 0 to 15)
- category (Waste, Road, Water, Electricity, Other)
- explanation (short sentence)

Issue description:
"${text}"
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text().trim();

        // Remove markdown code blocks if present
        const jsonText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        const parsed = JSON.parse(jsonText);

        return {
            severity: Math.min(10, Math.max(1, parsed.severity || 5)),
            urgencyBoost: Math.min(15, Math.max(0, parsed.urgencyBoost || 0)),
            category: parsed.category || "Other",
            explanation: parsed.explanation || ""
        };

    } catch (error) {
        console.error("Gemini AI failed:", error.message);

        // Return default values instead of failing
        return {
            severity: 6,
            urgencyBoost: 5,
            category: "Other",
            explanation: "Default priority applied due to AI analysis failure"
        };
    }
};
