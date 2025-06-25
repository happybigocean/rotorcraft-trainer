// src/components/QuestionCard.jsx
import { useState } from "react";

const QuestionCard = ({ question, onSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (answer.trim()) onSubmit(answer.trim());
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">{question.text}</h2>
      <textarea
        rows="4"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4"
        placeholder="Type your answer here..."
      ></textarea>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuestionCard;
