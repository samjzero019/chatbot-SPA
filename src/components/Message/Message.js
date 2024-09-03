// src/Message.js

import React from "react";
import "./Message.css";

function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      {sender === "bot" ? (
        <img
          src="/bot-avatar-1.png"
          alt="Bot Avatar"
          className="message-avatar"
        />
      ) : (
        <img
          src="/user-avatar-2.png"
          alt="User Avatar"
          className="message-avatar user-avatar"
        />
      )}
      <div className={`message-text ${sender}`}>{text}</div>
    </div>
  );
}

export default Message;
