import React, { useState, useEffect } from "react";
import "./Welcomeuser.css";

const Welcomeuser = ({ username, usertype }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein",
    },
    {
      text: "Success is not final, failure is not fatal: ",
      author: "Winston Churchill",
    },
    {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [quotes.length]);

  const currentQuote = quotes[quoteIndex];

  return (
    <div className="neumorphic-container">
      <p className="welcome-message1">
        Hello{" "}
        <span className="usernamecolor" style={{ color: "red" }}>
          {username}
        </span>
        , Welcome to{" "}
        {usertype === "user" ? "User Dashboard!" : "Admin Dashboard!"}
      </p>
      <p className="usercontent">
        This is your personalized space where you can manage your profile and
        explore various features.
      </p>
      <div className="quote-section">
        <blockquote>
          "{currentQuote.text}"<footer>- {currentQuote.author}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default Welcomeuser;
