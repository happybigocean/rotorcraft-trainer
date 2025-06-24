import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-sky-800 to-blue-900 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-center py-20 px-4 text-white">
        <h1 className="text-5xl font-bold mb-4">🚁 Rotorcraft Trainer</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Train smarter. Fly safer. AI-powered scenario training, check-ride prep, and a rotorcraft knowledge assistant — all in one.
        </p>
      </div>

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

      {/* Login and Signup Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="text-white border border-white px-5 py-2 rounded-xl hover:bg-white hover:text-blue-800 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="text-white border border-white px-5 py-2 rounded-xl hover:bg-white hover:text-blue-800 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
