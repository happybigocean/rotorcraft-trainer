// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Placeholder routes for other pages */}
        <Route path="/scenario" element={<div className="p-6">Scenario Trainer Page</div>} />
        <Route path="/checkride" element={<div className="p-6">Checkride Prep Page</div>} />
        <Route path="/assistant" element={<div className="p-6">Knowledge Assistant Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
