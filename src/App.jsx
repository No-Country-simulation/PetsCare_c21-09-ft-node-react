// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './css/app.css';
// import Home from "./pages/Home";
// import NavBar from "./components/navbar";
// import Footer from "./components/footer";
// import LoginPopup from "./components/LoginPopup";

// function App() {

//   //const [showLogin, setShowLogin]=useState(false)

//   return (
//     <>
//       {/* {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>} */}
//        <>
//       <BrowserRouter>
//         <div className="overflow-x-hidden">
//           <NavBar />     
//         </div>          
//           <Routes>
//             <Route path="/" element={<Home/>} />       
//           </Routes>
//           <Footer/>  
//       </BrowserRouter>
//     </>
//     </>
//   )
// }

// export default App
// ---------
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/app.css';
import Home from "./pages/Home";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import LoginPopup from "./components/LoginPopup";

function App() {

  const [showLogin, setShowLogin]=useState(false)

  return (
    <>
      {/* {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>} */}
       <>
      <BrowserRouter>
        <div className="overflow-x-hidden">
           {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
          {/* <LoginPopup/> */}
          <NavBar setShowLogin={setShowLogin} />     
        </div>          
          <Routes>
            <Route path="/" element={<Home/>} />       
          </Routes>
          <Footer/>  
      </BrowserRouter>
    </>
    </>
  )
}

export default App
