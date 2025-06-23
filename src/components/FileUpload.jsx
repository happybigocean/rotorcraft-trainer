// src/components/FileUpload.jsx
const FileUpload = ({ onUpload }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // 🔄 You could convert to Base64 or send to backend
      const text = await file.text();
      onUpload(text);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF or Lesson Plan</label>
      <input type="file" accept=".pdf,.txt" onChange={handleFile} />
    </div>
  );
};

export default FileUpload;
