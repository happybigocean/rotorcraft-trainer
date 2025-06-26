import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ScenarioTrainer from "./pages/ScenarioTrainer";
import CheckridePrep from "./pages/CheckridePrep";
import KnowledgeAssistant from "./pages/KnowledgeAssistant";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedLayout from "./components/ProtectedLayout";
import HomePage from "./pages/Home";
import AdminHome from "./pages/admin/AdminHome";
import AdminScenario from "./pages/admin/AdminScenario";
import CheckrideQuestionsManager from "./pages/admin/CheckrideQuestionsManager";
import { ProtectedRoute, AdminRoute } from "./routes/ProtectedRoutes";

const handleLogout = async () => {
  await signOut(auth);
  localStorage.removeItem("userInfo");
  window.location.href = "/login";
};

const App = () => (
  <Router>
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin Protected Page */}
      <Route
        path="/admin/home"
        element={
          <AdminRoute>
            <ProtectedLayout onLogout={handleLogout}>
              <AdminHome />
            </ProtectedLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/scenario"
        element={
          <AdminRoute>
            <ProtectedLayout onLogout={handleLogout}>
              <AdminScenario />
            </ProtectedLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/checkride"
        element={
          <AdminRoute>
            <ProtectedLayout onLogout={handleLogout}>
              <CheckrideQuestionsManager />
            </ProtectedLayout>
          </AdminRoute>
        }
      />

      {/* User Protected Pages */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <ProtectedLayout onLogout={handleLogout}>
              <HomePage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scenario"
        element={
          <ProtectedRoute>
            <ProtectedLayout onLogout={handleLogout}>
              <ScenarioTrainer />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkride"
        element={
          <ProtectedRoute>
            <ProtectedLayout onLogout={handleLogout}>
              <CheckridePrep />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assistant"
        element={
          <ProtectedRoute>
            <ProtectedLayout onLogout={handleLogout}>
              <KnowledgeAssistant />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;