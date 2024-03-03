import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

function Video({isRecording}){
    const [playing, setPlaying] = useState(false);
    const [recording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);

    // useEffect(() => {
    //     if (isRecording) {
    //         startRecording();
    //     } else {
    //         stopRecording();
    //     }
    // }, [isRecording]);

    const startVideo = () => {
        setPlaying(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.srcObject = stream;
                mediaRecorderRef.current = new MediaRecorder(stream);

                const video = document.getElementById("webcam");
                if (video) {
                    video.srcObject = stream;
                }
                
                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        setRecordedChunks((prev) => [...prev, event.data]);
                    }
                };
        }).catch((err) => console.error(err));
    };

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

    const startRecording = () => {
        setRecording(true);
        setRecordedChunks([]);
        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        setRecording(false);
        mediaRecorderRef.current.stop();
    };

    // const downloadRecording = () => {
    //     if (recordedChunks.length) {
    //         const blob = new Blob(recordedChunks, { type: "video/webm" });
    //         const url = URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = "recording.webm";
    //         a.click();
    //         URL.revokeObjectURL(url);
    //     }
    // };
    const downloadRecording = async () => {
        console.log('in download')
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            
            const formData = new FormData();
            formData.append('file', blob)
            try {
                const response = await axios.post('http://localhost:5000/uploadresponse', formData);
                console.log('uploaded');
                console.log(response.data);
            } catch (error) {
                console.log(`Video upload failed: ${error}`)
            }
            // const url = URL.createObjectURL(blob);
            // const a = document.createElement("a");
            // a.href = url;
            // a.download = "recording.webm";
            // a.click();
            // URL.revokeObjectURL(url);
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

            <video id= "webcam" className="w-full transform scale-x-[-1]" muted autoPlay> </video>
            <div>
                {playing ? (<button onClick={stopVideo}>Hide</button>) : (
                <button onClick={startVideo}>Show</button>)}
			</div>

        </div>
    )
}

export default Video;