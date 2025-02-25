import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation check
    if (!formData.name || !formData.email || !formData.phone || !formData.dob || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Modified URL to use the new API endpoint
      const response = await axios.post('http://localhost:8080/api/signup', formData);
      console.log(response.data);  // Success message
      setError('');  // Reset the error message
      navigate('/'); // Redirect to login page after successful signup
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h2>Create Account</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          style={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />
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
          type="tel"
          name="phone"
          placeholder="Phone Number"
          style={styles.input}
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          style={styles.input}
          value={formData.dob}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          style={styles.input}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>
          Create Account
        </button>
      </form>
      <div style={styles.links}>
        Already have an account? <Link to="/" style={styles.link}>Login</Link>
      </div>
    </div>
  );
};

// Styles (add/modify as needed)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  links: {
    marginTop: '1rem',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    marginLeft: '0.5rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  }
};

export default Signup;
