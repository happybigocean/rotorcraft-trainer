import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ConfirmDialog from "../../components/ConfirmDialog";

const COLLECTION_NAME = "checkrideQuestions";

export default function CheckrideQuestionsManager() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // For add/edit form
  const [form, setForm] = useState({ text: "", answer: "" });
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // For confirm dialog
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    setLoading(true);
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    setQuestions(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
    setLoading(false);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Start add
  const handleAdd = () => {
    setForm({ text: "", answer: "" });
    setEditingId(null);
    setIsAdding(true);
  };

  // Start edit
  const handleEdit = (question) => {
    setForm({ text: question.text, answer: question.answer });
    setEditingId(question.id);
    setIsAdding(false);
  };

  // Instead of deleting directly, set deleteId
  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  // Actual delete function
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    setDeleteId(null);
    fetchQuestions();
  };

  // Save (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.text.trim() || !form.answer.trim()) return;
    if (editingId) {
      await updateDoc(doc(db, COLLECTION_NAME, editingId), {
        text: form.text.trim(),
        answer: form.answer.trim(),
      });
    } else {
      await addDoc(collection(db, COLLECTION_NAME), {
        text: form.text.trim(),
        answer: form.answer.trim(),
      });
    }
    setForm({ text: "", answer: "" });
    setEditingId(null);
    setIsAdding(false);
    fetchQuestions();
  };

  // Cancel add/edit
  const handleCancel = () => {
    setForm({ text: "", answer: "" });
    setEditingId(null);
    setIsAdding(false);
  };

  const showForm = isAdding || editingId !== null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Title and Add Button in one line */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Checkride Prep</h2>
        {!showForm && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAdd}
            disabled={showForm}
          >
            + Add Question
          </button>
        )}
      </div>

      {/* ConfirmDialog for delete */}
      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this question?"
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* Show Add/Edit Form in its own panel, not with questions */}
      {showForm ? (
        <form
          className="mb-6 p-4 border rounded bg-gray-50"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="block font-semibold mb-1">Question</label>
            <textarea
              name="text"
              className="w-full p-2 border rounded"
              value={form.text}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Answer</label>
            <textarea
              name="answer"
              className="w-full p-2 border rounded"
              value={form.answer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {editingId ? "Save" : "Add"}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {questions.map((q, idx) => (
                <li key={q.id} className="mb-4 border-b pb-3">
                  <div className="mb-1">
                    <span className="font-semibold">Q{idx + 1}:</span> {q.text}
                  </div>
                  <div className="mb-2 text-gray-700">
                    <span className="font-semibold">A:</span> {q.answer}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-blue-600 border border-blue-600 rounded"
                      onClick={() => handleEdit(q)}
                      disabled={showForm}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-red-600 border border-red-600 rounded"
                      onClick={() => handleDeleteClick(q.id)}
                      disabled={showForm}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!loading && questions.length === 0 && (
            <div className="text-gray-600 mt-4">No questions yet.</div>
          )}
        </>
      )}
    </div>
  );
}