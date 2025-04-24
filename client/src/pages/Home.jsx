import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import FoodList from "../components/FoodList";
import AddFoodForm from "../components/AddFoodForm";
// import Scanner from "../components/Scanner";

const Home = () => {
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Toggle scanner visibility
  const toggleScanner = () => setScanning(!scanning);

  // Handle successful scan
  const handleScanSuccess = (scannedCode) => {
    console.log("Scanned barcode:", scannedCode);
    // You can use this to fetch data or fill a form
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between border mb-4">
        <h2>Your Food List</h2>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <AddFoodForm />




      {/* Food List */}
      <FoodList />
    </Container>
  );
};

export default Home;
