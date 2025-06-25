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
You are a helicopter checkride examiner providing oral exam feedback directly to the student.

The student was asked:

Question: "${question}"

Correct Answer: "${correct_answer}"

Student's Answer: "${user_answer}"

Now, write your feedback as if you are speaking directly to the student. Begin by clearly stating whether their answer is correct, partially correct, or incorrect (e.g., "You are correct," or "You're partially correct..."). Then, in a professional, supportive tone, explain:

- What they did well
- What was missing or incorrect
- How they can improve or remember the right answer in future

Be concise, constructive, and educational, as if coaching a student during a real checkride.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-4" gpt-3.5-turbo
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.choices[0].message.content;
    return res.status(200).json({ feedback });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).send("Failed to generate feedback");
  }
});