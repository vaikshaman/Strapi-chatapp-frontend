import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Clear JWT
    alert("You have been logged out!");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="auth-container">
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Confirm Logout</button>
    </div>
  );
};

export default Logout;
