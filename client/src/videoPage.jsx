import React, {useState, useEffect, useRef} from 'react';
import Video from './video';
import Model from './threeDmodel';
import axios from 'axios';
import endCall from '/endCall.png'
import TextToSpeech from './textToSpeech';
import { useNavigate } from "react-router-dom";

function VideoPage(){
    const questions = ["a","a", "a", "a", "a"]
    const [question, setQuestion] = useState('');
    const [playing, setPlaying] = useState(false);
    const [recording, setRecording] = useState(false);
    const [activeRecording, setActiveRecording] = useState('notRec')
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/questions/retrieve?quantity=1`);
            console.log('Response data:', response.data[0].text);
            setQuestion(response.data[0].text)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [])

    const startRecording = () => {
        setRecording(true);
        setActiveRecording('Rec')
    };

    const stopRecording = () => {
        setRecording(false)
        setActiveRecording('notRec')
    };

    const toggleRecording = () => {
        if (recording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className='relative min-h-screen'>
            <div className="flex justify-center items-center mb-6 ">
        
                {/* <ul className="steps">
                {questions.map((question, index) => (
                    <li className="step" data-content={index + 1}></li>
                ))}
                </ul> */}
            </div>

            <div className="ml-40 w-custom h-custom border-2 rounded-md .model-container">
                <Model/>
            </div>

            <div className='absolute right-60 top-32'>
                <div className="chat chat-start">
                    <div className="chat-bubble w-80 h-auto max-h-64 min-h-[50px] p-6" style={{fontFamily: 'Libre Franklin', color: 'white' }}>
                        {question}
                            <TextToSpeech Question={question}/>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-20 right-0 m-3 border w-64 h-36 rounded-md">
                <Video isRecording={recording}/>
                <div className='absolute right-48 bottom-20 items- text-center z-5' style={{fontFamily: 'Libre Franklin', color: 'white' }}>    
                    <div className='wave-disappear-textX'>Start Recording</div> <br/>
                    <button id={activeRecording} onClick = {toggleRecording}></button>
                </div>
            </div>

            <footer className="flex justify-center w-full items-center mt-5">
                {/* <button>Mute</button> */}
                <a src={endCall} onClick = {() => navigate("/") } className="cursor-pointer">
                    <img className='w-12 ml-4 mr-4' src={endCall} alt="My Image"/>
                </a>
                {/* <button>Show</button> */}
            </footer>

        </div>
    )
}

export default VideoPage;