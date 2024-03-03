import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

function Video({isRecording}){
    const [playing, setPlaying] = useState(false);
    const [recording, setRecording] = useState(isRecording);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [audioURL, setAudioURL] = useState('');
    let mediaRecorder;
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);

    const stopVideo = () => {
        setPlaying(false);
        const video = document.getElementById("webcam");
        if (video && video.srcObject) {
            const tracks = video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    useEffect(() => {
        const startMediaCapture = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                videoRef.current.srcObject = stream;
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        setRecordedChunks(prev => [...prev, event.data]);
                    }
                };
                
                if (isRecording) {
                    mediaRecorder.start();
                } else {
                    mediaRecorder.stop();
                }
            } catch (err) {
                console.error("Error accessing media devices:", err);
            }
        };

        startMediaCapture();
    }, [isRecording]);

    //This starts the recording
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then((stream) => {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (e) => {
           setRecordedChunks(e.data);
          };
          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {type: "audio/webm;codecs=opus"});//, { type: "audio/webm; codecs=PCM" }
            const blob2 = new Blob(chunks, { type: "video/webm"});

            console.log(blob)
            const url = URL.createObjectURL(blob);
            setAudioURL(url);
            setRecordedChunks([]);
            
            sendAudio(blob);
            sendVideo(blob2);
          };
          mediaRecorder.start(1000);
          setRecording(true);
        })
        .catch((err) => {
          console.error('Error accessing microphone:', err);
        });
    };

    const stopRecording = () => {
        setRecording(false);
        mediaRecorderRef.current.stop();
    };

    //This sends the audio to parse the audio
    const sendAudio = (blob) => {
        const formData = new FormData();
        formData.append('audio', blob);
        axios.post('http://localhost:5000/audio-parse', formData)
        .then(response => {
          
        })
        .catch(err => {
          console.error("Error: ", err);
        })
        
      };

    {/* This will download the video Recording*/}
    const sendVideo = async (blob) => {
        console.log('in download')
        // const blob2 = new Blob(recordedChunks,{ type: "audio/webm;codecs=opus"});
        // const url = URL.createObjectURL(blob2);
        // setaudioURL(blob2);
        // setRecordedChunks([]);
        // sendAudio(blob2);

        const formData = new FormData();
        formData.append('file', blob)
        try {
            const response = await axios.post('http://localhost:5000/uploadresponse', formData);
            console.log('uploaded');
            console.log(response.data);
        } catch (error) {
            console.log(`Video upload failed: ${error}`)
        }
        
    };

    return (
        <div className="flex flex-col justify-center items-center ">
            {/* {isRecording ? (
                    <button onClick={stopRecording}>Stop Recording</button>
                ) : (
                    <button onClick={startRecording}>Start Recording</button>
                )}  */}
                {recordedChunks.length > 0 && (
                    <button onClick={downloadRecording}>Download</button>
                )}

            <video id= "webcam" ref={videoRef} className="w-full transform scale-x-[-1]" muted autoPlay playsInline> </video>
            
            <div>
                {/* {playing ? (<button onClick={stopVideo}>Hide</button>) : (
                <button onClick={startVideo}>Show</button>)} */}
			</div>

        </div>
    )
}

export default Video;