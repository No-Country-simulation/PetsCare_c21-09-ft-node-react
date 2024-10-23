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
import AuthUsuario from "./auth/AuthUsuario";
import AgregarServicio from "./pages/AgregarServicio";
import EditarServicio from "./pages/EditarServicio";
import AdminMascotas from "./pages/AdminMascotas";
import AgregarMascota from "./pages/AgregarMascota";
import MisTurnos from "./pages/MisTurnos";
import CargarTurno from "./components/CargarTurno";
import DosBotonesSeleccionPrestador from "./pages/DosBotonesSeleccionPrestador";

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
            <Route path="/agregar-servicio" element={<AuthPrestadorServicio><AgregarServicio/></AuthPrestadorServicio>} />

            <Route path="/admin-servicios" element={<AuthPrestadorServicio><AdminServicios/></AuthPrestadorServicio>} />
            <Route path="/editar-servicio/:idServicio" element={<AuthPrestadorServicio><EditarServicio/></AuthPrestadorServicio>} />
            <Route path="/seleccion-admin-turnos/:idServicio" element={<AuthPrestadorServicio><DosBotonesSeleccionPrestador/></AuthPrestadorServicio>} />
            <Route path="/cargar-turnos/:idServicio" element={<AuthPrestadorServicio><CargarTurno/></AuthPrestadorServicio>} />

            <Route path="/mis-turnos/:idServicio" element={<AuthPrestadorServicio><MisTurnos/></AuthPrestadorServicio>} />


{/* Usuario duenio mascotas */}
            <Route path="/admin-mascotas" element={<AuthUsuario><AdminMascotas/></AuthUsuario>} />
            <Route path="/agregar-mascota" element={<AuthUsuario><AgregarMascota/></AuthUsuario>} />

          </Routes>
         

     

        
          
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    
    </>

   
    
    
  );
};

export default App;
