import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { apiUrl } from '../js/globalApi';
import CardAdminServicioPrestador from '../components/CardAdminServicioPrestador';

const AdminServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = parseInt(decodedToken.idUser);

        // Hacer la llamada a la API para obtener los servicios del usuario
        axios.get(`${apiUrl}api/servicios/usuario/${userId}`)
          .then(response => {
            setServicios(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error al obtener servicios:', error);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  const handleAgregarServicio = () => {
    navigate('/agregar-servicio');
  };

  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="flex justify-center text-2xl font-bold text-primaryColor mb-4">Mis Servicios</h2>

      {servicios.length === 0 ? (
      <div className="flex justify-center items-center py-10">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
        <h3 className="text-2xl font-bold text-primaryColor mb-4">¡Es momento de destacar!</h3>
        <p className="text-gray-600 mb-6">
          No tienes servicios registrados aún, pero nunca es tarde para empezar.
          <span className="font-semibold"> Carga tu primer servicio </span> 
          y permite que otros conozcan lo que tienes para ofrecer.
        </p>
        <button
          className="w-full bg-main-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleAgregarServicio}
        >
          Agregar Servicio
        </button>
      </div>
    </div>
      ) : (
        <ul>
          {servicios.map(servicio => (
            <li key={servicio.idServicio} className="mb-2">
              <CardAdminServicioPrestador
              servicio={servicio}
              
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminServicios;
