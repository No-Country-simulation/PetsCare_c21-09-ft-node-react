import { useEffect, useState } from "react";
import BannerLogIn from "../components/BannerLogIn";
import ServiceCategories from "../components/ServiceCategories";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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
    <div className="container-home flex flex-col flex-grow min-h-screen">
      {/* Renderiza BannerLogIn solo si no está logueado */}
      {!isLoggedIn && <BannerLogIn />}

      
      <ServiceCategories />
    </div>
  );
}
