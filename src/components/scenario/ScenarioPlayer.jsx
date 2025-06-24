import { useState } from "react";
import { getDebriefFromOpenAI } from "../../utils/openai"; // Adjust the import path as needed

const ScenarioPlayer = ({ scenario, onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [history, setHistory] = useState([]);
  const step = scenario.steps[stepIndex];

  const handleChoice = async (choice) => {
    // Save user choice for later GPT feedback
    const updatedHistory = [
      ...history,
      {
        prompt: step.prompt,
        choice: choice.text,
        correct: choice.correct,
      },
    ];
    setHistory(updatedHistory);

    if (choice.correct) setCorrectCount((prev) => prev + 1);

    const nextStep = stepIndex + 1;
    if (nextStep < scenario.steps.length) {
      setStepIndex(nextStep);
    } else {
      // ✅ Scenario complete — make OpenAI request with decision history
      const feedback = await getDebriefFromOpenAI(scenario.title, updatedHistory);
      const passed = updatedHistory.every((step) => step.correct);

      onComplete(feedback, passed ? "success" : "fail");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{step.prompt}</h2>
      <div className="grid gap-3">
        {step.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(choice)}
            className="w-full text-left p-3 border rounded hover:bg-blue-50"
          >
            <strong>{choice.label}.</strong> {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioPlayer;
