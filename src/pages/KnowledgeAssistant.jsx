// src/pages/KnowledgeAssistant.jsx
import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import FileUpload from "../components/FileUpload";

const KnowledgeAssistant = () => {
  const [messages, setMessages] = useState([]);

  const callGPT = async (inputText) => {
    const userMessage = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // 🔄 Replace this with your own backend API call
      const response = await fetch("https://your-api.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: inputText }),
      });
      const data = await response.json();
      const aiReply = { role: "assistant", content: data.reply || "No answer returned." };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Failed to fetch AI response." },
      ]);
    }
  };

  const handleUpload = (text) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "Uploaded file: " + text.slice(0, 100) + "..." },
    ]);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Knowledge Assistant</h1>
      <ChatWindow messages={messages} />
      <ChatInput onSend={callGPT} />
      <FileUpload onUpload={handleUpload} />
    </div>
  );
};

export default KnowledgeAssistant;
