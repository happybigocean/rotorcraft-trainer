import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center justify-center text-center px-4 text-gray-800">
      <div className="py-20 px-4">
        <h1 className="text-5xl font-bold mb-6">🚁 Rotorcraft Trainer</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Train smarter. Fly safer. AI-powered scenario training, check-ride prep, and a rotorcraft knowledge assistant — all in one.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigate("/scenario")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
        >
          Start Scenario Training
        </button>
        <button
          onClick={() => navigate("/checkride")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
        >
          Checkride Prep
        </button>
      </div>
    </div>
  );
};

export default HomePage;
