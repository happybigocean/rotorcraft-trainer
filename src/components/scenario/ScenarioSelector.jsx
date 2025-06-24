// src/components/ScenarioSelector.jsx
const ScenarioSelector = ({ scenarios, onSelect }) => {
  return (
    <div className="space-y-4">
      {scenarios.map((scenario) => (
        <div key={scenario.id} className="p-4 border rounded hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(scenario)}>
          <h2 className="text-lg font-bold">{scenario.title}</h2>
          <p className="text-sm text-gray-600">{scenario.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ScenarioSelector;