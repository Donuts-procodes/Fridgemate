import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'; // Firebase Authentication
import { auth } from './firebaseConfig'; // Assuming you have firebaseConfig.js set up

// Importing components for different pages
import Intro from './pages/Intro';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyPhone from './pages/VerifyPhone';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);

  // Listen for authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user if logged in
      } else {
        setUser(null); // Reset user if logged out
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              {!user ? (
                <>
                  <li>
                    <Link to="/">Intro</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/home">Home</Link>
                </li>
              )}
            </ul>
          </nav>

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-phone" element={<VerifyPhone />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={user ? <Home /> : <Login />}
            />
          </Routes>

          {/* Toast Notifications */}
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
