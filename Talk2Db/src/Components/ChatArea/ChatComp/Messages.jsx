import { LuCloudDownload } from "react-icons/lu";
import { MdOutlineInsertChart } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const Table = ({ data }) => {
  return (
    <div className="message bot-message table">
      <div className="table-top">
        <h2>Table title</h2>
        <span>
          <LuCloudDownload size={20} cursor={"pointer"} />
          <MdOutlineInsertChart size={20} cursor={"pointer"} />
          <FaEye size={20} cursor={"pointer"} />
        </span>
      </div>
    </div>
  );
};
const Messages = ({ messages }) => {
  return (
    <div className="messages">
      {messages.map((message) => (
        <>
          <div
            key={message.id}
            className={`message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
          <Table />
        </>
      ))}
    </div>
  );
};

export default Messages;
