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

export const getCheckrideFeedbackFromAI = async (questionText, correctAnswer, userAnswer) => {
  try {
    const res = await fetch("https://us-central1-rotor-ai.cloudfunctions.net/generateCheckrideFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: questionText,
        correct_answer: correctAnswer,
        user_answer: userAnswer,
      }),
    });

    const data = await res.json();
    // Expecting the backend to return { feedback: "..." }
    return data.feedback;
  } catch (err) {
    console.error("Error getting checkride AI feedback:", err);
    return "Unable to generate feedback. Please try again later.";
  }
};
