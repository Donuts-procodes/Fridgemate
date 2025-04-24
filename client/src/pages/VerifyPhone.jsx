import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          // Recaptcha solved
        },
      },
      auth
    );
  };

  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setIsCodeSent(true);
      toast.success('Verification code sent!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await auth.signInWithCredential(credential);
      toast.success('Phone number verified!');
      navigate('/home'); // Redirect to home page after successful phone number verification
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Phone Number Verification</h2>
      {!isCodeSent ? (
        <form onSubmit={handlePhoneNumberSubmit} className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <div id="recaptcha-container"></div>
          <button type="submit" className="btn btn-primary mt-3">
            Send Verification Code
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerificationSubmit} className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary mt-3">
            Verify Phone Number
          </button>
        </form>
      )}
    </div>
  );
};

export default VerifyPhone;
