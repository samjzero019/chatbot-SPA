// src/ChatButton.js

import React from "react";
import "./ChatButton.css";

function ChatButton({ isVisible, toggleChat }) {
  return (
    <div className="chat-button" onClick={toggleChat}>
      <img
        src={
          isVisible ? "chat-open-button.png" : "chat-close-button.png"
        } /* Use appropriate icon */
        alt={isVisible ? "Close Chat" : "Open Chat"}
        className="chat-button-icon"
      />
    </div>
  );
}

export default ChatButton;
