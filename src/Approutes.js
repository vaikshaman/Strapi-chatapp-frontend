import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/pages/Welcomepage";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import ChatBox from "./components/pages/chat";
import Header from "./components/header/header";


const Appr = () => {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatBox />} />
      </Routes>
    </Router>
  );
};

export default Appr;
