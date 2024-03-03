import "./App.css";
import FeedbackPage from "./feedbackPage";
import HomePage from "./pages/HomePage";
import VideoPage from "./videoPage";
import TextToSpeech from "./textToSpeech";
import axios from "axios";
import Model from "./threeDmodel";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import LoadingPage from "./pages/loadingPage";

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
