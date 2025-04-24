import './scanner.css';
import React, { useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Scanner = ({ onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [html5QrCode, setHtml5QrCode] = useState(null);

  // Function to start or stop the scanner based on the current state
  const toggleScanner = async () => {
    if (scanning) {
      // Stop the scanner if it's currently scanning
      await stopScanner();
    } else {
      // Start the scanner if it's not scanning
      await startScanner();
    }
  };

  // Function to start the scanner
  const startScanner = async () => {
    const qrCode = new Html5Qrcode("reader", { 
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.UPC_A,
      ] 
    });

    setHtml5QrCode(qrCode);
    setScanning(true);
    setResult(null);

    try {
      await qrCode.start(
        { facingMode: "environment" }, // Use rear camera for mobile
        {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 }
        },
        async (decodedText) => {
          // Stop scanning once decoded text is found
          await qrCode.stop();
          setScanning(false);
          setResult(decodedText);

          // Call function to fetch product details from Open Food Facts API
          fetchProductDetails(decodedText);
        },
        (errorMsg) => {
          // Handle scanning error (if any)
          console.warn("Scanning error", errorMsg);
        }
      );
    } catch (err) {
      console.error("Failed to start scanner:", err);
      setScanning(false);
    }
  };

  // Function to fetch product details from Open Food Facts API
  const fetchProductDetails = async (barcode) => {
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const product = response.data.product;

      if (product) {
        const name = product.product_name || "Unknown Product";
        const mfgDate = product.manufacture_date || "Unknown";
        const expDate = product.expiration_date || "Unknown";

        // You can add the product data to your list (FireStore, local state, etc.)
        console.log("Product:", name, "Manufacture Date:", mfgDate, "Expiry Date:", expDate);

        // Optionally pass this data back to parent (e.g., onScanSuccess)
        if (onScanSuccess) {
          onScanSuccess({ name, mfgDate, expDate });
        }
      } else {
        console.error("Product not found in the database.");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Function to stop the scanner
  const stopScanner = async () => {
    if (html5QrCode) {
      await html5QrCode.stop();
      setScanning(false);
      setHtml5QrCode(null);
      document.getElementById("reader").innerHTML = ""; // Cleanup
    }
  };

  return (
    <div className="text-center mt-4">
      {/* Single button for both start/stop functionality */}
      <Button onClick={toggleScanner} variant={scanning ? "danger" : "primary"} className="m-2">
        {scanning ? "Stop Scan" : "Start Scan"}
      </Button>

      {/* Scanner view */}
      <div id="reader" style={{ width: "300px", margin: "20px auto" }}></div>

      {/* Display the result after scanning */}
      {result && <Alert variant="success">Scanned: {result}</Alert>}
    </div>
  );
};

export default Scanner;
