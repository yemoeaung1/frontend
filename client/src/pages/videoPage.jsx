import React, { useState, useEffect, useRef } from "react";
import Video from "../video";
import Model from "../threeDmodel";
import LoadingPage from "./LoadingPage";
import FeedbackPage from "../feedbackPage";
import { useNavigate } from 'react-router-dom';

function VideoPage() {
  const questions = ["a", "a", "a", "a", "a"];
  const [isMuted, setIsMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [activeRecording, setActiveRecording] = useState("notRec");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFeedbackReady, setIsFeedbackReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted && !isFeedbackReady) {
        console.log(isSubmitted);
        // Navigate to the LoadingPage when isSubmitted is true and isReady is false
        navigate('/loading');
    } else if (isSubmitted && isFeedbackReady) {
        // Navigate to the FeedbackPage when both isSubmitted and isReady are true
        navigate('/feedback');
    }
    }, [isSubmitted, isFeedbackReady]);

  const startRecording = () => {
    setRecording(true);
    setActiveRecording("Rec");
  };

  const stopRecording = () => {
    setRecording(false);
    setActiveRecording("notRec");
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

return (
    <div className="relative">
      <div className="flex justify-center items-center mt-6 mb-6">
        <button
          id={activeRecording}
          className="absolute left-0"
          onClick={toggleRecording}
        ></button>

        <ul className="steps">
          {questions.map((question, index) => (
            <li className="step" data-content={index + 1}></li>
          ))}
        </ul>
      </div>

      <div className="ml-5 w-custom h-custom border-2 rounded-md .model-container">
        <Model />
      </div>

      <div className="absolute right-20 top-20">
        <div className="chat chat-start">
          <div className="chat-bubble "></div>
        </div>
      </div>

      <div className="fixed bottom-20 right-0 m-3 border w-64 h-36 rounded-md">
        <Video setIsSubmitted={setIsSubmitted} />
      </div>

      <footer className="w-full text-center mt-5">
        <button>Mute</button>
        <button>End Call</button>
        <button>Show</button>
      </footer>
    </div>
  );
}

export default VideoPage;
