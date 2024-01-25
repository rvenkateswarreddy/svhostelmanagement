import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css"; // Import the CSS file for styling

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic here to handle form submission, e.g., send an email
    console.log("Form submitted:", formData);

    // Display a success toast notification
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns, feel free to reach out to us. We
        will get back to you as soon as possible.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <p className="contact-gmail">
        For urgent matters, you can also contact us via email at{" "}
        <a href="mailto:rvenkateswarreddy@gmail.com">your-email@gmail.com</a>.
      </p>
      <ToastContainer />
    </div>
  );
};

export default Contact;
