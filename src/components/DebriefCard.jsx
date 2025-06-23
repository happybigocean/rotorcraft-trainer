// src/components/DebriefCard.jsx
const DebriefCard = ({ decisionHistory, feedback, onRestart }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">🧠 Debrief</h2>
      <p className="mb-4 text-gray-700">{feedback}</p>

      <div className="text-sm text-gray-600 mb-4">
        <h3 className="font-semibold mb-2">Your Decisions:</h3>
        <ul className="list-disc pl-5">
          {decisionHistory.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Another Scenario
      </button>
    </div>
  );
};

export default DebriefCard;
