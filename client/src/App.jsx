import './styles.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './styles.css';
import ForgotPassword from './pages/ForgotPassword';



// Pages
import Intro from './pages/Intro';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

const AppContent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="body text-center p-4">
      <Routes>
        <Route path="/" element={
          <>
            <Intro />
            {!user ? (
              <div className="mt-4">
                <button className="btn btn-primary m-2" onClick={() => navigate('/login')}>Login</button>
                <button className="btn btn-success m-2" onClick={() => navigate('/register')}>Register</button>
              </div>
            ) : (
              <div className="mt-4">
                <button className="btn btn-info" onClick={() => navigate('/home')}>Go to Home</button>
              </div>
            )}
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
