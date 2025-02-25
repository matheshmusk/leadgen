import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Our App</h1>
      <div>
        <Link to="/Login"><button>Login</button></Link>
        <Link to="/signup"><button>Create Account</button></Link>
        <Link to="/forgot-password"><button>Forgot Password?</button></Link>
      </div>
    </div>
  );
};

export default LandingPage;