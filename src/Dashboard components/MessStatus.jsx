// MessStatus.js
import React, { useState, useEffect } from "react";
import "./MessStatus.css";
import TimeDisplay from "./TimeDisplay";

const MessStatus = () => {
  const [messStatus, setMessStatus] = useState("");

  useEffect(() => {
    // Function to check the current time and set the mess status
    const checkMessStatus = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      // Define mess timing ranges
      const morningStart = 7 * 60 + 30; // 7:30 AM in minutes
      const morningEnd = 9 * 60; // 9:00 AM in minutes
      const afternoonStart = 12 * 60; // 12:00 PM in minutes
      const afternoonEnd = 13 * 60 + 30; // 1:30 PM in minutes
      const nightStart = 19 * 60 + 30; // 7:30 PM in minutes
      const nightEnd = 21 * 60; // 9:00 PM in minutes

      // Check the current time and set mess status
      if (
        (hours * 60 + minutes >= morningStart &&
          hours * 60 + minutes <= morningEnd) ||
        (hours * 60 + minutes >= afternoonStart &&
          hours * 60 + minutes <= afternoonEnd) ||
        (hours * 60 + minutes >= nightStart && hours * 60 + minutes <= nightEnd)
      ) {
        setMessStatus("Open");
      } else {
        setMessStatus("Closed");
      }
    };

    // Initial check
    checkMessStatus();

    // Update mess status every minute
    const intervalId = setInterval(checkMessStatus, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="status-container">
      <div>
        <TimeDisplay />
      </div>
      <h4>Mess Status: {messStatus}</h4>
      <p>
        {messStatus === "Open"
          ? "The mess is currently open. Enjoy your meal!"
          : "Sorry, the mess is currently closed. Please visit during the open hours."}
      </p>
      <div className={messStatus === "Open" ? "open-status" : "closed-status"}>
        <strong>Status: {messStatus}</strong>
      </div>
    </div>
  );
};

export default MessStatus;
