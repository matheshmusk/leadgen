import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Page (Login) */}
        <Route path="/" element={<Login />} />

        {/* Create Account Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Forgot Password Page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;