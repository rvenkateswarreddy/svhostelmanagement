import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Complaints.css"; // Import the CSS file

const Complaints = () => {
  const [complaint, setComplaint] = useState({
    title: "",
    description: "",
  });
  const [recentComplaints, setRecentComplaints] = useState([]);

  // Fetch recent complaints when the component mounts
  useEffect(() => {
    axios
      .get(
        "https://hostelmanagement-23j3.onrender.com/dashboard/complaints/recent",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => setRecentComplaints(res.data.data))
      .catch((er) => console.log(er));
  }, []);

  const handleInputChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  const submitComplaint = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await axios.post(
        "https://hostelmanagement-23j3.onrender.com/dashboard/complaints",
        complaint,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );

      // Fetch recent complaints again after submitting a new complaint
      const response = await axios.get(
        "https://hostelmanagement-23j3.onrender.com/dashboard/complaints/recent",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      setRecentComplaints(response.data.data);

      // Clear the input fields
      setComplaint({ title: "", description: "" });

      // Show success notification
      toast.success("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="container">
      <div className="submitComplaintSection">
        <h3 className="subHeading">Submit a Complaint</h3>
        <form className="form" onSubmit={submitComplaint}>
          <label className="label">Title:</label>
          <input
            type="text"
            name="title"
            value={complaint.title}
            onChange={handleInputChange}
            className="input"
          />

          <label className="label">Description:</label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleInputChange}
            className="textarea"
          />

          <button type="submit" className="button">
            Submit Complaint
          </button>
        </form>
      </div>

      <div className="complaintsSection">
        <h3 className="subHeading">Recent Complaints</h3>
        <div className="complaintsList">
          {recentComplaints.map((complaint) => (
            <div key={complaint._id} className="complaintBox">
              <strong>Title:</strong> {complaint.title}
              <br />
              <strong>Description:</strong> {complaint.description}
            </div>
          ))}
        </div>
      </div>

      {/* Toastify container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Complaints;
