// const axios = require('axios');

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// exports.generateQuestions = async (technology, level, mcqCount, textCount) => {
//   const prompt = `
//   Generate ${mcqCount} multiple choice questions and ${textCount} text questions for an interview quiz on ${technology}.
//   Level: ${level}.
//   Output in JSON array format with structure:
//   [
//     {
//       id: 'unique-id',
//       type: 'mcq' or 'text',
//       question: '',
//       options: ["A", "B", "C", "D"] (if mcq),
//       correctAnswer: 'Correct option' (if mcq),
//       explanation: ''
//     },
//     ...
//   ]
//   `;

//   try {
//     const response = await axios.post(
//       'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY,
//       {
//         contents: [{ parts: [{ text: prompt }] }]
//       }
//     );

//     const rawText = response.data.candidates[0].content.parts[0].text;
//     const cleanedText = rawText.trim().replace(/```json|```/g, '');
//     const parsed = JSON.parse(cleanedText);

//     return parsed;
//   } catch (error) {
//     console.error('Gemini API Error:', error);
//     throw new Error('Failed to generate questions');
//   }
// };






const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.generateQuestions = async (technology, level, mcqCount, textCount) => {
  const prompt = `
Generate ${mcqCount} multiple choice questions and ${textCount} text-based questions for an interview quiz on "${technology}".
Level: ${level}.
Output in valid JSON array format with this structure:

[
  {
    id: 'unique-id',
    type: 'mcq' or 'text',
    question: '',
    options: ["A", "B", "C", "D"] (only for mcq),
    correctAnswer: 'Correct option' (only for mcq),
    explanation: ''
  },
  ...
]

Return ONLY the JSON.
`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: GEMINI_API_KEY,
        },
      }
    );

    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanedText = rawText.trim().replace(/```json|```/g, "");
    const parsed = JSON.parse(cleanedText);

    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error("Failed to generate questions using Gemini");
  }
};
