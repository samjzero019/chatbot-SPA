// src/App.js

import React, { useState } from "react";
import ChatBot from "./components/ChatBot/ChatBot";
import ChatButton from "./components/ChatButton/ChatButton";
import "./global.css";

function App() {
  const [isChatVisible, setChatVisible] = useState(false); // State to manage chatbot visibility

  const toggleChat = () => {
    setChatVisible((prevVisible) => !prevVisible); // Toggle the chatbot visibility
  };

  return (
    <div className="App">
      <ChatBot />
    </div>
  );
}

export default App;
