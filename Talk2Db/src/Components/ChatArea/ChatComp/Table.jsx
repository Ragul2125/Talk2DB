import { LuCloudDownload } from "react-icons/lu";
import { MdOutlineInsertChart } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import downloadCSV from "../../../Services/csv";
import { useEffect, useRef, useState } from "react";
import { GoCopy } from "react-icons/go";
import "./table.css";

const Table = ({ data, query }) => {
  const headers = Object.keys(data[0]);
  const [showQuery, setShowQuery] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const queryEndRef = useRef(null);

  useEffect(() => {
    if (showQuery) {
      queryEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showQuery]);

  return (
    <>
      <div className="message bot-message table">
        <div className="table-top">
          <h2>Table title</h2>
          <span>
            <LuCloudDownload
              onClick={() => downloadCSV(data, "test.csv")}
              size={20}
              cursor={"pointer"}
            />
            <MdOutlineInsertChart size={20} cursor={"pointer"} />
            <FaEye
              onClick={() => setShowQuery(!showQuery)}
              size={20}
              cursor={"pointer"}
            />
          </span>
        </div>
        <div className="table-wrapper">
          <table className="responsive-table">
            <thead>
              <tr>
                {headers.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header}>
                      {row[header] == null ? "null" : row[header]}
                    </td>
                  ))}
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
          <div ref={queryEndRef} />
        </div>
      )}
    </>
  );
};

export default Table;
