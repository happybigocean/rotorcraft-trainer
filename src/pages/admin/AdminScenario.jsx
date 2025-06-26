import React, { useState } from "react";
import ScenarioList from "./ScenarioList";
import ScenarioForm from "./ScenarioForm";
import ScenarioPreviewModal from "./ScenarioPreviewModal";

export default function AdminScenario() {
  const [editingScenarioId, setEditingScenarioId] = useState(null);
  const [previewScenarioId, setPreviewScenarioId] = useState(null);
  const [formKey, setFormKey] = useState(0); // force remount form

  // When done editing/adding, close the form and refresh list
  const handleFormClose = () => {
    setEditingScenarioId(null);
    setFormKey((prev) => prev + 1); // force list update
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {!editingScenarioId ? (
        <ScenarioList
          key={formKey}
          onEdit={(id) => {setEditingScenarioId(id)}}
          onPreview={(id) => setPreviewScenarioId(id)}
        />
      ) : (
        <ScenarioForm
          scenarioId={editingScenarioId === "new" ? undefined : editingScenarioId}
          onClose={handleFormClose}
        />
      )}
      {previewScenarioId && (
        <ScenarioPreviewModal
          scenarioId={previewScenarioId}
          onClose={() => setPreviewScenarioId(null)}
        />
      )}
    </div>
  );
}