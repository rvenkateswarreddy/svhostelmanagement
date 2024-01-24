// TimeDisplay.js
import React, { useState, useEffect } from "react";
import "./TimeDisplay.css";
const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <span className="navbar-text text-danger">
      TIME:<span className="dangertime">{formattedTime}</span>{" "}
    </span>
  );
};

export default TimeDisplay;
