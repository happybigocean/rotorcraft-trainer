import React, { useEffect, useState } from "react";
import { getScenarios, deleteScenario } from "../../firebase/firestoreService";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ScenarioList({ onEdit, onPreview }) {
  const [scenarios, setScenarios] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getScenarios().then((data) => {
      setScenarios(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteScenario(id);
    setScenarios((scenarios) => scenarios.filter((s) => s.id !== id));
    setDeleteId(null);
  };

  if (loading) return <div>Loading scenarios...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Scenarios</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => onEdit("new")}
        >
          + Add New
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.id} className="border-t">
              <td className="p-2">{scenario.id}</td>
              <td className="p-2">{scenario.title}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => onEdit(scenario.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => setDeleteId(scenario.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-700 text-white px-3 py-1 rounded"
                  onClick={() => onPreview(scenario.id)}
                >
                  Preview
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this scenario?"
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}