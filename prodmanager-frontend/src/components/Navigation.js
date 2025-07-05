import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../utils/api';

function Navigation() {
  const isLoggedIn = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="white" variant="light" expand="lg" sticky="top" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo-nav">
          <span className="logo-icon-nav">P</span>
          <span className="brand-text-nav">ProdManager</span>
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
            
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <i className="bi bi-person-plus me-1"></i>
                  Register
                </Nav.Link>
              </>
            ) : (
              <NavDropdown 
                title={
                  <>
                    <i className="bi bi-person-circle me-1"></i>
                    {user?.name || 'User'}
                  </>
                } 
                id="user-nav-dropdown"
              >
                <NavDropdown.Item>
                  <i className="bi bi-person me-2"></i>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </NavDropdown.Item>
                {user?.role === 'admin' && (
                  <NavDropdown.Item>
                    <i className="bi bi-shield-check me-2"></i>
                    Admin Panel
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation; 