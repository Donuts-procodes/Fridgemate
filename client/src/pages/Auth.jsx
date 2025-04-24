import React, { useState } from 'react';
import { auth, googleProvider, firebaseApp } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendPasswordResetEmail
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {},
        },
        auth
      );
    }
  };

  const handleSendOtp = () => {
    if (!phone) {
      toast.error('Enter your phone number');
      return;
    }
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setConfirmResult(confirmationResult);
        setOtpSent(true);
        toast.success('OTP sent to phone');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to send OTP');
      });
  };

  const handleVerifyOtp = () => {
    if (!otp || !confirmResult) {
      toast.error('Please enter OTP');
      return;
    }
    confirmResult.confirm(otp)
      .then(() => {
        toast.success('Phone verified successfully!');
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Invalid OTP');
      });
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Logged in!');
        if (!otpSent) handleSendOtp(); // Enforce phone verification
      })
      .catch((error) => {
        toast.error('Invalid email or password');
      });
  };

  const handleRegister = () => {
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Registered successfully');
        handleSendOtp(); // Require phone verification after signup
      })
      .catch((error) => {
        toast.error('Email already in use');
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success('Signed in with Google');
        handleSendOtp(); // Require phone verification
      })
      .catch((error) => {
        toast.error('Google sign-in failed');
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error('Enter your email');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => toast.success('Password reset email sent'))
      .catch(() => toast.error('Failed to send reset email'));
  };

  return (
    <div className="container mt-5">
      <h2>Login / Register</h2>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group mt-2">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
      </div>
      <div className="form-group mt-2">
        <label>Phone (with +country code)</label>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="form-control" />
      </div>

      {!otpSent ? (
        <>
          <button className="btn btn-primary mt-3" onClick={handleRegister}>Register</button>
          <button className="btn btn-success mt-3 mx-2" onClick={handleEmailLogin}>Login</button>
          <button className="btn btn-danger mt-3" onClick={handleGoogleSignIn}>Login with Google</button>
        </>
      ) : (
        <>
          <div className="form-group mt-3">
            <label>Enter OTP</label>
            <input type="text" value={otp} onChange={e => setOtp(e.target.value)} className="form-control" />
            <button className="btn btn-info mt-2" onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        </>
      )}

      <button className="btn btn-link mt-2" onClick={handleForgotPassword}>Forgot Password?</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Auth;
