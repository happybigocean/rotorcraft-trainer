// src/components/MessageBubble.jsx
const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`px-4 py-2 rounded-lg max-w-md text-sm ${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}>
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;
