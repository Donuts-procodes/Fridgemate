import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
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
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved
          },
        },
        auth
      );
    }
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
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      toast.success('Phone number verified!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Phone Verification</h2>

            {!isCodeSent ? (
              <form onSubmit={handlePhoneNumberSubmit}>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div id="recaptcha-container"></div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Verification Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerificationSubmit}>
                <div className="mb-3">
                  <label htmlFor="code" className="form-label">Verification Code</label>
                  <input
                    type="text"
                    id="code"
                    className="form-control"
                    placeholder="Enter the code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Verify Phone Number
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
