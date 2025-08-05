import { useState, useEffect, useCallback } from 'react';

export function useTimer(initialTime = 0) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback((newTime) => {
    setIsRunning(false);
    setTimeLeft(newTime ?? initialTime);
  }, [initialTime]);

  return { timeLeft, isRunning, start, pause, reset, setTimeLeft };
}
