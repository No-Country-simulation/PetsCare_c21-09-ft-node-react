import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import { div } from "framer-motion/client";

import LogProfile from "./components/logProfile";
import NavBar from "./components/navbar";
import servicesProfile from "./components/servicesProfile";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import './css/app.css';
import LoginPopup from "./components/LoginPopup";

function App() {
  
  const [showLogin, setShowLogin]=useState(false)

  return (
    <BrowserRouter>
    <div className="overflow-x-hidden"></div>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}

      <div className="relative z-0">
        <div className="overflow-x-hidden">
          {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
          <NavBar setShowLogin={setShowLogin} />  
        </div>
        <LogProfile />
        <servicesProfile />

        <Footer />
      </div>

    </BrowserRouter>
   
    
    
  );
};

export default App;
