// src/ChatBot.js

import React, { useState, useEffect, useRef } from "react";
import Message from "../Message/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./ChatBot.css";
import axios from "axios";

function ChatBot({ isVisible, onClose }) {
  const [messages, setMessages] = useState(() => {
    // Load messages from local storage on component mount
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [{ text: "مرحبًا! 👋 كيف يمكنني مساعدتك اليوم؟", sender: "bot" }];
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // State to manage typing indicator
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setIsTyping(true); // Show typing indicator

      try {
        const resp = await axios.post("http://localhost:8000/api/v1/chroma", {
          q: input,
        });
        console.log("object", JSON.parse(resp.data.body));
        const botMessage = {
          text: JSON.parse(resp.data.body).response.response,
          sender: "bot",
        };
        const updatedMessages = [...newMessages, botMessage];
        setMessages(updatedMessages);
        setIsTyping(false); // Hide typing indicator
      } catch (err) {
        console.log("Error! Unable to Receive Response!", err);
        throw new Error(
          `Something Went Wrong!!! \n Possible Error: ${err.message}`
        );
      }
    }
  };

  useEffect(() => {
    // Save messages to local storage whenever they change
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    isVisible && (
      <div className="chatbot">
        <div className="chatbot-header">
          Help Bot
          <button className="chatbot-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <Message key={index} text={msg.text} sender={msg.sender} />
          ))}
          {isTyping && (
            <div className="typing-indicator">يقوم الروبوت بمعالجة سؤالك</div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button onClick={handleSend} className="send-button">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    )
  );
}

export default ChatBot;
