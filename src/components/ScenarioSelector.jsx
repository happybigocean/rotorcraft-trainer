// src/components/ScenarioSelector.jsx
const ScenarioSelector = ({ scenarios, onSelect }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Select a Scenario:</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((scenario, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className="p-4 bg-white border border-gray-300 rounded-lg shadow hover:bg-blue-50 transition"
          >
            <h3 className="font-bold text-lg">{scenario.title}</h3>
            <p className="text-sm text-gray-600">{scenario.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioSelector;
