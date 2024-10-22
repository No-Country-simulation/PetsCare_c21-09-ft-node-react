import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";
import { AuthContext } from "../provider/AuthProvider";
import { jwtDecode } from "jwt-decode"; 
import Modal from "../components/Modal";

export default function CajaSesion() {
  const navigate = useNavigate();
  const { user, logout, login } = useContext(AuthContext);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const handleLogoutClick = () => {
    logout();
  };

  const handleModalClose = () => {
    setSessionExpired(false);
    navigate("/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          logout();
        } else {
          const usernameFromStorage = localStorage.getItem("username");
          if (usernameFromStorage) {
            login(usernameFromStorage);
          } else {
            const usernameFromToken = decodedToken.sub;
            if (usernameFromToken) {
              login(usernameFromToken);
              localStorage.setItem("username", usernameFromToken);
            }
          }

          const timeUntilExpiration = decodedToken.exp * 1000 - Date.now();

          const timer = setTimeout(() => {
            logout();
            setSessionExpired(true);
            setForceUpdate((prev) => !prev);
          }, timeUntilExpiration);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.log(error)
        logout();
      }
    } else {
      logout();
    }
  }, [login, logout, forceUpdate]);

  return (
    <>
      <div className="cajaSesion flex items-center justify-end p-4">
        {user ? (
          <div className="cajaSesion__nombre flex items-center space-x-2">
            <span className="helloUser text-gray-700">
              {user}.
              <span>
                <IoMdLogOut
                  onClick={handleLogoutClick}
                  style={{width: "40px", height: "40px"}}
                  className="logoSesion text-xl cursor-pointer text-red-600 hover:text-red-800"
                />
              </span>
            </span>
          </div>
        ) : (
          <div>
            <Link to="/signin" aria-current="page">
              <VscAccount className="logoSesion text-xl text-gray-500 hover:text-gray-700" />
            </Link>
          </div>
        )}
      </div>

      {sessionExpired && (
        <Modal
          title="Sesión Expirada"
          message="Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
