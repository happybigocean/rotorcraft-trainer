// src/components/ScenarioPlayer.jsx
import { useState } from "react";

const ScenarioPlayer = ({ scenario, onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const step = scenario.steps[stepIndex];

  const handleChoice = (choice) => {
    if (choice.correct) setCorrectCount((prev) => prev + 1);

    const nextStep = stepIndex + 1;
    if (nextStep < scenario.steps.length) {
      setStepIndex(nextStep);
    } else {
      const passed = correctCount + (choice.correct ? 1 : 0) === scenario.steps.length;
      onComplete(passed ? scenario.debrief.success : scenario.debrief.fail);
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