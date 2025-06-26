import React, { useEffect, useState } from "react";
import { addScenario, getScenario, updateScenario } from "../../firebase/firestoreService";

export default function ScenarioForm({ scenarioId, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const [debriefSuccess, setDebriefSuccess] = useState("");
  const [debriefFail, setDebriefFail] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepError, setStepError] = useState(""); // new state for step error

  useEffect(() => {
    if (scenarioId) {
      setLoading(true);
      getScenario(scenarioId).then((scenario) => {
        if (scenario) {
          setTitle(scenario.title);
          setDescription(scenario.description);
          setSteps(
            scenario.steps.map((step, i) => ({
              ...step,
              id: `step-${i}`,
            }))
          );
          setDebriefSuccess(scenario.debriefSuccess || (scenario.debrief && scenario.debrief.success) || "");
          setDebriefFail(scenario.debriefFail || (scenario.debrief && scenario.debrief.fail) || "");
        }
        setLoading(false);
      });
    } else {
      setTitle("");
      setDescription("");
      setSteps([]);
      setDebriefSuccess("");
      setDebriefFail("");
    }
  }, [scenarioId]);

  function handleStepChange(idx, field, value) {
    setSteps((steps) =>
      steps.map((step, i) => (i === idx ? { ...step, [field]: value } : step))
    );
  }

  function handleChoiceChange(stepIdx, choiceIdx, field, value) {
    setSteps((steps) =>
      steps.map((step, i) =>
        i === stepIdx
          ? {
              ...step,
              choices: step.choices.map((c, ci) =>
                ci === choiceIdx ? { ...c, [field]: value } : c
              ),
            }
          : step
      )
    );
  }

  function addStep() {
    setSteps([
      ...steps,
      {
        id: `step-${Date.now()}`,
        prompt: "",
        choices: [
          { label: "A", text: "", correct: false },
          { label: "B", text: "", correct: false },
          { label: "C", text: "", correct: false },
          { label: "D", text: "", correct: false },
        ],
      },
    ]);
  }

  function removeStep(idx) {
    setSteps((steps) => steps.filter((_, i) => i !== idx));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStepError(""); // reset error
    if (steps.length === 0) {
      setStepError("You must add at least one step.");
      return;
    }

    const scenario = {
      id: scenarioId || title.replace(/\s+/g, ""),
      title,
      description,
      steps: steps.map(({ id, ...rest }) => rest),
      debriefSuccess,
      debriefFail,
    };
    setLoading(true);
    const action = scenarioId ? updateScenario : addScenario;
    action(scenario)
      .then(onClose)
      .finally(() => setLoading(false));
  }

  return (
    <form className="bg-white shadow-md rounded p-6 mt-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">{scenarioId ? "Edit" : "Add"} Scenario</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Title</label>
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Steps</label>
        {steps.map((step, idx) => (
          <div key={step.id} className="border rounded mb-2 p-2">
            <div>
              <label className="block font-semibold">Prompt</label>
              <input
                className="w-full border p-1 rounded mb-2"
                value={step.prompt}
                onChange={(e) => handleStepChange(idx, "prompt", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold">Choices</label>
              {step.choices.map((choice, cidx) => (
                <div key={cidx} className="flex items-center mb-1 gap-2">
                  <span>{choice.label}</span>
                  <input
                    className="border p-1 rounded flex-grow"
                    value={choice.text}
                    onChange={(e) =>
                      handleChoiceChange(idx, cidx, "text", e.target.value)
                    }
                    required
                  />
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={choice.correct}
                      onChange={(e) =>
                        handleChoiceChange(idx, cidx, "correct", e.target.checked)
                      }
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 text-xs text-red-600 underline"
              onClick={() => removeStep(idx)}
              disabled={steps.length <= 1}
            >
              Remove Step
            </button>
          </div>
        ))}
        {stepError && (
          <div className="text-red-600 text-sm my-2">{stepError}</div>
        )}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={addStep}
        >
          + Add Step
        </button>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Debrief (Success)</label>
        <textarea
          className="w-full border p-2 rounded"
          value={debriefSuccess}
          onChange={(e) => setDebriefSuccess(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Debrief (Fail)</label>
        <textarea
          className="w-full border p-2 rounded"
          value={debriefFail}
          onChange={(e) => setDebriefFail(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {scenarioId ? "Save Changes" : "Add Scenario"}
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}