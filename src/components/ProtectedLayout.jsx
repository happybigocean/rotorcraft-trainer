import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const ProtectedLayout = ({ user, onLogout, children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">🚁 Rotorcraft Trainer</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Hello, {user.email}</span>
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
