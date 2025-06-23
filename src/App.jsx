// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import LandingPage from "./pages/LandingPage";
import ScenarioTrainer from "./pages/ScenarioTrainer";
import CheckridePrep from "./pages/CheckridePrep";
import KnowledgeAssistant from "./pages/KnowledgeAssistant";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scenario" element={<ScenarioTrainer />} />
        <Route path="/checkride" element={<CheckridePrep />} />
        <Route path="/assistant" element={<KnowledgeAssistant />} />
      </Routes>
    </Router>
  );
};

export default App;
