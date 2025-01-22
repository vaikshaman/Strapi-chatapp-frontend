import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/pages/Welcomepage";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import ChatBox from "./components/pages/chat";
import Header from "./components/header/header";
import Logout from "./components/pages/Logout";


const Appr = () => {
  return (
  
   
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
   
  );
};

export default Appr;
