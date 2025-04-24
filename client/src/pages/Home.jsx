import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import FoodList from '../components/FoodList';
import AddFoodForm from '../components/AddFoodForm';
import Scanner from '../components/Scanner';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between">
        <h2>Your Food List</h2>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>
      <AddFoodForm />
      <Scanner />
      <FoodList />
    </Container>
  );
};

export default Home;
