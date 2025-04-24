import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { auth } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Button, ListGroup } from 'react-bootstrap';
import Scanner from './Scanner'; // Import the Scanner component

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [scanning, setScanning] = useState(false);

  // Fetch the user's food data from Firestore
  useEffect(() => {
    const uid = auth.currentUser.uid;
    const unsubscribe = onSnapshot(collection(firestore, `users/${uid}/foods`), (snapshot) => {
      setFoods(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  // Add the scanned food to Firestore
  const handleAddFood = async (productData) => {
    const uid = auth.currentUser.uid;
    try {
      await addDoc(collection(firestore, `users/${uid}/foods`), {
        name: productData.name || "Unknown Product", // Default if no name is found
        mfgDate: productData.mfgDate || "Unknown",   // Default if no manufacture date
        expDate: productData.expDate || "Unknown",   // Default if no expiration date
      });
      console.log("Food added successfully!");
    } catch (error) {
      console.error("Error adding food: ", error);
    }
  };

  // Handle deleting a food item from the list
  const handleDelete = async (id) => {
    const uid = auth.currentUser.uid;
    await deleteDoc(doc(firestore, `users/${uid}/foods/${id}`));
  };

  // Toggle scanner visibility
  const toggleScanner = () => setScanning(!scanning);

  return (
    <div>
      {/* One button to open/close the scanner */}
      <Button onClick={toggleScanner} variant="primary">
        {scanning ? "Close Scanner" : "Open Scanner"}
      </Button>

      {/* Show the Scanner only if scanning is true */}
      {scanning && <Scanner onScanSuccess={handleAddFood} />}

      <ListGroup className="mt-4">
        {foods.map(food => (
          <ListGroup.Item key={food.id} className="d-flex justify-content-between">
            {food.name} (Exp: {food.expDate})
            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(food.id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default FoodList;
