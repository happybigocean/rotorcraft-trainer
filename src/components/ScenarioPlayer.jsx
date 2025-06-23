// src/components/ScenarioPlayer.jsx
const ScenarioPlayer = ({ scenario, onAnswer }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{scenario.title}</h2>
      <p className="mb-6">{scenario.question}</p>
      <div className="space-y-3">
        {scenario.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(opt)}
            className="block w-full bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded text-left"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioPlayer;
