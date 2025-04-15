import React, { useState, useEffect } from "react";

const SetTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      if (isRunning) alert("Set time is completed!");
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => {
    const minutes = prompt("Set timer for how many minutes?");
    if (minutes !== null && !isNaN(parseInt(minutes))) {
      const totalSeconds = parseInt(minutes) * 60;
      if (totalSeconds > 0) {
        setTime(totalSeconds);
        setIsRunning(true);
      } else {
        alert("Please enter a valid positive number of minutes.");
      }
    }
  };

  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => setTime(0);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)", width: "400px", margin: "auto" }}>
      <h2>Set Timer</h2>
      <div style={{ fontSize: "72px", color: "#3498db", margin: "20px 0" }}>{formatTime(time)}</div>
      <div>
        {!isRunning && <button onClick={startTimer} style={{ marginRight: "10px" }}>Start</button>}
        {isRunning && <button onClick={stopTimer} style={{ marginRight: "10px" }}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default SetTimer;
