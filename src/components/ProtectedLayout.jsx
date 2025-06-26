import React from "react";

const getLocalUserInfo = () => {
  try {
    const raw = localStorage.getItem("userInfo");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const ProtectedLayout = ({ onLogout, children }) => {
  const userInfo = getLocalUserInfo();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">🚁 Rotorcraft Trainer</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Hello, {userInfo?.email ? userInfo.email : "User"}
          </span>
          <button
            onClick={onLogout}
            className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default ProtectedLayout;