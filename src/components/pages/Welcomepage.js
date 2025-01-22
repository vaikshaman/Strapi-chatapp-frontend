import React from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "../../styles/welcome.css"

const WelcomePage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const goToRegister = () => {
    navigate("/register"); // Navigate to Register page
  };

  const goToLogin = () => {
    navigate("/login"); // Navigate to Login page
  };

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1>Welcome to the Strapi Chat App!</h1>
        <p>Connect, share, and collaborate with ease.</p>
        <div className="buttons">
          <button onClick={goToRegister} className="btn btn-register">Create Account</button>
          <button onClick={goToLogin} className="btn btn-login">Already have an account? Login</button>
        </div>
      </div>
      <div className="welcome-image">
        <img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*g_x1-5iYRn-SmdVucceiWw.png" alt="Welcome" />
      </div>
    </div>
  );
};

export default WelcomePage;
