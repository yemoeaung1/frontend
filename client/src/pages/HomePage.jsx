import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import VideoPage from "../videoPage";

export default function HomePage() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen border-2 border-black">
      <h1 className="text-black text-6xl"> Interview Prep Tool </h1>
      <div className="my-2 flex flex-row gap-2">
        <button className="btn glass text-black" onClick={()=>navigate('/practice')}>Practice</button>
        <button className="btn glass text-black"  onClick={()=>navigate('/mock')}>Mock Interview</button>
      </div>
      <div className="mt-4">
        <h2 className="text-black text-2xl inline-block mr-8 absolute-left-48 w-fit">
          I want practice for{" "}
        </h2>
        <SlidingText />
      </div>
    </div>
  );
}

function SlidingText() {
    const messages = ['Full-Time','Internships', 'Engineering']
    const [index, setIndex] = useState(0); // State to track current index
  
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % messages.length); // Increment index circularly
        }, 4000); // Adjust timing as needed
        
        return () => clearTimeout(timeoutId);
      }, [index]); // Re-run effect whenever index changes

  return (
    <div className="text-center inline-block max-w-5xl">
      <h2 className="wave-disappear-text text-2xl text-black z-3 absolute-right-80">{messages[index]}</h2>
    </div>
  );
}
/* <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn m-1">
        Hover
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div> */
