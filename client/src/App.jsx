import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FeedbackPage from "./feedbackPage";
import HomePage from "./pages/HomePage";
import gif from "/itachi-shillouette-in-front-of-the-red-moon_800.gif";
import VideoPage from "./pages/videoPage";
import TextToSpeech from "./textToSpeech";
import axios from "axios";
import Model from "./threeDmodel";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";

function App() {
  // axios.defaults.withCredentials = true
  return (
    <div className="bg-gradient-to-tr from-yellow-300 to-green-600">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<VideoPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
