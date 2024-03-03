import React, { useState, useEffect, useRef } from "react";
import Video from "./video";
import Model from "./threeDmodel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./pages/loadingPage";
import FeedbackPage from "./feedbackPage";

function VideoPage() {
  const questions = ["a", "a", "a", "a", "a"];
  const [isMuted, setIsMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [activeRecording, setActiveRecording] = useState("notRec");
  const [question, setQuestion] = useState(null);
  const [questionID, setQuestionID] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("in");
  console.log("answer", answer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/questions/retrieve?quantity=1"
        );
        console.log("Response data:", response.data[0].text);
        setQuestion(response.data[0].text);
        setQuestionID(response.data[0]._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //This sends the audio to parse the audio
  const sendAudio = (blob) => {
    console.log("sending recording");
    const formData = new FormData();
    formData.append("audio", blob);
    axios
      .post(`http://localhost:5000/audio-parse?qID=${id}`, formData)
      .then((response) => {
        console.log(response);
        // axios.get(`http://localhost:8000/add-answer?qID=${id}&answer=${response}`).then((response) => {
        //     console.log(response);
        // })
        return response;
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  {
    /* This will download the video Recording*/
  }
  const sendVideo = async (blob) => {
    console.log("in download");
    // const blob2 = new Blob(recordedChunks,{ type: "audio/webm;codecs=opus"});
    // const url = URL.createObjectURL(blob2);
    // setaudioURL(blob2);
    // setRecordedChunks([]);
    // sendAudio(blob2);

    const formData = new FormData();
    formData.append("file", blob);
    try {
      const response = await axios.post(
        `http://localhost:5000/uploadresponse?qID=${id}`,
        formData
      );
      console.log("uploaded");
      console.log(response.data);
    } catch (error) {
      console.log(`Video upload failed: ${error}`);
    }
  };

  const startRecording = () => {
    // setRecording(true);
    setActiveRecording("Rec");

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
          setRecordedChunks(e.data);
        };
        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks, { type: "audio/webm;codecs=opus" }); //, { type: "audio/webm; codecs=PCM" }
          const blob2 = new Blob(chunks, { type: "video/webm" });

          console.log(blob);
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
          setRecordedChunks([]);

          sendVideo(blob2);
          let transcription = await sendAudio(blob);
        };
        mediaRecorder.start(1000);
        setRecording(true);
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
      });
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

  if (isLoading) {
    // navigate("/loading");
    return <LoadingPage />
  }else if (!isLoading && isSubmitted) {
        // navigate("/feedback");
        return <FeedbackPage />
  } else {
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
          {/* <Model/> */}
        </div>

        <div className="absolute right-0 top-32">
          <div className="chat chat-start">
            <div className="chat-bubble w-80 h-auto max-h-64 min-h-[50px] p-6">
              {question}
            </div>
          </div>
        </div>

        <div className="fixed bottom-20 right-0 m-3 border w-64 h-36 rounded-md">
          <Video
            isRecording={recording}
            question={question}
            id={questionID}
            setAnswer={setAnswer}
            setIsLoading={setIsLoading}
            setIsSubmitted={setIsSubmitted}
          />
        </div>

        <footer className="w-full text-center mt-5">
          <button>Mute</button>
          <button>End Call</button>
          <button>Show</button>
        </footer>
      </div>
    );
  }
}

export default VideoPage;
