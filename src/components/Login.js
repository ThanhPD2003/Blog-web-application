import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import "../style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create a request body with the email and password
    const requestBody = { email, password };

    try {
      const response = await fetch("http://localhost:9999/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const users = await response.json();

        // Find a user with the provided email and password
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
          // Store the user ID and email in sessionStorage
          sessionStorage.setItem("userId", user.id);
          sessionStorage.setItem("userEmail", user.email);

          // Call loginUser function from UserContext
          loginUser(user.email, user.id);

          // Redirect the user to the dashboard
          navigate("/");
        } else {
          setErrorMessage("Invalid email or password");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
      setErrorMessage("An error occurred during login");
    }
  };
 
  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="login-error">{errorMessage}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <label>Email:</label>
        <div className="login-input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <label>Password:</label>
        <div className="login-input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        
      </form>
      
    </div>
  );
};

export default Login;
