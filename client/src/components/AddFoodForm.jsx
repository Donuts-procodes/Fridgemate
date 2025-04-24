import React, { useState } from 'react';
import { firestore } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { Form, Button, Spinner } from 'react-bootstrap';

const AddFoodForm = () => {
  const [item, setItem] = useState({ name: '', mfg: '', exp: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for manufacture and expiry date
    if (new Date(item.mfg) > new Date(item.exp)) {
      toast.error('Expiry date cannot be earlier than manufacture date!');
      return;
    }

    setLoading(true);

    try {
      const uid = auth.currentUser.uid;
      await addDoc(collection(firestore, `users/${uid}/foods`), item);
      toast.success('Food added successfully!');
      setItem({ name: '', mfg: '', exp: '' });
    } catch (err) {
      toast.error('Error adding food: ' + err.message);
    } finally {
      setLoading(false);
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
      <Button type="submit" variant="success" disabled={loading}>
        {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Add Food'}
      </Button>
    </Form>
  );
};

export default AddFoodForm;
