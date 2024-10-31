import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { NavBarMenu } from "../mockData/data";
import { SiDatadog } from "react-icons/si";
import CajaSesion from "./CajaSesion";
import CajaAdmin from "./CajaAdmin";
import { MdMenu, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Dog from "../assets/dog.png";

const NavBar = () => {
  const { user, force } = useContext(AuthContext);
  const [open, setOpen] = useState(false); //controlar el menú hamburguesa
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // submenú de Servicios

  const navigate = useNavigate();

  useEffect(() => {}, [force]);

  const handleMenuClick = (path) => {
    setOpen(false);
    setIsSubmenuOpen(false);
    navigate(path);
  };

  const mainMenuItems = NavBarMenu.filter((item) => !item.enumServicio);
  const subMenuItems = NavBarMenu.filter((item) => item.enumServicio);

  return (
    <>
      <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex lg:justify-between items-center py-4 px-6 lg:pl-0 pl-4 lg:px-16">
          {/* Logo */}
          <div
            className="lg:text-2xl flex items-center gap-2 font-bold uppercase md:text-base cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Dog} alt="Dog Logo" className="w-8 h-8 mr-1" />
            <p>Cuidados</p>
            <p className="text-secondary">Peludos</p>
          </div>

          {/* Botón hamburguesa */}
          <div className="lg:hidden pl-20 pt-2">
            <button
              onClick={() => setOpen(!open)}
              className="text-3xl focus:outline-none"
            >
              {open ? <MdClose /> : <MdMenu />}
            </button>
          </div>

          {/* visible en desktop y oculto en móviles */}
          <div className="hidden lg:flex items-center gap-6 text-primary h-10 ">
            <ul className="flex items-center gap-12 mr-72">
              {/* Renderiza elementos del menú principal */}
              {mainMenuItems.map((item) => (
                <li key={item.id}>
                  <a
                    onClick={() => handleMenuClick(item.link)}
                    className="inline-block py-1 px-3 transition duration-300 ease-in-out hover:text-secondary hover:scale-110 font-semibold cursor-pointer"
                  >
                    {item.title}
                  </a>
                </li>
              ))}

              {/* Menú desplegable de Servicios */}
              <li className="relative lg:-mr-[-100px]">
                <span
                  className="inline-block py-1 px-0 transition duration-300 ease-in-out hover:text-secondary hover:scale-110 font-semibold cursor-pointer"
                  onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                >
                  Servicios
                </span>
                {/* Submenú de Servicios */}
                {isSubmenuOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                    {subMenuItems.map((item) => (
                      <li key={item.id}>
                        <a
                          onClick={() => handleMenuClick(item.link)}
                          className="block px-4 py-2 text-primary hover:bg-secondary hover:text-white rounded transition duration-300 ease-in-out"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
           
              {/* Botones de autenticación solo si no está autenticado */}
              {!user && (
                <div className="flex gap-2 ">
                  <button
                    className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out w-40 h-10"
                    onClick={() => navigate("/register")}
                  >
                    Registrarse
                  </button>
                  <button
                    className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out w-40 h-10"
                    onClick={() => navigate("/signin")}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              )}

              {/* CajaAdmin y CajaSesion */}
              <div className="flex gap-2 ">
                <CajaAdmin />
              </div>
              {user && <CajaSesion />}
            </div>
          </div>
        

        {/* desplegable para móviles */}
        <div
          className={`${
            open ? "block" : "hidden"
          } lg:hidden bg-white shadow-lg`}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            {/* Renderiza el menú principal en móviles */}
            {mainMenuItems.map((item) => (
              <li key={item.id}>
                <a
                  onClick={() => handleMenuClick(item.link)}
                  className="inline-block py-1 px-3 transition duration-300 ease-in-out hover:text-secondary hover:scale-110 font-semibold cursor-pointer"
                >
                  {item.title}
                </a>
              </li>
            ))}

            {/* Menú desplegable de Servicios en móviles */}
            <li>
              <div className="flex flex-col items-center">
                <span
                  onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                  className="font-semibold cursor-pointer"
                >
                  Servicios
                </span>
                {isSubmenuOpen && (
                  <ul className="bg-white shadow-lg rounded-lg mt-2 w-full text-center">
                    {subMenuItems.map((item) => (
                      <li key={item.id}>
                        <a
                          onClick={() => handleMenuClick(item.link)}
                          className="block px-4 py-2 text-primary hover:bg-secondary hover:text-white rounded transition duration-300 ease-in-out"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>

            {/* Botones de autenticación y CajaAdmin/CajaSesion en móviles */}
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
