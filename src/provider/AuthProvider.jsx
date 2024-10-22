import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [force, setForce] = useState(false);

  useEffect(() => {
    // verificamos si hay un token en localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          // Si el token no ha expirado, establecemos el usuario
          setUser(decodedToken.sub);
        } else {
          // Si el token ha expirado, se quirta
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [force]); // Se ejecuta una vez al cargar y cada vez que cambie el estado 'force'

  const login = (nameuser) => {
    setUser(nameuser);
    setForce(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setForce(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, force }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


