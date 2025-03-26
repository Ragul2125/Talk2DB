import { useEffect, useRef, useState } from "react";
import Table from "./Table";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

//=============== Messages ====================

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="messages">
      {messages.map((message) => (
        <>
          {message.sender === "user" ? (
            <div key={message.id} className={`message ${"user-message"}`}>
              {message.text}
            </div>
          ) : message?.responseType === "query" ? (
            <Table data={message.data} query={message.query} />
          ) : (
            // <div key={message.id} className={`message ${"bot-message"}`}>
            //   {message.data}
            // </div>
            <DotLottieReact
              src="https://lottie.host/0c5482cc-d4ac-4bc2-9103-c99dfc41cdf5/XOXUC3g19t.lottie"
              loop
              autoplay
            />
          )}
        </>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
