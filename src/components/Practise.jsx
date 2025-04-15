import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Practise = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const nameText = "WELCOME TO TASK MANAGER";
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (index < nameText.length) {
        setText((prev) => prev + nameText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(timer);
        document.getElementById("enterButton").classList.remove("hidden");
      }
    }, 100);

    return () => clearInterval(timer);
  }, [index]); 

  return (
    <div>
      
      <div className="video-container">
        <video autoPlay loop muted>
          <source src="video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      
      <div id="welcomePage">
        <h1 id="nameDisplay">{text}</h1>
        <button
          id="enterButton"
          className="enter-btn hidden"
          onClick={() => navigate("/login")} 
        >
          Get Started →
        </button>
      </div>

      
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: "Poppins", sans-serif;
            overflow: hidden; 
          }

          .video-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            z-index: -1; 
          }

          .video-container video {
            width: 100%;
            height: 100%;
            object-fit: cover; 
          }

          #welcomePage {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #fff;
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
          }

          h1 {
            font-size: 38px;
            font-family: cursive;
            margin-bottom: 20px;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
          }

          .enter-btn {
            padding: 14px 28px;
            font-size: 20px;
            border: none;
            background: #007bff;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            font-weight: bold;
            box-shadow: 0px 5px 15px rgba(0, 123, 255, 0.3);
          }

          .enter-btn:hover {
            background: #0056b3;
            box-shadow: 0px 8px 20px rgba(0, 86, 179, 0.4);
          }

          .hidden {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Practise;
