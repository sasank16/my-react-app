import React, { useState } from 'react';
import "../components/Main.css";

const Main = () => {
  const [activeView, setActiveView] = useState('home');
  const [targetSeconds, setTargetSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const showSetTimer = () => {
    const minutes = prompt('Set timer for how many minutes?');
    if (minutes !== null && !isNaN(parseInt(minutes))) {
      const totalSeconds = parseInt(minutes) * 60;
      if (totalSeconds > 0) {
        clearInterval(intervalId);
        setTargetSeconds(totalSeconds);
        setActiveView('setTimer');

        const newIntervalId = setInterval(() => {
          setTargetSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(newIntervalId);
              alert('Set time is completed!');
              setActiveView('home');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setIntervalId(newIntervalId);
      } else {
        alert('Please enter a valid positive number of minutes.');
      }
    }
  };

  const stopSetTimer = () => clearInterval(intervalId);
  const resetSetTimer = () => {
    clearInterval(intervalId);
    setTargetSeconds(0);
  };

  const setDarkMode = () => {
    document.body.style.background = '#2c3e50';
    document.body.style.color = 'white';
  };

  const setLightMode = () => {
    document.body.style.background = '#f4f4f4';
    document.body.style.color = 'black';
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <h2>Menu</h2>
        <div className="menu-item" onClick={() => setActiveView('home')}>Home</div>
        <div className="menu-item" onClick={() => window.location.href = '/dashboard'}>Dashboard</div>
        <div className="menu-item" onClick={() => setActiveView('calendar')}>Calendar</div>
        <div className="menu-item" onClick={() => setActiveView('skills')}>Improve Skills</div>
        <div className="menu-item" onClick={showSetTimer}>Set Timer</div>
        <div className="menu-item menu-item-theme">
          Theme Options
          <div className="dropdown">
            <div className="dropdown-item" onClick={setDarkMode}>Dark Mode</div>
            <div className="dropdown-item" onClick={setLightMode}>Light Mode</div>
          </div>
        </div>
      </div>

      <div className="content" id="main-content">
        {activeView === 'home' && (
          <div className="home">
            <h1>Welcome to the Task Manager</h1>
            <p>Stay organized and productive!</p>
          </div>
        )}

        {activeView === 'calendar' && (
          <>
            <h2>Google Calendar</h2>
            <div className="calendar-container">
              <iframe
                className="calendar-iframe"
                src="https://calendar.google.com/calendar/embed?src=b27afcc9b3ee7d62be001aa5d57f077d6443c0e877cad8ce93b71973da1685b4%40group.calendar.google.com&ctz=Asia%2FKolkata"
                title="Google Calendar"
              ></iframe>
            </div>
          </>
        )}

        {activeView === 'skills' && (
          <>
            <h2>Improve Your Management Skills</h2>
            <div className="skills-container">
              <iframe src="https://www.youtube.com/embed/iONDebHX9qk" title="Skill 1"></iframe>
              <iframe src="https://www.youtube.com/embed/TEnks7wOBKs" title="Skill 2"></iframe>
              <iframe src="https://www.youtube.com/embed/T4dser6ssp0" title="Skill 3"></iframe>
              <iframe src="https://www.youtube.com/embed/WXBA4eWskrc" title="Skill 4"></iframe>
              <iframe src="https://www.youtube.com/embed/VpN78TXMSUM" title="Skill 5"></iframe>
              <iframe src="https://www.youtube.com/embed/XqdDMNExvA0" title="Skill 6"></iframe>
            </div>
          </>
        )}

        {activeView === 'setTimer' && (
          <div className="timer-box">
            <h2>Set Timer</h2>
            <div className="timer">{formatTime(targetSeconds)}</div>
            <div className="timer-controls">
              <button onClick={stopSetTimer}>Stop</button>
              <button onClick={resetSetTimer}>Reset</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
