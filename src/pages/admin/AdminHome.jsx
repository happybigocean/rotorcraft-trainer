import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center justify-center text-center px-4 text-gray-800">
      <div className="py-20 px-4">
        <h1 className="text-5xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Manage scenarios and checkride questions with ease.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigate("/admin/scenario")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
        >
          Scenarios
        </button>
        <button
          onClick={() => navigate("/admin/checkride")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
        >
          Checkride Prep
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
