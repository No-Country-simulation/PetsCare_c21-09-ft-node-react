import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import { div } from "framer-motion/client";
import logo from "./assets/logoPets.png";
import Banner from "./components/Banner";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  
  

  return (
    <BrowserRouter>
      <div className="relative z-0">
        <div className="overflow-x-hidden">
          <NavBar />  
        </div>
        <Banner />

        <Footer />
      </div>

    </BrowserRouter>
   
    
    
  );
};

export default App;
