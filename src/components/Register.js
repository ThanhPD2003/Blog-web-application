import React, { useState, useEffect } from 'react';
import '../style/Register.css';

const Register = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(true);
  const [role_id, setRole_id] = useState(2);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:9999/user')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleRegister = (e) => {
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
      id: users.length + 1,
      name,
      email,
      password,
      address,
      phone,
      status,
      role_id,
    };

    saveUserToDatabase(newUser)
      .then(() => {
        // Reset the form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Fetch users again to reflect the changes
        fetchUsers();

        alert('Registration successful!');
      })
      .catch((error) => {
        console.error('Error saving user:', error);
        alert('An error occurred while saving the user.');
      });
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

  const saveUserToDatabase = (newUser) => {
    return fetch('http://localhost:9999/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error saving user');
      }
    });
};

return (
  <div className="register-container">
    <h2>Register</h2>
    <form onSubmit={handleRegister}>
      <label>Email:</label>
      <div className="input-container">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <p className="error">{emailError}</p>}
      </div>
      <label>Password:</label>
      <div className="input-container">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
      <label>Confirm Password:</label>
      <div className="input-container">
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
