// src/components/FeedbackCard.jsx
const FeedbackCard = ({ feedback, onNext }) => {
  return (
    <div className="bg-green-50 p-6 rounded shadow mb-4">
      <h3 className="text-lg font-semibold text-green-800 mb-2">AI Feedback:</h3>
      <p className="text-gray-800 mb-4">{feedback}</p>
      <button
        onClick={onNext}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Next Question
      </button>
    </div>
  );
};

export default FeedbackCard;
