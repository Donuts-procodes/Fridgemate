import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";
import { firestore, auth } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const Scanner = () => {
  const [productInfo, setProductInfo] = useState(null);

  const handleScanSuccess = async (scannedText) => {
    console.log("Scanned Text:", scannedText);
    toast.success(`Scanned: ${scannedText}`);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${scannedText}.json`
      );
      const data = await response.json();

      if (data.status === 1) {
        const product = data.product;
        setProductInfo(product);
        toast.success("Product found and details loaded!");
        const uid = auth.currentUser ? auth.currentUser.uid : "guest"; 
        const userCollection = collection(firestore, `users/${uid}/scannedCodes`);

        await addDoc(userCollection, {
          productName: product.product_name,
          brand: product.brands,
          ingredients: product.ingredients_text || "Not available",
          expirationDate: product.expiration_date || "Not available",
          barcode: scannedText,
          scannedAt: new Date().toISOString(),
        });

        toast.success("Product saved to Firebase!");
      } else {
        toast.error("Product not found in the database.");
      }
    } catch (err) {
      console.error("Error fetching product data:", err);
      toast.error("Failed to fetch product data.");
    }
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qrCodeRef",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(handleScanSuccess);

    return () => {
      scanner.clear().catch((e) => console.error("Clear error:", e));
    };
  }, []);

  return (
    <div className="text-center mt-4">
      <div id="qrCodeRef" />
      {productInfo && (
        <div>
          <h3>{productInfo.product_name}</h3>
          <p><strong>Brand:</strong> {productInfo.brands}</p>
          <p><strong>Ingredients:</strong> {productInfo.ingredients_text || "Not available"}</p>
          <p><strong>Expiration Date:</strong> {productInfo.expiration_date || "Not available"}</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
