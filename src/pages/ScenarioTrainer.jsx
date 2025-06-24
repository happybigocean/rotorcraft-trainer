// src/pages/ScenarioTrainer.jsx
import { useState } from "react";
import ScenarioSelector from "../components/scenario/ScenarioSelector";
import ScenarioPlayer from "../components/scenario/ScenarioPlayer";
import DebriefCard from "../components/scenario/DebriefCard";
import scenarios from "../data/scenarios";

const ScenarioTrainer = () => {
  const [selected, setSelected] = useState(null);
  const [debrief, setDebrief] = useState("");

  const handleComplete = (result) => setDebrief(result);
  const handleReset = () => {
    setSelected(null);
    setDebrief("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🚁 Scenario Trainer</h1>

      {!selected && <ScenarioSelector scenarios={scenarios} onSelect={setSelected} />}
      {selected && !debrief && <ScenarioPlayer scenario={selected} onComplete={handleComplete} />}
      {selected && debrief && <DebriefCard feedback={debrief} onReset={handleReset} />}
    </div>
  );
};

export default ScenarioTrainer;
