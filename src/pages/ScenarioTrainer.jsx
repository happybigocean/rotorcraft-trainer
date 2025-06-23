// src/pages/ScenarioTrainer.jsx
import { useState } from "react";
import ScenarioSelector from "../components/ScenarioSelector";
import ScenarioPlayer from "../components/ScenarioPlayer";
import DebriefCard from "../components/DebriefCard";

const mockScenarios = [
  {
    title: "Engine Failure at 400’ AGL",
    description: "Practice decision making at low altitude failure.",
    question: "Engine fails at 400 feet — what's your immediate action?",
    options: ["Enter autorotation", "Call ATC", "Try restart", "Climb higher"]
  },
  {
    title: "Low RPM Warning in Cruise",
    description: "Identify what actions to take with RPM drop.",
    question: "Low RPM warning during cruise. What do you do?",
    options: ["Lower collective", "Increase throttle", "Descend", "Pull carb heat"]
  }
];

const ScenarioTrainer = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState("");

  const handleSelectScenario = (index) => {
    setSelectedIndex(index);
    setHistory([]);
    setFeedback("");
  };

  const handleAnswer = (answer) => {
    setHistory((prev) => [...prev, answer]);

    // Simulate scenario end after 1 answer for now
    const simulatedFeedback = `Good choice selecting "${answer}". In this scenario, prompt autorotation is typically best.`;
    setFeedback(simulatedFeedback);
  };

  const handleRestart = () => {
    setSelectedIndex(null);
    setHistory([]);
    setFeedback("");
  };

  const selectedScenario = mockScenarios[selectedIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {selectedIndex === null && (
        <ScenarioSelector scenarios={mockScenarios} onSelect={handleSelectScenario} />
      )}
      {selectedScenario && !feedback && (
        <ScenarioPlayer scenario={selectedScenario} onAnswer={handleAnswer} />
      )}
      {feedback && (
        <DebriefCard
          decisionHistory={history}
          feedback={feedback}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default ScenarioTrainer;
