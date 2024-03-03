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
import Model from "./threeDmodel";

function App() {
  axios.defaults.withCredentials = true
  return (
    <div>
      <FeedbackPage/>
    </div>
  );
}

export default App;
