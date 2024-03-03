import React, {useState, useEffect} from 'react';
import Video from './video';
import axios from 'axios'

function FeedbackPage(){
    const [questions, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [scores, setScores] = useState({});
    const [feedback, setFeedback] = useState('');

    useEffect(() =>{
        const fetchData = async () => {
          try {
            const questionParam = "DESCRIBE A SITUATION WHERE YOU HAD TO MEET A TIGHT DEADLINE. WHAT STEPS DID YOU TAKE TO ENSURE THE TASK WAS COMPLETED, AND WHAT WAS THE OUTCOME";
            const answerParam = "WELL, THERE WAS THIS PROJECT AT MY PREVIOUS JOB WHERE WE HAD A REALLY TIGHT DEADLINE. I KIND OF PROCRASTINATED A BIT AND REALIZED I WAS RUNNING OUT OF TIME. SO, I STAYED UP ALL NIGHT BEFORE THE DEADLINE AND FINISHED THE WORK. I DIDN'T REALLY COMMUNICATE MUCH WITH THE TEAM BECAUSE I WANTED TO FOCUS ON GETTING IT DONE QUICKLY. IN THE END, I SUBMITTED IT JUST IN TIME. I THINK THE OUTCOME WAS FINE; THE PROJECT GOT DONE, BUT I WAS REALLY TIRED FOR A FEW DAYS AFTERWARD";
            const response = await axios.get(`http://localhost:8000/star/generate?question=${encodeURIComponent(questionParam)}&answer=${encodeURIComponent(answerParam)}`, {withCredientials: true});
            console.log('Response data:', response.data.scores);
            setQuestion(response.data.Question);
            setAnswer(response.data.Answer);
            setScores(response.data.Scores);
            setFeedback(response.data.Result)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [])

    return (
        <div className="flex h-screen">
                {/*Axios.get the questions, the feedback, and answer*/}
                <div className="w-screen bg-blue-200 text-white">
                    <div className="flex-grow overflow-auto p-4 space-y-4 font-merienda">
                        <h1 className='text-center font-bold mb-6'>Feedback Page</h1>
                        <p><span className="font-bold">The Question:</span> {questions}</p>
                        <p><span className="font-bold text-black">Your Answer:</span> {answer}</p>
                        <div className="bg-white text-center text-blue-900 font-bold p-4 rounded shadow-lg">
                            <p>
                                <pre>
                                    {
                                    `Situation: ${scores.Situation}
                                    \nTask: ${scores.Task}
                                    \nAction: ${scores.Action}
                                    \nResult: ${scores.Result}
                                    \nProfessionalism: ${scores.Professionalism}
                                    \nTotal Score: ${scores.Total_Score}`
                                    }
                                </pre>
                            </p>
                        </div>
                        <p><span className="font-bold">Your Feedback:</span> {feedback}</p>
                    </div>
                </div>
        </div>
    )
}

export default FeedbackPage;