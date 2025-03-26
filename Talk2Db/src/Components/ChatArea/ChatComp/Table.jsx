import { LuCloudDownload } from "react-icons/lu";
import { MdOutlineInsertChart } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import downloadCSV from "../../../Services/csv";
import { useEffect, useRef, useState } from "react";
import { GoCopy } from "react-icons/go";
import "./table.css";
import { VscRunBelow } from "react-icons/vsc";
import useApiRequest from "../../../Services/useApiRequest";

const Table = ({ query }) => {
  const { request, loading, error } = useApiRequest();
  const { request: vreq, loading: vload, error: vErr } = useApiRequest();
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [showQuery, setShowQuery] = useState(true);
  const [copied, setCopied] = useState(false);
  const [rowCount, setRowCount] = useState(100);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // const handleVisualize = async() => {
  //   const visualize = await vreq("/generate_chart", "POST", {
  //     query: query,
  //   });
  // };

  const handleExecute = async () => {
    // If it's a valid SQL query, execute it
    const dataResponse = await request("/execute_query", "POST", {
      query: query,
      row_count: rowCount,
    });

    if (dataResponse && Array.isArray(dataResponse.results)) {
      setData(dataResponse.results);
      setHeaders(Object.keys(dataResponse.results[0]));
    } else {
      console.error("Invalid response from execute_query.");
      return;
    }
  };

  const queryEndRef = useRef(null);

  useEffect(() => {
    if (showQuery) {
      queryEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showQuery]);

  return (
    <>
      {showQuery && (
        <div className="query">
          <code className="query-text">{query}</code>
          <button
            title="Copy Query"
            onClick={handleCopy}
            className="copy-button"
          >
            {copied ? "✔" : <GoCopy />}
          </button>
          {!data.length > 0 && (
            <button
              onClick={handleExecute}
              title="Run Query"
              className="copy-button"
            >
              {loading ? <div className="loader" /> : <VscRunBelow />}
            </button>
          )}
          <div ref={queryEndRef} />
        </div>
      )}
      {data.length > 0 && (
        <div className="message bot-message table">
          <div className="table-top">
            <h2>Table title</h2>
            <span>
              <LuCloudDownload
                onClick={() => downloadCSV(data, "test.csv")}
                size={20}
                cursor={"pointer"}
                title="Download as CSV"
              />
              <MdOutlineInsertChart
                size={20}
                cursor={"pointer"}
                title="Visualize Query"
              />
              <FaEye
                onClick={() => setShowQuery(!showQuery)}
                size={20}
                cursor={"pointer"}
                title="Show Query"
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
                        {!row[header] ? "null" : row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
