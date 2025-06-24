// src/pages/ScenarioTrainer.jsx

import { useState } from "react";
import ScenarioSelector from "../components/scenario/ScenarioSelector";
import ScenarioPlayer from "../components/scenario/ScenarioPlayer";
import DebriefCard from "../components/scenario/DebriefCard";

import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const ScenarioTrainer = () => {
    const [selected, setSelected] = useState(null);
    const [debrief, setDebrief] = useState({ text: "", status: "" });
    const [scenarios, setScenarios] = useState([]);

    useEffect(() => {
        const fetchScenarios = async () => {
            const snapshot = await getDocs(collection(db, "scenarios"));
            const loaded = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setScenarios(loaded);
        };

        fetchScenarios();
    }, []);

    const handleComplete = (feedbackText, status) => {
        setDebrief({ text: feedbackText, status });
    };

    const handleReset = () => {
        setSelected(null);
        setDebrief({ text: "", status: "" });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🚁 Scenario Trainer</h1>

        {/* If no scenario is selected yet */}
        {!selected && (
            <ScenarioSelector scenarios={scenarios} onSelect={setSelected} />
        )}

        {/* If a scenario is selected but not yet completed */}
        {selected && !debrief.text && (
            <ScenarioPlayer scenario={selected} onComplete={handleComplete} />
        )}

        {/* If a scenario has been completed and debrief is available */}
        {selected && debrief.text && (
            <DebriefCard
            feedback={debrief.text}
            status={debrief.status}
            onReset={handleReset}
            />
        )}
        </div>
    );
};

export default ScenarioTrainer;
