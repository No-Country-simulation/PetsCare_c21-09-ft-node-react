import { useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { NavBarMenu } from "../mockData/data";
import { CiSearch } from "react-icons/ci";
import { SiDatadog } from "react-icons/si";
// import { MdMenu } from "react-icons/md";
// import ResponsiveMenu from "./ResponsiveMenu";
import CajaSesion from "./CajaSesion";
import CajaAdmin from "./CajaAdmin";
import { useNavigate } from "react-router-dom"; 

const NavBar = () => {
  // const [open, setOpen] = useState(false);
  const { user, force } = useContext(AuthContext); // Usamos el contexto para usar el user verificando si esta autenticado el usuario

  const navigate = useNavigate(); 

  // Un use efect con la dependencia force. Ante un logout o inicio de sesion se refresca automaticamente el componente
  // se usa esto para mostrar o no los botones de inicio de sesion o de Caja Sesion
  useEffect(() => {}, [force]);

  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-8">
          
          <div className="text-2xl flex items-center gap-2 font-bold py-8 uppercase">
            <SiDatadog />
            <p>Cuidados</p>
            <p className="text-secondary">Peludos</p>
          </div>
          
          
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-primary ">
              {NavBarMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={item.link} className="inline-block py-1 px-3 transition duration-300 ease-in-out hover:text-secondary hover:scale-125 font-semibold">
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          
          <div className="flex items-center gap-4">
            <button className="text-2xl hover:bg-secondary hover:text-white rounded-full p-2 duration-300">
              <CiSearch />
            </button>

            <div className="flex gap-2">
              {/* Mostrar solo si no esta autenticado el usuario*/}
              {!user && (
                <>
                  <button
                    className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out px-6 py-2 hidden md:block"
                    onClick={() => navigate('/register')} 
                  >
                    Registrarse
                  </button>
                  <button
                    className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out px-6 py-2 hidden md:block"
                    onClick={() => navigate('/signin')} 
                  >
                    Iniciar Sesión
                  </button>
                </>
              )}
            </div>

            <div className="flex gap-2">
              <CajaAdmin />
            </div>

            <div className="flex gap-2">
              {/* Mostrar si el usuario está autenticado */}
              {user && (
                <CajaSesion />
              )}
            </div>
          </div>

          {/* Mobile hamburger Menu section */}
          {/* <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div> */}
        </div>
      </nav>

      {/* Mobile Sidebar section */}
      {/* <ResponsiveMenu open={open} /> */}
    </>
  );
};

export default NavBar;


