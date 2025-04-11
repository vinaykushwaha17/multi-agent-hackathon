require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async function handleQuery(query) {
  const trace = [];

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // ✅ Just pass plain text
    const result = await model.generateContent(query);

    const response = await result.response;
    const text = response.candidates[0].content.parts[0].text;

    trace.push({
      role: "Gemini",
      action: "Processed Query",
      result: text
    });

    return {
      summary: text,
      trace
    };

  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    return {
      summary: "Error occurred while processing your query.",
      error: err.message,
      trace
    };
  }
};
