import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

const Intro = () => {
  return (
    <div
      className="bg-cover min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: "url('/background-image.jpg')", // we have to replace our currrent pic here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Navbar */}
      <Navbar bg="light" className="px-4 py-3 shadow-sm">
        <Navbar.Brand className="fw-bold text-primary fs-4">FridgeMate</Navbar.Brand>
        <Nav className="ms-auto">
          <Link to="/login" className="nav-link text-dark">Login</Link>
          <Link to="/register" className="nav-link text-dark">Register</Link>
        </Nav>
      </Navbar>

      {/* Intro Section */}
      <Container fluid className="flex-grow-1 d-flex align-items-center justify-content-center text-center px-3">
        <Row className="w-100 justify-content-center">
          <Col lg={8} className="bg-white bg-opacity-75 p-4 rounded shadow-lg">
            <h1 className="display-3 fw-bold text-success mb-3">Welcome to FridgeMate</h1>
            <p className="lead text-muted mb-4">
              Effortlessly track your food inventory and fight waste. Let FridgeMate be your smart kitchen companion.
            </p>
            <Link to="/auth">
              <Button variant="success" size="lg" className="px-4 py-2">
                🚀 Get Started
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
