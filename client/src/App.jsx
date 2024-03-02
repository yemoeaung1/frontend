import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FeedbackPage from "./feedbackPage";
import HomePage from "./pages/HomePage";
import gif from "/itachi-shillouette-in-front-of-the-red-moon_800.gif";
import VideoPage from './videoPage'
import TextToSpeech from './textToSpeech'
import axios from 'axios'

function App() {
  axios.defaults.withCredentials = true
  return (
    <div>
      <div
        className="bg-gradient-to-tr from-yellow-300 to-green-600"
        // style={{
        //   backgroundImage: `url(${gif})`,
        //   backgroundSize: "cover",
        //   height: "100vh",
        // }}
      >
        <HomePage />
      </div>
    </div>
  );
    <TextToSpeech/>
  )
}

export default App;
