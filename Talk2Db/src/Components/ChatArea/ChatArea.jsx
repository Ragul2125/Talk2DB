import React, { useState } from "react";
import "./ChatArea.css";
import InputBox from "./ChatComp/InputBox";
import Suggestions from "./ChatComp/Suggestion";
import Messages from "./ChatComp/Messages";
import useApiRequest from "../../Services/useApiRequest";
import { useNavigate, useParams } from "react-router-dom";
const ChatArea = ({ sidebarOpen }) => {
  const { request, loading, error, data } = useApiRequest();
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([
    // {
    //   id: new Date().getTime(),
    //   text: "Hey there",
    //   sender: "user",
    // },
  ]);

  const handleSend = async () => {
    if (value.trim() !== "") {
      const newMessage = {
        id: new Date().getTime(),
        text: value,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      const body = {
        query: value,
        conversation_id: id,
      };
      const queryResponse = await request("/generate_sql", "POST", body);
      console.log(queryResponse);
      const dataResponse = await request("/execute_query", "POST", {
        query: queryResponse.sql,
      });
      console.table(dataResponse);
      const botMessage = {
        id: new Date().getTime(),
        data: dataResponse,
        query: queryResponse,
        sender: "bot",
      };
      setMessages([...messages, botMessage]);
      if (!id) {
        navigate(`/${queryResponse.conversation_id}`);
      }
    }
  };

  // const handleSend = () => {
  //   if (value.trim() !== "") {
  //     const newMessage = {
  //       id: new Date().getTime(),
  //       text: value,
  //       sender: "user",
  //     };
  //     const newMessage1 = {
  //       id: new Date().getTime(),
  //       text: "sollu da loosu bunda",
  //       sender: "bot",
  //     };
  //     setMessages([...messages, newMessage, newMessage1]);
  //     setValue("");
  //   }
  // };

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
