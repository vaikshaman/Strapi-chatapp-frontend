// src/components/Header.js
import React from "react";
import "../header/header.css";

const Header = () => (
  <header className="header">
    <div className="header-content">
      <h1>Real-Time Chat App</h1>
      <p className="subheading">Connect with friends and family instantly</p>
      <div className="button-container">
        <button className="login-btn">Login</button>
        <button className="logout-btn">Logout</button>
      </div>
     
    </div>
  </header>
);

export default Header;
