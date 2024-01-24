// Import necessary dependencies
import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import "./myprofile.css"; // Import your neumorphic styles

const Myprofile = ({ data }) => {
  // Destructure user data
  const {
    usertype,
    email,
    mobile,
    fullname,
    gender,
    permanentAddress,
    course,
    department,
    yearOfStudy,
    admissionNumber,
  } = data;

  return (
    <Container className="text-center">
      <div className="heading">My Profile</div>

      <Card className="neumorphic-card">
        <Card.Body>
          <Card.Title
            className={`font-weight-bold fullname ${
              gender === "male" ? "fullname-mr" : "fullname-mrs"
            }`}
          >
            {gender === "male" ? `Mr ${fullname}` : `Mrs ${fullname}`}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{usertype}</Card.Subtitle>

          <ListGroup className="list-unstyled profile-details-list">
            <ListGroup.Item>
              <strong>Email:</strong> {email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong> Mobile:</strong> {mobile}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong> Gender:</strong> {gender}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Permanent Address:</strong> {permanentAddress}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Course: </strong> {course}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Department:</strong> {department}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Year of Study:</strong> {yearOfStudy}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Admission Number:</strong> {admissionNumber}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Myprofile;
