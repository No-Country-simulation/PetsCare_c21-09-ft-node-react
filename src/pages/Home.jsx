import { useEffect, useState } from "react";
import BannerLogIn from "../components/BannerLogIn";
import ServiceCategories from "../components/ServiceCategories";
import All10ServiciosRamdom from "./All10ServiciosRamdom";
import UserSideMenu from "../components/UserSideMenu";


export default function Home() {
<<<<<<< HEAD
  return (
    <>
        <div className="container-home">
         
         <BannerLogIn />
         <ServiceCategories />
        </div>
=======
  const [isLoggedIn, setIsLoggedIn] = useState(false);
>>>>>>> 481660659b70fabb9eb428fb91bbb5f250e34e8b


  // Si no hay token se renderiza el componente BannerLogin
  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="flex flex-col flex-grow min-h-screen">
      {/* Renderiza BannerLogIn solo si no está logueado */}
      {!isLoggedIn && <BannerLogIn />}

      
      <ServiceCategories />

      <All10ServiciosRamdom/>

      <UserSideMenu/>
     
    </div>
  );
}
