import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import VideoPage from "../videoPage";

export default function HomePage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen border-2 border-black">
      <h1 className="text-black text-6xl"> Interview Prep Tool </h1>
      <div className="my-2 flex flex-row gap-2 my-4">
        <button
          className="btn glass text-black"
          onClick={() => {
            console.log(role);
            navigate("/loading")
          }}
        >
          Practice
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-black text-2xl inline-block mr-4 w-fit inline-block">
          Interview me for:
        </h2>
        <InputPosition setRole={setRole} navigate={navigate}/>
      </div>
    </div>
  );
}

function InputPosition({setRole, navigate}) {
  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRole(e.target.value);
    navigate('/loading');

     // Simulate an asynchronous operation (replace this with your actual condition check)
     setTimeout(() => {
        // Once condition is met, navigate to another route
        navigate('/practice');
      }, 2000); // Example: Wait for 2 seconds before navigating
  };
  return (
    <div className="inline-block">
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs border-4 bg-transparent border-red-100 text-white text-2xl focus:border-red-500"
          onChange={handleChange}
        />
        <div>
        <button className="btn btn-ghost text-black w-fit">Enter</button>
        </div>
      </form>
    </div>
  );
}
