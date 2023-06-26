import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!email || !password || password !== confirmPassword) {
      setConfirmPasswordError('Make sure the passwords match.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must contain at least 8 characters, including at least one capital letter and a number.'
      );
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Create a new user object
    const newUser = {
      email,
      password,
    };

    try {
      // Save the new user to the database
      await saveUserToDatabase(newUser);

      // Reset the form
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      alert('Registration successful!');
    } catch (error) {
      console.error('Error saving user:', error);
      alert('An error occurred while saving the user.');
    }
  };

  const validatePassword = (password) => {
    // Use a regular expression to validate the password format
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const saveUserToDatabase = async (user) => {
    try {
      // Send an HTTP POST request to save the user to the database
      await axios.post('/api/users', user);
    } catch (error) {
      throw new Error('Failed to save user to the database.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <div className="input-container">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {confirmPasswordError && (
            <p className="error">{confirmPasswordError}</p>
          )}
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
