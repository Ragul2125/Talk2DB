import { LuCloudDownload } from "react-icons/lu";
import { MdOutlineInsertChart } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import downloadCSV from "../../../Services/csv";
import { useEffect, useRef, useState } from "react";
import { GoCopy } from "react-icons/go";

const Table = () => {
  const query = `BANKACCOUNT (BANKACCOUNTID NUMBER PRIMARY KEY,BANKNAME TEXT,STOREID NUMBER,ISACTIVE BOOLEAN,RTGSNEFTFORMAT TEXT,ISINCLUDEPAYEENAMEONNEFTCHQ BOOLEAN,FOREIGN KEY (STOREID) REFERENCES STORE(STOREID))
`;
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Senior Developer",
      department: "Engineering",
      status: "Active",
      lastLogin: "2024-03-25",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "UX Designer",
      department: "Design",
      status: "Active",
      lastLogin: "2024-03-24",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Product Manager",
      department: "Product",
      status: "Active",
      lastLogin: "2024-03-23",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Marketing Specialist",
      department: "Marketing",
      status: "Inactive",
      lastLogin: "2024-03-20",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Sales Executive",
      department: "Sales",
      status: "Active",
      lastLogin: "2024-03-22",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Product Manager",
      department: "Product",
      status: "Active",
      lastLogin: "2024-03-23",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Marketing Specialist",
      department: "Marketing",
      status: "Inactive",
      lastLogin: "2024-03-20",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Sales Executive",
      department: "Sales",
      status: "Active",
      lastLogin: "2024-03-22",
    },
  ];
  const [showQuery, setShowQuery] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const queryEndRef = useRef(null);

  // Auto-scroll to the query when it's shown
  useEffect(() => {
    if (showQuery) {
      queryEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showQuery]); // ✅ Watch `showQuery`, not `query`

  return (
    <>
      <div className="message bot-message table">
        <div className="table-top">
          <h2>Table title</h2>
          <span>
            <LuCloudDownload
              onClick={() => {
                downloadCSV(data, "test.csv");
              }}
              size={20}
              cursor={"pointer"}
            />
            <MdOutlineInsertChart size={20} cursor={"pointer"} />
            <FaEye
              onClick={() => {
                setShowQuery(!showQuery);
              }}
              size={20}
              cursor={"pointer"}
            />
          </span>
        </div>
        <div className="table-wrapper">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                  <td>{row.department}</td>
                  <td>
                    <span
                      className={`status-badge ${row.status.toLowerCase()}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>{row.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showQuery && (
        <div className="query">
          <code className="query-text">{query}</code>
          <button onClick={handleCopy} className="copy-button">
            {copied ? "✔" : <GoCopy />}
          </button>
          {/* Invisible div for auto-scrolling */}
          <div ref={queryEndRef} />
        </div>
      )}  
    </>
  );
};
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
            <div
              key={message.id}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.text}
            </div>
          ) : (
            <Table />
          )}
        </>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
