import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [text, settext] = useState(false);
  const [auth, setauth] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    settext(true);
    setauth(false);

    try {
      const response = await axios.post(
        "https://hostelmanagement-23j3.onrender.com/login",
        formData
      );
      // console.log("Server Response:", response.data);

      const token = response.data.token;
      localStorage.setItem("token", token);

      // Check if the logged-in user is an admin
      const isAdmin = response.data.usertype;

      setauth(true);

      if (isAdmin == "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response && error.response.status === 401) {
        alert("Login failed. Please check your email and password.");
      } else {
        alert("Login failed. An error occurred.");
      }
    } finally {
      setauth(true);
      settext(false);
    }
  };

  return (
    <Container className="neumorphic-container1">
      <div className="neumorphic-form1">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="email" className="form-group">
            <Form.Label className="label">Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input neumorphic-input"
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
              className="input neumorphic-input"
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="submit-button mt-2 neumorphic-button"
          >
            {text ? "processing" : "LOGIN"}
          </Button>
        </Form>
        <p className="text-center mt-2">
          Don't have an account? <Link to="/register">Signup here</Link>.
        </p>
      </div>
    </Container>
  );
};

export default Login;
