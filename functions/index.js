const functions = require("firebase-functions");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: functions.config().openai.key,
});

exports.generateDebrief = functions.https.onRequest(async (req, res) => {
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
      model: "gpt-3.5-turbo", // or "gpt-4o" or "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.choices[0].message.content;
    return res.json({ feedback });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).send("Failed to generate feedback");
  }
});
