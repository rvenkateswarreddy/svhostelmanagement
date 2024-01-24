import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Menubar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ minHeight: "70px" }}>
      <Container className="justify-content-between">
        <Navbar.Brand as={NavLink} to="/" className="mr-auto fs-3">
          SVUHOSTEL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <NavLink
              to="/"
              style={{ fontSize: "18px", marginRight: "10px" }}
              className="nav-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              style={{ fontSize: "18px", marginRight: "10px" }}
              className="nav-link"
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              style={{ fontSize: "18px", marginRight: "10px" }}
              className="nav-link"
            >
              Contact
            </NavLink>
          </Nav>
          <Form className="d-flex" style={{ marginRight: "30px" }}>
            <FormControl type="text" placeholder="Search" className="mr-2" />
            <Button variant="outline-light" style={{ marginLeft: "5px" }}>
              Search
            </Button>
          </Form>
          <Nav className="ml-lg-2">
            <NavLink
              to="/login"
              style={{ fontSize: "18px", marginRight: "10px" }}
              className="nav-link"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              style={{ fontSize: "18px" }}
              className="nav-link"
            >
              Signup
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menubar;
