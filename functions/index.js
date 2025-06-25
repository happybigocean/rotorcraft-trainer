const { onRequest } = require("firebase-functions/v2/https");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateDebrief = onRequest({ timeoutSeconds: 30 }, async (req, res) => {
  // Set CORS headers for all responses
  res.set('Access-Control-Allow-Origin', '*'); // Or restrict to 'http://localhost:5173'
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  const { scenario, history } = req.body;

  if (!scenario || !history) {
    return res.status(400).send("Missing scenario or history");
  }

  const formatted = history
    .map(
      (h, i) =>
        `${i + 1}. ${h.prompt}\nAnswer: ${h.choice} (${h.correct ? "✅" : "❌"})`
    )
    .join("\n\n");

  const prompt = `
You are a helicopter instructor. A student just completed the scenario "${scenario}". Here are their choices:

${formatted}

Please give a constructive, friendly debrief. Focus on what they did well, what could be improved, and include safety tips.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // gpt-4
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.choices[0].message.content;
    return res.status(200).json({ feedback });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).send("Failed to generate feedback");
  }
});

exports.generateCheckrideFeedback = onRequest({ timeoutSeconds: 30 }, async (req, res) => {
  // Set CORS headers for all responses
  res.set('Access-Control-Allow-Origin', '*'); 
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  const { question, correct_answer, user_answer } = req.body;

  if (!question || !correct_answer || !user_answer) {
    return res.status(400).send("Missing question, correct_answer, or user_answer");
  }

  const prompt = `
You are a helicopter checkride examiner. A student was asked this oral question:

Question: "${question}"

Correct Answer: "${correct_answer}"

Student's Answer: "${user_answer}"

Please provide clear, constructive feedback. First, state if their answer is correct, partially correct, or incorrect. Then, explain what the student did well, what was missing, and how to improve. Be concise, supportive, and educational.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.choices[0].message.content;
    return res.status(200).json({ feedback });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).send("Failed to generate feedback");
  }
});