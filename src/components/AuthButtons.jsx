// src/components/AuthButtons.jsx
const AuthButtons = () => {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <button className="text-white border border-white px-5 py-2 rounded-xl hover:bg-white hover:text-blue-800 transition">
        Login
      </button>
      <button className="text-white border border-white px-5 py-2 rounded-xl hover:bg-white hover:text-blue-800 transition">
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;
