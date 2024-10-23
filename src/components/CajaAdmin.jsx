import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import { AuthContext } from "../provider/AuthProvider";

export default function CajaAdmin() {

    const { force } = useContext(AuthContext);

  const [nombreRol, setNombreRol] = useState('');
  const [mostrarAdministracion, setMostrarAdministracion] = useState(false);
  const [redirect, setRedirect] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (userRole === 'PRESTADORSERVICIO') {
          setNombreRol("MIS SERVICIOS");
          setRedirect('/admin-servicios');
          setMostrarAdministracion(true);
        } else if (userRole === 'USUARIO') {
          setNombreRol("MIS MASCOTAS");
          setRedirect('/admin-mascotas');
          setMostrarAdministracion(true);
        } else {
          setMostrarAdministracion(false); // Usuario no autorizado
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        setMostrarAdministracion(false); // Si hay un error, nada
      }
    } else {
      setMostrarAdministracion(false); // Si no hay token. no mostrar nada
    }
  }, [navigate, force]);



  return (
    <>
    {mostrarAdministracion && (
      <div className="flex justify-end">
      <div className="inline-block">
        <span 
          onClick={() => navigate(redirect)}
          className="cursor-pointer font-bold text-black px-4 py-2 border border-gray-300 rounded-md bg-gray-100 mt-1 inline-block"
        >
          {nombreRol}
        </span>
      </div>
    </div>
      )}
    </>
  )
}
