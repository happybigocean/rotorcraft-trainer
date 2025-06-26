import React, { useEffect, useState } from "react";
import { getScenario } from "../../firebase/firestoreService";

export default function ScenarioPreviewModal({ scenarioId, onClose }) {
  const [scenario, setScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getScenario(scenarioId).then(setScenario);
    setCurrentStep(0);
    setSelectedChoices([]);
    setFinished(false);
    setScore(0);
  }, [scenarioId]);

  if (!scenario) return <div>Loading...</div>;

  const step = scenario.steps[currentStep];

  function handleChoice(idx) {
    setSelectedChoices([...selectedChoices, idx]);
    if (currentStep + 1 < scenario.steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      scenario.steps.forEach((s, i) => {
        if (s.choices[selectedChoices[i]] && s.choices[selectedChoices[i]].correct) correctCount++;
      });
      // Check last step
      if (scenario.steps[currentStep].choices[idx] && scenario.steps[currentStep].choices[idx].correct) correctCount++;
      setScore(correctCount);
      setFinished(true);
    }
  }

  function handleRestart() {
    setCurrentStep(0);
    setSelectedChoices([]);
    setFinished(false);
    setScore(0);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-xl w-full relative">
        <button
          className="absolute top-2 right-3 text-gray-700 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2">{scenario.title}</h2>
        <p className="mb-4">{scenario.description}</p>
        {!finished ? (
          <div>
            <div className="mb-2 font-medium">
              Step {currentStep + 1} of {scenario.steps.length}
            </div>
            <div className="mb-3">{step.prompt}</div>
            <div className="flex flex-col gap-2">
              {step.choices.map((choice, idx) => (
                <button
                  key={choice.label}
                  className="border px-3 py-2 rounded hover:bg-blue-100 text-left"
                  onClick={() => handleChoice(idx)}
                >
                  <span className="font-bold">{choice.label}.</span> {choice.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-2 font-semibold">
              Score: {score} / {scenario.steps.length}
            </div>
            <div className="mb-4">
              {score === scenario.steps.length ? (
                <div className="text-green-700">{scenario.debriefSuccess || (scenario.debrief && scenario.debrief.success)}</div>
              ) : (
                <div className="text-red-700">{scenario.debriefFail || (scenario.debrief && scenario.debrief.fail)}</div>
              )}
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
              onClick={handleRestart}
            >
              Retry
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}