import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import "./App.css"
import LandingPage from "./pages/LandingPage";
import ScenarioTrainer from "./pages/ScenarioTrainer";
import CheckridePrep from "./pages/CheckridePrep";
import KnowledgeAssistant from "./pages/KnowledgeAssistant";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedLayout from "./components/ProtectedLayout";
import HomePage from "./pages/Home";

// Protect routes
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Pages with Layout */}
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <ProtectedLayout user={user} onLogout={handleLogout}>
                <HomePage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/scenario"
          element={
            <ProtectedRoute user={user}>
              <ProtectedLayout user={user} onLogout={handleLogout}>
                <ScenarioTrainer />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkride"
          element={
            <ProtectedRoute user={user}>
              <ProtectedLayout user={user} onLogout={handleLogout}>
                <CheckridePrep />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant"
          element={
            <ProtectedRoute user={user}>
              <ProtectedLayout user={user} onLogout={handleLogout}>
                <KnowledgeAssistant />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
