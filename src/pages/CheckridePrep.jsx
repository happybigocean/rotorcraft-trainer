// src/pages/CheckridePrep.jsx
import { useState } from "react";
import TopicSelector from "../components/TopicSelector";
import QuestionCard from "../components/QuestionCard";
import FeedbackCard from "../components/FeedbackCard";

const mockQuestions = [
  { topic: "Airspace", text: "Explain Class D airspace requirements." },
  { topic: "Weather", text: "What are the minimum VFR requirements for Class G?" },
  { topic: "Systems", text: "Describe the fuel system on the R44." },
  { topic: "Airspace", text: "Can you enter Class B without a clearance?" },
];

const CheckridePrep = () => {
  const [topic, setTopic] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState("");

  const getRandomQuestion = (filtered) => {
    const pool = filtered.length ? filtered : mockQuestions;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    setFeedback("");
    const filtered = mockQuestions.filter((q) => !newTopic || q.topic === newTopic);
    setCurrentQuestion(getRandomQuestion(filtered));
  };

  const handleSubmitAnswer = (userAnswer) => {
    // 🔄 In real app, call GPT backend with question + answer
    const mockFeedback = `Good response. You covered the key points about "${currentQuestion.topic}". Remember to mention clearance limits.`;
    setFeedback(mockFeedback);
  };

  const handleNext = () => {
    handleTopicChange(topic); // Pull next question with same filter
    setFeedback("");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Check-ride Prep</h1>
      <TopicSelector
        topics={[...new Set(mockQuestions.map((q) => q.topic))]}
        selected={topic}
        onChange={handleTopicChange}
      />
      {currentQuestion && !feedback && (
        <QuestionCard question={currentQuestion} onSubmit={handleSubmitAnswer} />
      )}
      {feedback && <FeedbackCard feedback={feedback} onNext={handleNext} />}
    </div>
  );
};

export default CheckridePrep;
