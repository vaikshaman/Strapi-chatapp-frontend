// src/components/Header.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header/header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for the JWT in localStorage
    const jwt = localStorage.getItem("jwt");
    setIsLoggedIn(!!jwt); // Set true if jwt exists, false otherwise
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Clear JWT from localStorage
    setIsLoggedIn(false); // Update state to show the login button
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-content">
      <div className="content1">
        <h1>Real-Time Chat App</h1>
        <p className="subheading">Connect with friends and family instantly</p>
        </div>
        <div className="button-container">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
