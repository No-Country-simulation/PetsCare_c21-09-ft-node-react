 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { AuthProvider } from "./provider/AuthProvider";


// import { div } from "framer-motion/client";
// import logo from "./assets/logoPets.png";
// import Banner from "./components/Banner";
// import NavBar from "./components/Navbar";
import Nav2 from "./components/Nav2";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import VerifyCode from "./components/VerifyCode";
import AdminServicios from "./pages/AdminServicios";
import AuthPrestadorServicio from "./auth/AuthPrestadorServicio";
import AgregarServicio from "./components/AgregarServicio";
import EditarServicio from "./pages/EditarServicio";

function App() {
  
  

  return (

    <>
        <BrowserRouter>
        <AuthProvider>
         
        <Nav2 />  
         
          <div    className="main-content"/>
         
          <Routes>
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/verify" element={<VerifyCode/>} />
            <Route path="/" element={<Home/>} />

            {/* Seccion de administracion Servicios*/}
            
            <Route path="/mis-servicios" element={<AuthPrestadorServicio><AdminServicios/></AuthPrestadorServicio>} />
            <Route path="/agregar-servicio" element={<AuthPrestadorServicio><AgregarServicio/></AuthPrestadorServicio>} />
            <Route path="/editar-servicio/:id" element={<AuthPrestadorServicio><EditarServicio/></AuthPrestadorServicio>} />

          </Routes>
         

     

        
          
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    
    </>

   
    
    
  );
};

export default App;
