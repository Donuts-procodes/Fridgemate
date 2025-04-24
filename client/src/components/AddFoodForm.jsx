import React, { useState } from 'react';
import { firestore } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';

const AddFoodForm = () => {
  const [item, setItem] = useState({ name: '', mfg: '', exp: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uid = auth.currentUser.uid;
      await addDoc(collection(firestore, `users/${uid}/foods`), item);
      toast.success("Food added!");
      setItem({ name: '', mfg: '', exp: '' });
    } catch (err) {
      toast.error("Error adding food: " + err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Food name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          type="date"
          placeholder="Manufacture Date"
          value={item.mfg}
          onChange={(e) => setItem({ ...item, mfg: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          type="date"
          placeholder="Expiry Date"
          value={item.exp}
          onChange={(e) => setItem({ ...item, exp: e.target.value })}
          required
        />
      </Form.Group>
      <Button type="submit" variant="success">Add Food</Button>
    </Form>
  );
};

export default AddFoodForm;
