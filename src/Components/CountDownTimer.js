import React, { useEffect, useState } from "react";

const CountDownTimer = ({ initialTime, isRunning, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // in seconds

  // Reset when initialTime changes
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  // Countdown logic
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let newTime = prevTime - 1;

        if (newTime <= 0) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div>
      <h2>{formatTime(timeLeft)}</h2>
    </div>
  );
};

export { CountDownTimer };
