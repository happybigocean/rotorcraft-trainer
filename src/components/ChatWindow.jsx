// src/components/ChatWindow.jsx
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages }) => {
  return (
    <div className="h-96 overflow-y-auto p-4 bg-white border rounded shadow-inner">
      {messages.length === 0 && <p className="text-gray-500 text-center">Ask a rotorcraft question...</p>}
      {messages.map((msg, index) => (
        <MessageBubble key={index} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
};

export default ChatWindow;
