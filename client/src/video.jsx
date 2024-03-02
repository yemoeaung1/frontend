import React, {useState} from "react";

function Video(){
    const [playing, setPlaying] = useState(false);

    const startVideo = () => {
        setPlaying(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                const video = document.getElementById("webcam");
                if (video) {
                    video.srcObject = stream;
                }
            })
            .catch((err) => console.error(err));
    };

    const stopVideo = () => {
        setPlaying(false);
        const video = document.getElementById("webcam");
        if (video && video.srcObject) {
            const tracks = video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    };
    return (
        <div className="flex flex-col justify-center items-center ">
            <video id= "webcam" className="w-full" muted autoPlay> </video>
            <div>
				    {playing ? (<button onClick={stopVideo}>Hide</button>) : (
					<button onClick={startVideo}>Show</button>)}
			</div>
        </div>
    )
}

export default Video;