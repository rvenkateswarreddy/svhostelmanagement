// Import necessary dependencies
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Import your custom styles if needed

const Signup = () => {
  const [formData, setFormData] = useState({
    usertype: "user", // Default to "user"
    secretkey: "",
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
    gender: "",
    permanentAddress: "",
    course: "",
    department: "",
    yearOfStudy: "",
    hostelblock: "", // New field
    roomno: "", // New field
    admissionNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Implement signup logic using axios
      await axios.post(
        "https://hostelmanagement-23j3.onrender.com/register",
        formData
      );

      // Display success message
      alert("registration successful");
      navigate("/login");
      // Redirect to login form using useHistory
    } catch (error) {
      console.error("Signup failed:", error);
      // You can handle errors and display an error message here
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="signup-container">
      <div className="signup-form">
        <h2 className="text-center">Signup</h2>
        <Form onSubmit={handleSignup}>
          <Form.Group controlId="usertype">
            <Form.Label className="label">User Type:</Form.Label>
            <Form.Control
              as="select"
              name="usertype"
              value={formData.usertype}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>

          {formData.usertype === "admin" && (
            <>
              <Form.Group controlId="secretkey" className="form-group">
                <Form.Label className="label">Secret Key:</Form.Label>
                <Form.Control
                  type="password"
                  name="secretkey"
                  value={formData.secretkey}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </Form.Group>
            </>
          )}
          <Form.Group controlId="fullname" className="form-group">
            <Form.Label className="label">Full Name:</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="input"
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="form-group">
            <Form.Label className="label">Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </Form.Group>

          <Form.Group controlId="mobile" className="form-group">
            <Form.Label className="label">Mobile:</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="input"
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="form-group">
            <Form.Label className="label">Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmpassword" className="form-group">
            <Form.Label className="label">Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              className="input"
              required
            />
          </Form.Group>

          {formData.usertype === "user" && (
            <>
              <Form.Group controlId="gender" className="form-group">
                <Form.Label className="label">Gender:</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="permanentAddress" className="form-group">
                <Form.Label className="label">Permanent Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </Form.Group>

              <Form.Group controlId="course" className="form-group">
                <Form.Label className="label">COURSE:</Form.Label>
                <Form.Control
                  as="select"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select Course</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                  <option value="MSC">MSC</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="department" className="form-group">
                <Form.Label className="label">DEPARTMENT</Form.Label>
                <Form.Control
                  as="select"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Management">Management</option>
                  <option value="MATHEMATICS">MATHEMATICS</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="hostelblock" className="form-group">
                <Form.Label className="label">Hostel Block:</Form.Label>
                <Form.Control
                  type="text"
                  name="hostelblock"
                  value={formData.hostelblock}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </Form.Group>

              <Form.Group controlId="roomno" className="form-group">
                <Form.Label className="label">Room Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="roomno"
                  value={formData.roomno}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </Form.Group>
              <Form.Group controlId="yearOfStudy" className="form-group">
                <Form.Label className="label">Year of Study:</Form.Label>
                <Form.Control
                  as="select"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select year of study</option>
                  <option value="2022">2021-2022</option>
                  <option value="2023">2022-2023</option>
                  <option value="2024">2023-2024</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="admissionNumber" className="form-group">
                <Form.Label className="label">Admission Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </Form.Group>
            </>
          )}

          <Button
            type="submit"
            className="submit-button neumorphic-button mt-2"
          >
            Signup
          </Button>
        </Form>
        <p className="text-center ">
          Already have an account?{" "}
          <Link to="/login" className="loginbtn">
            Login here
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Signup;
