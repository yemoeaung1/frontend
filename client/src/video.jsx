import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

let mediaRecorder1, mediaRecorder2;
let audioChunks = [];
let videoChunks = [];

function Video({ isRecording }) {
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  // let mediaRecorder;
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  const stopVideo = () => {
    setPlaying(false);
    const video = document.getElementById("webcam");
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // useEffect(() => {
  //     const startMediaCapture = async () => {
  //         try {
  //             console.log('starting capture')
  //             const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //             videoRef.current.srcObject = stream;
  //             const mediaRecorder = new MediaRecorder(stream);
  //             mediaRecorder.ondataavailable = (event) => {
  //                 if (event.data.size > 0) {
  //                     setRecordedChunks(prev => [...prev, event.data]);
  //                 }
  //             };

  //             if (!recording) {
  //                 mediaRecorder.start();
  //             } else {
  //                 mediaRecorder.stop();
  //             }
  //         } catch (err) {
  //             console.error("Error accessing media devices:", err);
  //         }
  //     };

  //     startMediaCapture();
  // }, [recording]);

  //This starts the recording
  const startVideoRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        mediaRecorder1 = new MediaRecorder(stream);
        mediaRecorder1.ondataavailable = (e) => {
          //    setRecordedChunks(e.data);
          videoChunks.push(e.data);
          console.log(e);
        };
        mediaRecorder1.onstop = () => {
          const blob = new Blob(videoChunks, { type: "video/webm" }); //, { type: "audio/webm; codecs=PCM" }
          // const blob2 = new Blob(chunks, { type: "video/webm"});

          console.log(blob);
        //   const url = URL.createObjectURL(blob);
        //   setAudioURL(url);
          // setRecordedChunks([]);
          videoChunks = [];

          sendVideo(blob);
          // sendVideo(blob2);
        };
        mediaRecorder1.start(1000);
        setRecording(true);
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
      });
  };

  const startAudioRecording = () => {
    console.log("started recording");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder2 = new MediaRecorder(stream);
        mediaRecorder2.ondataavailable = (e) => {
          //    setRecordedChunks(e.data);
          audioChunks.push(e.data);
          console.log(e);
        };
        mediaRecorder2.onstop = () => {
          const blob = new Blob(audioChunks, { type: "audio/webm" }); //, { type: "audio/webm; codecs=PCM" }
          // const blob2 = new Blob(chunks, { type: "video/webm"});

          console.log(blob);
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
          // setRecordedChunks([]);
          audioChunks = [];

          sendAudio(blob);
          // sendVideo(blob2);
        };
        mediaRecorder2.start(1000);
        setRecording(true);
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
      });
  };

  const startRecording = () => {
    startAudioRecording();
    startVideoRecording();
  }

  const stopRecording = () => {
    // if(mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder1.stop();
    mediaRecorder2.stop();
    setRecording(false);
    // }
    // mediaRecorderRef.current.stop();
  };

  //This sends the audio to parse the audio
  const sendAudio = (blob) => {
    console.log("sending recording");
    const formData = new FormData();
    formData.append("audio", blob);
    axios
      .post("http://localhost:5000/audio-parse", formData)
      .then((response) => {})
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
        "http://localhost:8080/uploadresponse",
        formData
      );
      console.log("uploaded");
      console.log(response.data);
    } catch (error) {
      console.log(`Video upload failed: ${error}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={downloadRecording}>Download</button>
      )}

      <video
        id="webcam"
        ref={videoRef}
        className="w-full transform scale-x-[-1]"
        muted
        autoPlay
        playsInline
      >
        {" "}
      </video>

      <div>
        {/* {playing ? (<button onClick={stopVideo}>Hide</button>) : (
                <button onClick={startVideo}>Show</button>)} */}
      </div>
    </div>
  );
}

export default Video;
