import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <form style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Reset Password
        </button>
      </form>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

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
};

export default ForgotPassword;