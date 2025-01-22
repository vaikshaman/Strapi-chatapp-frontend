import React, { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import "../../styles/chat.css";

// Assuming the user is logged in and stored in localStorage
const socket = io("https://strapi-chatapp-o1di.onrender.com", {
  query: { username: localStorage.getItem("username") || "Guest" }, // Pass the username
});

const ChatBox = () => {
  const [message, setMessage] = useState(""); // Current message input
  const [messages, setMessages] = useState([]); // List of messages in current session
  const [sessionId, setSessionId] = useState("default"); // Active chat session
  const [allSessions, setAllSessions] = useState(
    JSON.parse(localStorage.getItem("chatSessions")) || {}
  ); // All chat sessions
  const [user, setUser] = useState(localStorage.getItem("username") || "Guest"); // User name

  const sessionMessages = useMemo(() => allSessions[sessionId] || [], [sessionId, allSessions]);

  useEffect(() => {
    setMessages(sessionMessages);
  }, [sessionMessages]);

  useEffect(() => {
    const handleMessage = (newMessage) => {
      setMessages((prev) => {
        const updatedMessages = [...prev, newMessage];
        saveSessionToLocal(sessionId, updatedMessages);
        return updatedMessages;
      });
    };

    socket.on("receive_message", handleMessage);
    socket.on("connect_error", (error) => console.error("Socket connection error:", error));

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [sessionId]);

  const saveSessionToLocal = (id, updatedMessages) => {
    const updatedSessions = { ...allSessions, [id]: updatedMessages };
    setAllSessions(updatedSessions);
    localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
  };

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        text: message.trim(),
        user,
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, msgData];
        saveSessionToLocal(sessionId, updatedMessages);
        return updatedMessages;
      });

      socket.emit("send_message", msgData);

      setMessage("");
    }
  };

  const switchSession = (newSessionId) => {
    if (newSessionId === "new-session") {
      const newId = `Session-${Date.now()}`;
      setSessionId(newId);
      setMessages([]);
    } else {
      setSessionId(newSessionId);
    }
  };

  return (
    <div className="chat-container">
      {/* Personalized welcome message */}
      <h2>Hello, {user}!</h2>
      <p>Welcome to the Strapi chat app. Start chatting below.</p>

      <div className="session-selector">
        <label>Select Chat Session:</label>
        <select
          value={sessionId}
          onChange={(e) => switchSession(e.target.value)}
        >
          {Object.keys(allSessions).map((session) => (
            <option key={session} value={session}>
              {session}
            </option>
          ))}
          <option value="new-session">+ New Session</option>
        </select>
      </div>

      <div className="chat-box">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <span className="message-user">{msg.user}</span>: {msg.text}
              <span className="message-time">
                ({new Date(msg.timestamp).toLocaleTimeString()})
              </span>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} disabled={!message.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
