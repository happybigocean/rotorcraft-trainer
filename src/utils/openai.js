export const getDebriefFromOpenAI = async (scenarioTitle, decisionHistory) => {
  try {
    const res = await fetch("https://generatedebrief-c6t4jxyuqa-uc.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scenario: scenarioTitle,
        history: decisionHistory,
      }),
    });

    const data = await res.json();
    return data.feedback;
  } catch (err) {
    console.error("Error getting GPT debrief:", err);
    return "Unable to generate debrief. Please try again later.";
  }
};
