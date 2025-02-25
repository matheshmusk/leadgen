import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Modified URL to use the new API endpoint
      const response = await axios.post('http://localhost:8080/api/login', {
        email: formData.email,
        password: formData.password
      });
  
      // Store JWT token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Redirect user after successful login
        navigate('/dashboard'); // Change '/dashboard' to your protected route
      } else {
        setError('Login failed: Invalid response');
      }
    } catch (err) {
      // Improved error handling
      if (err.response) {
        // Backend responded with an error
        setError(err.response.data.error || 'Login failed');
      } else if (err.request) {
        // No response from server
        setError('Server not reachable. Please try again later.');
      } else {
        // Something else went wrong
        setError('An unknown error occurred.');
      }
    }
  };
  
  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <div style={styles.links}>
        <Link to="/signup" style={styles.link}>Create Account</Link>
        <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  links: {
    marginTop: '20px',
  },
  link: {
    margin: '0 10px',
    color: '#007bff',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Login;
