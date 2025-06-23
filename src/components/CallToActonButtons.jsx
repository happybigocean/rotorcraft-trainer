// src/components/CallToActionButtons.jsx
import { useNavigate } from "react-router-dom";

const CallToActionButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <button
        onClick={() => navigate("/scenario")}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-xl transition"
      >
        Start Scenario Training
      </button>
      <button
        onClick={() => navigate("/checkride")}
        className="bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-xl transition"
      >
        Checkride Prep
      </button>
      <button
        onClick={() => navigate("/assistant")}
        className="bg-gray-100 hover:bg-gray-300 text-black font-semibold py-3 px-6 rounded-xl transition"
      >
        Ask Knowledge Assistant
      </button>
    </div>
  );
};

export default CallToActionButtons;
