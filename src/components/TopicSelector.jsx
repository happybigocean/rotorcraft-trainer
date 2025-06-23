// src/components/TopicSelector.jsx
const TopicSelector = ({ topics, selected, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2 text-gray-700">Select Topic</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">All Topics</option>
        {topics.map((topic, i) => (
          <option key={i} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TopicSelector;
