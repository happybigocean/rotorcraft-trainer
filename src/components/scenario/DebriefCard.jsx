// src/components/DebriefCard.jsx
const DebriefCard = ({ feedback, onReset }) => {
  return (
    <div className="p-6 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📝 Debrief</h2>
      <p className="mb-4 text-gray-800">{feedback}</p>
      <button onClick={onReset} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Try Another Scenario
      </button>
    </div>
  );
};

export default DebriefCard;
