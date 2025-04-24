import React, { useEffect, useState } from 'react';
import { firestore, auth } from './firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import sendEmail from './sendEmail'; // Import the sendEmail function
import { toast } from 'react-toastify';

const ExpiryChecker = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const unsubscribe = onSnapshot(collection(firestore, `users/${uid}/foods`), (snapshot) => {
      const foodsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setFoods(foodsData);

      // Check each food item's expiry date
      const today = new Date(); // Get today's date
      foodsData.forEach(food => {
        const expiryDate = new Date(food.exp); // Convert expiry date (string) to a Date object
        const timeDiff = expiryDate.getTime() - today.getTime();
        const daysToExpiry = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

        if (daysToExpiry <= 7 && daysToExpiry > 0) { // If expiry is within the next 7 days
          // Send email reminder via EmailJS
          sendEmail(auth.currentUser.displayName, food.name, food.exp, auth.currentUser.email);
          toast.info(`Alert: ${food.name} is nearing expiry!`);
        }
      });
    });

    return () => unsubscribe();
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div>
      <h2>Your Food Items</h2>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            {food.name} - Expiry Date: {food.exp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpiryChecker;
