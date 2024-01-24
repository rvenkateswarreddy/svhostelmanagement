import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Bill.css"; // Import your custom styles if needed

const BillGenerator = () => {
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    billAmount: "",
    description: "", // Added for extra description
  });

  const generateRandomReferenceId = () => {
    return Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric string
  };

  const generateBill = () => {
    const { name, phoneNumber, address, billAmount, description } = userData;
    const referenceId = generateRandomReferenceId();
    const pendingFees = 3000 - parseFloat(billAmount);

    const pdf = new jsPDF();

    // Set font styles
    pdf.setFont("Arial", "normal");
    pdf.setFontSize(14);

    // Draw red-colored, bold "Invoice" heading at the top
    pdf.setTextColor(255, 0, 0);
    pdf.setFont("Arial", "bold");
    pdf.setFontSize(24); // Increased font size to 24
    pdf.text("Invoice", 80, 20, { align: "center" });
    pdf.setFontSize(14); // Reset font size to 14 for the rest of the text
    pdf.setTextColor(0, 0, 0); // Reset text color

    // Draw headers on the left side
    pdf.text("SVU Hostel", 20, 30);
    pdf.text("Tirupati, India", 20, 40);
    pdf.text("Phone:94916 20082 ", 20, 50);

    // Draw customer details on the right side
    pdf.text("Customer Details", 120, 30);
    pdf.text(`Name: ${name}`, 120, 40);
    pdf.text(`Phone Number: ${phoneNumber}`, 120, 50);
    pdf.text(`Address: ${address}`, 120, 60);

    // Draw invoice details in table format
    pdf.text("Invoice Details", 20, 80);
    pdf.text("Description", 20, 90);
    pdf.text("Bill Amount", 100, 90);
    pdf.text(description, 20, 100);
    pdf.text(`$${billAmount}`, 100, 100);

    // Draw pending fees below the table on the right side
    pdf.text(`Pending Fees: $${pendingFees}`, 120, 150);

    // Draw a line below the table
    pdf.line(20, 120, 190, 120);

    // Draw customer details in single line with key-value pairs
    pdf.setFont("Arial", "bold");
    pdf.text("Customer Details:", 20, 160);
    pdf.setFont("Arial", "normal");
    pdf.text(
      `Name: ${name}, Phone Number: ${phoneNumber}, Address: ${address}`,
      20,
      170
    );

    // Save the PDF
    pdf.save("invoice.pdf");
    toast.success("Bill generated successfully!", {
      position: "top-left",
      autoClose: 3000, // Close the notification after 3000 milliseconds (3 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setUserData({
      name: "",
      phoneNumber: "",
      address: "",
      billAmount: "",
      description: "", // Added for extra description
    });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="bill-generator-container">
      <div className="bill-generator-form">
        <h2 className="text-center">Bill Generator</h2>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="billAmount">
            <Form.Label>Bill Amount:</Form.Label>
            <Form.Control
              type="text"
              name="billAmount"
              value={userData.billAmount}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Added an input field for extra description */}
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={userData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <Button
          type="button"
          onClick={generateBill}
          className="generate-button mt-2"
        >
          Generate Bill
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default BillGenerator;
