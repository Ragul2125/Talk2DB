import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { RiMic2Line, RiVoiceprintFill } from "react-icons/ri";

const InputBox = ({ value, onChange, sendMessage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognition =
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  const handleMicClick = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (!isRecording) {
      recognition.start();
      setIsRecording(true);
    } else {
      recognition.stop();
      setIsRecording(false);
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onChange(transcript);
    };

    recognition.onspeechend = () => {
      setIsRecording(false);
      recognition.stop();
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };
  };

  return (
    <div className="chat-container">
      <button className="chat-mic-button"></button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="chat-input"
      >
        <input
          type="text"
          placeholder="Ask here....."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onSubmit={sendMessage}
        />
        <button className="chat-send-button" onClick={sendMessage}>
          <FaArrowRight size={22} />
        </button>
      </form>
      <button className="chat-mic-button" onClick={handleMicClick}>
        {isRecording ? (
          <RiVoiceprintFill className="breathing-animation" size={22} />
        ) : (
          <RiMic2Line size={22} />
        )}
      </button>
    </div>
  );
};

export default InputBox;