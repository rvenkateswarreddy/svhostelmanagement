import React, { useEffect, useState } from "react";
import "./AllProfiles.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AllProfiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [editModalValues, setEditModalValues] = useState({});
  const [isModalFloating, setIsModalFloating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://hostelmanagement-23j3.onrender.com/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((er) => console.log(er));
  }, []);
  const filteredUsers = data.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTable = (userData, title) => (
    <div className="tablewholecontainer">
      <h2 style={{ marginTop: "10px" }}>{title}</h2>
      <div className="table-container">
        <table className="neumorphic-table">
          <thead>
            <tr>
              <th>User Type</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Course</th>
              <th>Department</th>
              <th>hostelblock</th>
              <th>roomno</th>
              <th>Year of Study</th>
              <th>Admission Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td>{user.usertype}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.gender || "N/A"}</td>
                <td>{user.permanentAddress || "N/A"}</td>
                <td>{user.course || "N/A"}</td>
                <td>{user.department || "N/A"}</td>
                <td>{user.hostelblock || "N/A"}</td>
                <td>{user.roomno || "N/A"}</td>
                <td>{user.yearOfStudy || "N/A"}</td>
                <td>{user.admissionNumber || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleEditProfile(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveProfile(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handleEditProfile = (user) => {
    setEditingUserId(user._id);
    setEditedUser(user);
    setEditModalValues({
      fullname: user.fullname || "",
      email: user.email || "",
      mobile: user.mobile || "",
      gender: user.gender || "",
      permanentAddress: user.permanentAddress || "",
      course: user.course || "",
      department: user.department || "",
      hostelblock: user.hostelblock || "",
      roomno: user.roomno || "",
      yearOfStudy: user.yearOfStudy || "",
      admissionNumber: user.admissionNumber || "",
    });
    setIsModalFloating(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `https://hostelmanagement-23j3.onrender.com/editprofile/${editingUserId}`,
        editModalValues,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((user) =>
            user._id === editingUserId ? { ...user, ...editModalValues } : user
          )
        );

        toast.success("Profile updated successfully"); // Show success message
        setEditingUserId(null);
        setEditedUser({});
        setEditModalValues({});
        setIsModalFloating(false);
      } else {
        toast.error("Error updating profile:", response.data.error);
      }
    } catch (error) {
      toast.error("Client error:", error.message);
    }
  };

  const handleRemoveProfile = async (userId) => {
    try {
      const response = await axios.delete(
        `https://hostelmanagement-23j3.onrender.com/removeprofile/${encodeURIComponent(
          userId
        )}`,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setData((prevData) => prevData.filter((user) => user._id !== userId));
        toast.success("Profile removed successfully"); // Show success message
      } else {
        toast.error("Error removing profile"); // Show error message
      }
    } catch (error) {
      toast.error("Error removing profile"); // Show error message
      console.error("Client error:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditModalValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const closeModal = () => {
    setEditingUserId(null);
    setEditedUser({});
    setEditModalValues({});
    setIsModalFloating(false);
  };

  return (
    <div>
      <div className="search-bar">
        <label>
          Search by Full Name:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      {isLoading ? ( // Render loading indicator if isLoading is true
        <div className="redloading">Loading...</div>
      ) : (
        renderTable(filteredUsers, "All Profiles")
      )}
      <ToastContainer />
      {/* Floating Edit Form */}
      {isModalFloating && (
        <div className="edit-modal floating">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <form className="layout">
              <label>
                Full Name:
                <input
                  type="text"
                  name="fullname"
                  value={editModalValues.fullname}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editModalValues.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Mobile:
                <input
                  type="tel"
                  name="mobile"
                  value={editModalValues.mobile}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Gender:
                <select
                  name="gender"
                  value={editModalValues.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              {/* Add other fields here */}
              <label>
                Permanent Address:
                <input
                  type="text"
                  name="permanentAddress"
                  value={editModalValues.permanentAddress}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Course:
                <input
                  type="text"
                  name="course"
                  value={editModalValues.course}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Department:
                <input
                  type="text"
                  name="department"
                  value={editModalValues.department}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Department:
                <input
                  type="text"
                  name="hostelblock"
                  value={editModalValues.hostelblock}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Department:
                <input
                  type="text"
                  name="roomno"
                  value={editModalValues.roomno}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Year of Study:
                <input
                  type="text"
                  name="yearOfStudy"
                  value={editModalValues.yearOfStudy}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Admission Number:
                <input
                  type="text"
                  name="admissionNumber"
                  value={editModalValues.admissionNumber}
                  onChange={handleInputChange}
                />
              </label>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProfiles;
