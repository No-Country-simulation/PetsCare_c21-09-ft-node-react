import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/Loading';
import PetProfileCard from "../components/PetProfileCard";
import {jwtDecode} from 'jwt-decode';
import { apiUrl } from '../js/globalApi';
import VistaEnlaceAdminUserPet from "../components/VistaEnlaceAdminUserPet";

const AdminMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [idUsuario, setIdUsuario] = useState(null);
 

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Obtener el ID del usuario desde el token 
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.idUser) {
          setIdUsuario(decodedToken.idUser); // Guardar el ID del usuario en el estado
         
        } else {
          console.warn("El token no contiene un ID de usuario.");
          setError("Token inválido, por favor inicia sesión.");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setError("Error al decodificar el token. Por favor, inicia sesión.");
      }
    } else {
      console.warn("No se encontró token en el almacenamiento local.");
      setError("No se encontró token. Por favor, inicia sesión.");
    }
  }, [token]);

  // Obtener las mascotas del usuario cuando idUsuario está disponible
  useEffect(() => {
    const fetchMascotas = async () => {
      if (!token || !idUsuario) {
        console.warn("El usuario no está logueado o el ID de usuario no está disponible.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}api/mascotas/usuario/${idUsuario}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setMascotas(response.data);
        
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        setError("Error al obtener las mascotas. Intente de nuevo más tarde.");
      } finally {
        setLoading(false); // Siempre dejar de cargar al finalizar
      }
    };

    if (idUsuario) {
      setLoading(true); // Mostrar cargando antes de iniciar la petición
      fetchMascotas();
    }
  }, [idUsuario, token]);

  if (loading) {
    return <>
        <LoadingSpinner
    size = 'md'
    color = 'blue'
    />
    </>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="flex justify-center text-2xl font-bold text-primaryColor mb-4">Mis Mascotas</h2>
      {mascotas.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
            <h3 className="text-2xl font-bold text-primaryColor mb-4">¡Agrega tu primer Mascota!</h3>
            <p className="text-gray-600 mb-6">
              No tienes mascotas registradas aún.
              <span className="font-semibold"> Carga tu primer mascota </span>
              y accede a servicios para ella.
            </p>
            <button
              className="w-full bg-main-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => navigate('/agregar-mascota')}
            >
              Agregar Mascota
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ul>
            {mascotas.map((mascota) => (
              <li key={mascota.idPet} className="mb-2">
                <PetProfileCard pet={mascota} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <VistaEnlaceAdminUserPet/>
    </div>
  );
};

export default AdminMascotas;



