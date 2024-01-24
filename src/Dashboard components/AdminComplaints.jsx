// AdminComplaints.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminComplaints.css"; // Import the CSS file

const AdminComplaints = () => {
  const [usersWithComplaints, setUsersWithComplaints] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://hostelmanagement-23j3.onrender.com/admindashboard/complaints",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => setUsersWithComplaints(res.data.data))
      .catch((er) => console.log(er));
  }, []);

  return (
    <div className="container3">
      <h2 className="heading">USER MADE COMPLAINTS</h2>
      {usersWithComplaints
        .filter((user) => user.complaints.length > 0)
        .map((user, index) => (
          <div key={index} className="userContainer">
            <h3 className="userName">{user.fullname}</h3>
            <p className="userEmail">User: {user.email}</p>
            <ul className="complaintList">
              {user.complaints.map((complaint, complaintIndex) => (
                <li key={complaintIndex} className="complaintItem">
                  <p className="complaintTitle">
                    <strong>Title:</strong> {complaint.title}
                  </p>
                  <p className="complaintDescription">
                    <strong>Description:</strong> {complaint.description}
                  </p>
                  <p className="complaintStatus">
                    <strong>Status:</strong> {complaint.status}
                  </p>
                  <p className="complaintId">
                    <strong>Complaint ID:</strong> {complaint._id}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default AdminComplaints;
