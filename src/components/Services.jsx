import React from "react";
import "./Services.css"; // Import the CSS file for styling

const Services = () => {
  return (
    <div className="neumorphic-container">
      <h2>Hostel Services</h2>
      <p>
        Welcome to Sri Venkateswara University Hostel in Tirupati! We strive to
        provide the best services to make your stay comfortable and enjoyable.
      </p>

      <h3>Our Services Include:</h3>
      <ul>
        <li>
          <strong>Accommodation:</strong> Well-furnished rooms with modern
          amenities.
        </li>
        {/* ... (other services) */}
      </ul>

      <h3>How to Avail Services:</h3>
      <p>
        To avail any of the services, please contact the hostel administration
        or use the provided communication channels.
      </p>

      <h3>Contact Information:</h3>
      <p>
        For any inquiries or assistance, feel free to contact our hostel
        administration.
      </p>
      <address>
        Sri Venkateswara University Hostel, Tirupati,
        <br />
        Andhra Pradesh, India.
        <br />
        Phone: +9108345405345
        <br />
        Email: svhostel@gmail.com
      </address>
    </div>
  );
};

export default Services;
