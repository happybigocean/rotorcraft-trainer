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

  // Fetch questions from Firestore on mount
  useEffect(() => {
    const fetchQuestions = async () => {
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
    const feedback = await getCheckrideFeedbackFromAI(
      currentQuestion.text,
      currentQuestion.answer,
      userAnswer
    );
    setFeedback(feedback);
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
        <QuestionCard question={currentQuestion} onSubmit={handleSubmitAnswer} />
      )}
      {feedback && (
        <FeedbackCard feedback={feedback} onNext={handleNext} />
      )}
    </div>
  );
};

export default CheckridePrep;