import React, { useState } from "react";
import "./ChatArea.css";
import InputBox from "./ChatComp/InputBox";
import Suggestions from "./ChatComp/Suggestion";
import Messages from "./ChatComp/Messages";
const ChatArea = ({ sidebarOpen }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([
    // {
    //   id: new Date().getTime(),
    //   text: "Hey there",
    //   sender: "user",
    // },
  ]);

  const handleSend = () => {
    if (value.trim() !== "") {
      const newMessage = {
        id: new Date().getTime(),
        text: value,
        sender: "user",
      };
      const newMessage1 = {
        id: new Date().getTime(),
        text: "sollu da loosu bunda",
        sender: "bot",
      };
      setMessages([...messages, newMessage, newMessage1]);
      setValue("");
    }
  };

  return (
    <div className={`ChatArea ${sidebarOpen ? "" : "sidebar-closed"}`}>
      <div className="chat-pg">
        <div className="center">
          <nav className="chat-nav">
            <h1>
              TALK<span>2</span>DB
            </h1>
          </nav>
          {messages.length > 0 ? (
            <Messages messages={messages} />
          ) : (
            <div className="chat-welcome">
              {/* <h1>Welcome to Talk2DB</h1> */}
              <p>
                Lets solve it <span>together !</span>, How can I help you ?
              </p>
              <Suggestions setInputValue={(text) => setValue(text)} />
            </div>
          )}

          <div className="chat-bottom">
            <InputBox
              value={value}
              onChange={(text) => {
                setValue(text);
              }}
              sendMessage={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
