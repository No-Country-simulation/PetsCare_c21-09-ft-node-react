import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import { div } from "framer-motion/client";

import LogProfile from "./components/logProfile";
import NavBar from "./components/NavBar";
import servicesProfile from "./components/servicesProfile";
import Footer from "./components/Footer";

function App() {
  
  

  return (
    <BrowserRouter>
      <div className="relative z-0">
        <div className="overflow-x-hidden">
          <NavBar />  
        </div>
        <LogProfile />
        <servicesProfile />

        <Footer />
      </div>

    </BrowserRouter>
   
    
    
  );
};

export default App;
