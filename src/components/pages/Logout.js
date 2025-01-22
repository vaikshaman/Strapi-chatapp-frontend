// src/components/Logout.js
import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user token
    onLogout();
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
