import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from './context/AuthContext';

export default function Header() {
  const { user, dispatch } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Research Database</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {user.isLoggedIn ? (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/add-form">
                  <Nav.Link>Add Form</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/journal">
                  <Nav.Link>Journal</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/conference">
                  <Nav.Link>Conference</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/bookChapters">
                  <Nav.Link>Book Chapters</Nav.Link>
                </LinkContainer>
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem('token');
                    dispatch({ type: "LOGOUT" });
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
