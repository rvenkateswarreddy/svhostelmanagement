// WelcomeMessage.js
import React from "react";
import "./message.css";
const WelcomeMessage = (props) => {
  return <span className="welcome-message">Welcome,{props.username}!</span>;
};

export default WelcomeMessage;
