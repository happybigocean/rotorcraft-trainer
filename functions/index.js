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
      model: "gpt-4", // Use GPT-4 here
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.choices[0].message.content;
    return res.status(200).json({ feedback });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).send("Failed to generate feedback");
  }
});