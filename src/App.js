// src/App.js

import React, { useState } from "react";
import ChatBot from "./components/ChatBot";
import ChatButton from "./components/ChatButton";
import "./styles/App.css";

function App() {
  const [isChatVisible, setChatVisible] = useState(false); // State to manage chatbot visibility

  const toggleChat = () => {
    setChatVisible((prevVisible) => !prevVisible); // Toggle the chatbot visibility
  };

  return (
    <div className="App">
      <ChatButton isVisible={isChatVisible} toggleChat={toggleChat} />{" "}
      {/* Button to toggle chat */}
      {isChatVisible && (
        <ChatBot isVisible={isChatVisible} onClose={toggleChat} />
      )}{" "}
      {/* Chatbot UI */}
    </div>
  );
}

export default App;
