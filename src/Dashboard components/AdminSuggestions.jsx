import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminComplaints.css"; // Import the CSS file

const AdminSuggestions = () => {
  const [usersWithSuggestions, setUsersWithSuggestions] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://hostelmanagement-23j3.onrender.com/admindashboard/suggestions",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => setUsersWithSuggestions(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container3">
      <h2 className="heading">USER MADE SUGGESTIONS</h2>
      {usersWithSuggestions
        .filter((user) => user.suggestions.length > 0)
        .map((user, index) => (
          <div key={index} className="userContainer">
            <h3 className="userName">{user.fullname}</h3>
            <p className="userEmail">User: {user.email}</p>
            <ul className="suggestionList">
              {user.suggestions.map((suggestion, suggestionIndex) => (
                <li key={suggestionIndex} className="suggestionItem">
                  <p className="suggestionTitle">
                    <strong>Title:</strong> {suggestion.title}
                  </p>
                  <p className="suggestionDescription">
                    <strong>Description:</strong> {suggestion.description}
                  </p>
                  <p className="suggestionStatus">
                    <strong>Status:</strong> {suggestion.status}
                  </p>
                  <p className="suggestionId">
                    <strong>Suggestion ID:</strong> {suggestion._id}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default AdminSuggestions;
