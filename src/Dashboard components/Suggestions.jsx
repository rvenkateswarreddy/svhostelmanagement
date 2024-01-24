import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Complaints.css"; // Import the CSS file
// Import the CSS file

const Suggestions = () => {
  const [suggestion, setSuggestion] = useState({
    title: "",
    description: "",
  });
  const [recentSuggestions, setRecentSuggestions] = useState([]);

  // Fetch recent suggestions when the component mounts
  useEffect(() => {
    axios
      .get(
        "https://hostelmanagement-23j3.onrender.com/dashboard/suggestions/recent",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => setRecentSuggestions(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    setSuggestion({
      ...suggestion,
      [e.target.name]: e.target.value,
    });
  };

  const submitSuggestion = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await axios.post(
        "https://hostelmanagement-23j3.onrender.com/dashboard/suggestions",
        suggestion,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );

      // Fetch recent suggestions again after submitting a new suggestion
      const response = await axios.get(
        "https://hostelmanagement-23j3.onrender.com/dashboard/suggestions/recent",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      setRecentSuggestions(response.data.data);

      // Clear the input fields
      setSuggestion({ title: "", description: "" });

      // Show success notification
      toast.success("Suggestion submitted successfully!");
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      alert("Error submitting suggestion");
    }
  };

  return (
    <div className="container">
      <div className="submitSuggestionSection">
        <h3 className="subHeading">Submit a Suggestion</h3>
        <form className="form" onSubmit={submitSuggestion}>
          <label className="label">Title:</label>
          <input
            type="text"
            name="title"
            value={suggestion.title}
            onChange={handleInputChange}
            className="input"
          />

          <label className="label">Description:</label>
          <textarea
            name="description"
            value={suggestion.description}
            onChange={handleInputChange}
            className="textarea"
          />

          <button type="submit" className="button">
            Submit Suggestion
          </button>
        </form>
      </div>

      <div className="suggestionsSection">
        <h3 className="subHeading">Recent Suggestions</h3>
        <div className="suggestionsList">
          {recentSuggestions.map((suggestion) => (
            <div key={suggestion._id} className="suggestionBox">
              <strong>Title:</strong> {suggestion.title}
              <br />
              <strong>Description:</strong> {suggestion.description}
            </div>
          ))}
        </div>
      </div>

      {/* Toastify container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Suggestions;
