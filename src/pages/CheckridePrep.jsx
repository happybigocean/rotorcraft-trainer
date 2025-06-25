import { useState, useEffect } from "react";
import QuestionCard from "../components/checkride/QuestionCard";
import FeedbackCard from "../components/checkride/FeedbackCard";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getCheckrideFeedbackFromAI } from "../utils/openai";

// Utility to get a random question index, avoiding immediate repeats
const getRandomIndex = (excludeIdx, length) => {
  if (length <= 1) return 0;
  let idx;
  do {
    idx = Math.floor(Math.random() * length);
  } while (idx === excludeIdx);
  return idx;
};

const CheckridePrep = () => {
  const [currentIdx, setCurrentIdx] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [lastAnswer, setLastAnswer] = useState("");
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // new state

  // Fetch questions from Firestore on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "checkrideQuestions"));
      const loaded = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestionsData(loaded);
      setLoading(false);
      // Pick the first random question after load
      setCurrentIdx(loaded.length > 0 ? getRandomIndex(-1, loaded.length) : null);
    };

    fetchQuestions();
  }, []);

  const currentQuestion = currentIdx !== null ? questionsData[currentIdx] : null;

  const handleSubmitAnswer = async (userAnswer) => {
    setSubmitting(true); // start loading
    setLastAnswer(userAnswer);
    try {
      const feedback = await getCheckrideFeedbackFromAI(
        currentQuestion.text,
        currentQuestion.answer,
        userAnswer
      );
      setFeedback(feedback);
    } catch (err) {
      setFeedback("Sorry, there was a problem getting feedback. Please try again.");
    } finally {
      setSubmitting(false); // end loading
    }
  };

  const handleNext = () => {
    setFeedback("");
    setLastAnswer("");
    if (questionsData.length > 1) {
      setCurrentIdx(getRandomIndex(currentIdx, questionsData.length));
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Check-ride Prep</h1>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Check-ride Prep</h1>
        <p>No questions available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Check-ride Prep</h1>
      {currentQuestion && !feedback && (
        <QuestionCard
          question={currentQuestion}
          onSubmit={handleSubmitAnswer}
        />
      )}
      {submitting && !feedback && (
        <div className="mt-6 flex items-center space-x-2 text-blue-500">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span>Submitting your answer and waiting for feedback...</span>
        </div>
      )}
      {feedback && (
        <FeedbackCard feedback={feedback} onNext={handleNext} />
      )}
    </div>
  );
};

export default CheckridePrep;