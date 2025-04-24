import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.warn('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registration successful!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      toast.success('Registration successful!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Create an Account</h2>
            <form onSubmit={handleEmailRegister}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="form-text">Password must be at least 6 characters.</div>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <div className="text-center mt-3">
              <span>or</span>
            </div>
            <button onClick={handleGoogleRegister} className="btn btn-danger w-100 mt-2" disabled={loading}>
              {loading ? 'Registering...' : 'Register with Google'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
