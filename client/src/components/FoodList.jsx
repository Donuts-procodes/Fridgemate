import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { auth } from '../firebaseConfig';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { format } from 'date-fns';  // Using date-fns to format expiry date

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const unsubscribe = onSnapshot(collection(firestore, `users/${uid}/foods`), 
      (snapshot) => {
        setFoods(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setLoading(false);  // Stop loading when data is fetched
      }, 
      (error) => {
        setError('Error fetching food data');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      const uid = auth.currentUser.uid;
      await deleteDoc(doc(firestore, `users/${uid}/foods/${id}`));
      setFoods(foods.filter(food => food.id !== id));  // Remove item locally
    } catch (error) {
      setError('Error deleting food item');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup className="mt-4">
        {foods.map(food => (
          <ListGroup.Item key={food.id} className="d-flex justify-content-between">
            <span>{food.name} (Exp: {format(new Date(food.exp), 'MMM dd, yyyy')})</span>
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
