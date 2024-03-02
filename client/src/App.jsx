import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FeedbackPage from './feedbackPage'
import VideoPage from './videoPage'
import TextToSpeech from './textToSpeech'
import axios from 'axios'

function App() {
  axios.defaults.withCredentials = true
  return (
    <TextToSpeech/>
  )
}

export default App
