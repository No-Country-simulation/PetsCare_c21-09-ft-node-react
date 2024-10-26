import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { NavBarMenu } from "../mockData/data";
import { SiDatadog } from "react-icons/si";
import CajaSesion from "./CajaSesion";
import CajaAdmin from "./CajaAdmin";
import { MdMenu, MdClose } from "react-icons/md"; // Iconos para abrir/cerrar el menú hamburguesa
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, force } = useContext(AuthContext);
  const [open, setOpen] = useState(false); // Estado para controlar el menú hamburguesa

  const navigate = useNavigate();

  useEffect(() => {}, [force]);

 
  const handleMenuClick = (path) => {
    setOpen(false);  // Cerrar el menú
    navigate(path);  // Redirigir a la ruta 
  };

  return (
    <>
      <nav className="bg-white shadow-lg fixed z-50">
        <div className="container flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <SiDatadog />
            <p>Cuidados</p>
            <p className="text-secondary">Peludos</p>
          </div>

          {/* Botón hamburg */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-3xl focus:outline-none"
            >
              {open ? <MdClose /> : <MdMenu />} {/* Cambia entre abrir y cerrar */}
            </button>
          </div>

          {/*visible en desktop y oculto en móviles */}
          <div className="hidden md:flex items-center gap-6 text-primary">
            <ul className="flex items-center gap-6">
              {NavBarMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="inline-block py-1 px-3 transition duration-300 ease-in-out hover:text-secondary hover:scale-125 font-semibold"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>

            {/* Botones de autenticación solo si no está autenticado */}
            {!user && (
              <div className="flex gap-2">
                <button
                  className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out px-6 py-2 w-32 h-16"
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </button>
                <button
                  className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out px-6 py-2 w-32 h-16"
                  onClick={() => navigate("/signin")}
                >
                  Iniciar Sesión
                </button>
              </div>
            )}

            {/* CajaAdmin y CajaSesion */}
            <div className="flex gap-2">
              <CajaAdmin />
            </div>
            {user && <CajaSesion />}
          </div>
        </div>

        {/* desplegable para móviles */}
        <div
          className={`${
            open ? "block" : "hidden"
          } md:hidden bg-white shadow-lg`}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            {NavBarMenu.map((item) => (
              <li key={item.id}>
                <a
                  onClick={() => handleMenuClick(item.link)} 
                  className="inline-block py-1 px-3 transition duration-300 ease-in-out hover:text-secondary hover:scale-110 font-semibold cursor-pointer"
                >
                  {item.title}
                </a>
              </li>
            ))}

           
            {!user && (
              <div className="flex flex-col gap-4">
                <button
                  className="rounded-lg border-2 bg-white text-secondary border-secondary transition duration-300 ease-in-out px-6 py-2"
                  onClick={() => handleMenuClick("/register")} 
                >
                  Registrarse
                </button>
                <button
                  className="rounded-lg border-2 bg-white text-secondary border-secondary transition duration-300 ease-in-out px-6 py-2"
                  onClick={() => handleMenuClick("/signin")} 
                >
                  Iniciar Sesión
                </button>
              </div>
            )}

            {/* CajaAdmin y CajaSesion en móviles */}
            <div className="flex gap-2 pt-4">
              <CajaAdmin />
            </div>
            {user && <CajaSesion />}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
