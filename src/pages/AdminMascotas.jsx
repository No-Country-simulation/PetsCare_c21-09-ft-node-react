import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { apiUrl } from '../js/globalApi';
import PetProfileCard from '../components/PetProfileCard';

const AdminMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.idUser;

        // Hacer la llamada a la API para obtener las mascotas del usuario
        axios.get(`${apiUrl}api/mascotas/usuario/${userId}`, 
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
                },
              }
        )
          .then(response => {
            setMascotas(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error al obtener las mascotas:', error);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  const handleAgregarServicio = () => {
    navigate('/agregar-mascota');
  };

  if (loading) {
    return <p>Cargando Mascotas...</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="flex justify-center text-2xl font-bold text-primaryColor mb-4">Mis Mascotas</h2>

      {mascotas.length === 0 ? (
      <div className="flex justify-center items-center py-10">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
        <h3 className="text-2xl font-bold text-primaryColor mb-4">¡Agrega tu primer Mascota!</h3>
        <p className="text-gray-600 mb-6">
          No tienes mascotas registradas aún..
          <span className="font-semibold"> Carga tu primer mascota </span> 
          y accede a servicios para ella.
        </p>
        <button
          className="w-full bg-main-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleAgregarServicio}
        >
          Agregar Mascota
        </button>
      </div>
    </div>
      ) : (
        <ul>
          {mascotas.map(mascotas => (
            <li key={mascotas.idPet} className="mb-2">
              <PetProfileCard
              pet={mascotas}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMascotas;

