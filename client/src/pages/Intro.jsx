import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Intro = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to FridgeMate</h1>
      <p>Track your food expiry and stay healthy!</p>
      <Link to="/auth">
        <Button variant="primary">Get Started</Button>
      </Link>
    </Container>
  );
};

export default Intro;
