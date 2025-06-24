const { onRequest } = require("firebase-functions/v2/https");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateDebrief = onRequest({ timeoutSeconds: 30 }, async (req, res) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.set({
      "Access-Control-Allow-Origin": "*", // or "http://localhost:5173" for stricter control
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.status(204).send(""); // No Content
  }

  res.set("Access-Control-Allow-Origin", "*"); // CORS header for actual response

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
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.choices[0].message.content;
    return res.status(200).json({ feedback });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).send("Failed to generate feedback");
  }
});
