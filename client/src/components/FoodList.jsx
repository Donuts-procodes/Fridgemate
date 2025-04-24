import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { auth } from '../firebaseConfig';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Button, ListGroup } from 'react-bootstrap';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const unsubscribe = onSnapshot(collection(firestore, `users/${uid}/foods`), (snapshot) => {
      setFoods(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const uid = auth.currentUser.uid;
    await deleteDoc(doc(firestore, `users/${uid}/foods/${id}`));
  };

  return (
    <ListGroup className="mt-4">
      {foods.map(food => (
        <ListGroup.Item key={food.id} className="d-flex justify-content-between">
          {food.name} (Exp: {food.exp})
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(food.id)}>
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default FoodList;
