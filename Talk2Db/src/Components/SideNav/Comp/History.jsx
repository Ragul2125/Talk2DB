import React from "react";
import "../SideNav.css";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const History = () => {
  const history = [
    {
      title: "Today",
      historys: [
        { history: "Show Student list" },
        { history: "Show Student list" },
        { history: "Show Student list" },
      ],
    },
    {
      title: "Yesterday",
      historys: [
        { history: "Show Student list" },
        { history: "Show Student list" },
        { history: "Show Student list" },
      ],
    },
    {
      title: "2 days ago",
      historys: [
        { history: "Show Student list" },
        { history: "Show Student list" },
        { history: "Show Student list" },
      ],
    },
    {
        title: "Yesterday",
        historys: [
          { history: "Show Student list" },
          { history: "Show Student list" },
          { history: "Show Student list" },
        ],
      },
      {
        title: "2 days ago",
        historys: [
          { history: "Show Student list" },
          { history: "Show Student list" },
          { history: "Show Student list" },
        ],
      },
      {
        title: "Yesterday",
        historys: [
          { history: "Show Student list" },
          { history: "Show Student list" },
          { history: "Show Student list" },
        ],
      },
      {
        title: "2 days ago",
        historys: [
          { history: "Show Student list" },
          { history: "Show Student list" },
          { history: "Show Student list" },
        ],
      },
  ];

  return (
    <>
      {history.map((item, index) => (
        <div className="history" key={index}>
          <div className="history-title">
            <h4>{item.title}</h4>
          </div>
          <div className="history-area">
            <div className="historys">
              {item.historys.map((items, idx) => (
                <div className="row" key={idx}>
                  <p>{items.history}</p>
                  <PiDotsThreeOutlineFill />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default History;
