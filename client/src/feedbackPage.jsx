import React, {useState, useEffect} from 'react';
import Video from './video';

function FeedbackPage(){
    return (
        <div className="flex h-screen">
                <div className="w-1/2 flex flex-col justify-center items-center text-white">
                    <Video/>
                </div>
                
                {/*Axios.get the questions, the feedback, and answer*/}
                <div className="w-1/2 flex  bg-blue-500 text-white">
                    <div className="flex-grow overflow-auto p-4 space-y-4 font-merienda">
                        <h1>FeedBack</h1>
                        <p>Question:</p>
                        <p>Answer:</p>
                        <p>Feedback:</p>
                    </div>
                </div>
        </div>
    )
}

export default FeedbackPage;