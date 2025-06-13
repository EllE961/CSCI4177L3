import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="bi bi-box-seam me-2"></i>
          ProdManager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <i className="bi bi-house-door me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              <i className="bi bi-grid me-1"></i>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              <i className="bi bi-envelope me-1"></i>
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              <i className="bi bi-person-plus me-1"></i>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation; 