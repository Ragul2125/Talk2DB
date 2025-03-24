import { useRef } from "react";

const Suggestions = ({ setInputValue }) => {
  const suggestions = [
    "What is AI?",
    "How does machine learning work?",
    "Explain deep learning in simple terms",
    "What are the risks of AI?",
    "What is the future of AI?",
  ];

  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += direction === "left" ? -200 : 200;
    }
  };

  return (
    <div className="suggestions-container">
      <button className="scroll-btn left" onClick={() => handleScroll("left")}>
        ‹
      </button>
      <div className="suggestions-list" ref={scrollRef}>
        {suggestions.map((text, index) => (
          <div
            key={index}
            className="suggestion-item"
            onClick={() => setInputValue(text)}
          >
            {text}
          </div>
        ))}
      </div>
      <button
        className="scroll-btn right"
        onClick={() => handleScroll("right")}
      >
        ›
      </button>
    </div>
  );
};

export default Suggestions;