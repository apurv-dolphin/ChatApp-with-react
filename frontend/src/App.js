import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:7000");
const userName = "User " + parseInt(Math.random() * 10);
// set the layOut

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { userName, message });
    setMessage("");
  };
  return (
    <div className="App">
      <div className="type-contain">
        <h1>Welcome to Web chat app</h1>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            name="message"
            placeholder="Type message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <div class="smartphone">
        <div class="content">
          {chat.map((payload, index) => {
            return (
              <h3 key={index}>
                {payload.userName}: <span>{payload.message}</span>
              </h3>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
