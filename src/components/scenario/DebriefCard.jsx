// src/components/DebriefCard.jsx
const DebriefCard = ({ feedback, status, onReset }) => {
  const isSuccess = status === "success";

  return (
    <div className={`p-6 border rounded shadow ${isSuccess ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-2xl ${isSuccess ? "text-green-600" : "text-red-600"}`}>
          {isSuccess ? "✅" : "⚠️"}
        </span>
        <h2 className={`text-2xl font-bold ${isSuccess ? "text-green-800" : "text-red-800"}`}>
          {isSuccess ? "Well Done!" : "Review Needed"}
        </h2>
      </div>
      <p className={`mb-6 ${isSuccess ? "text-green-900" : "text-red-900"}`}>
        {feedback}
      </p>
      <button
        onClick={onReset}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Try Another Scenario
      </button>
    </div>
  );
};

export default DebriefCard;
