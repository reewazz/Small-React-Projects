import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin!!!');
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const interval = useRef(null);
  const [isRunning, setisRunning] = useState(false);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  function startTimer() {
    if (interval.current !== null) return;
    setTitle('Countdown running....');
    interval.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
    setisRunning(true);
  }
  function stopTimer() {
    if (interval.current == null) return;
    setTitle('Keep going!!');
    clearInterval(interval.current);
    interval.current = null;
    setisRunning(false);
  }
  function resetTimer() {
    setTitle('Ready to go another round ??!');
    clearInterval(interval.current);
    interval.current = null;
    setTimeLeft(10 * 60);
    setisRunning(false);
  }
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
