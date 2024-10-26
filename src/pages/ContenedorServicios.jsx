import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiUrl } from '../js/globalApi'; 
import ServicesCard from '../components/ServicesCard';
import {jwtDecode} from 'jwt-decode'; // Importar correctamente jwt-decode

export default function ContenedorServicios({ titulo, enumNombreServicio }) {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mascotas, setMascotas] = useState([]); // Mascotas del usuario

  // Obtener el id del usuario desde el token
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const idUsuario = decodedToken.idUser;// Verifica cuál es el campo correcto

  // Función para obtener las mascotas del usuario
  const fetchMascotas = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/mascotas/usuario/${idUsuario}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setMascotas(response.data);
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
    }
  };

  // Función para obtener los servicios desde el back-end
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/servicios/enum/${enumNombreServicio}`,
          {headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }},
        );
        setServicios(response.data); // Almacena los servicios
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los servicios.');
        setLoading(false);
        console.error(error);
      }
    };

    fetchServicios();
    fetchMascotas();
  }, [enumNombreServicio]);

  // Si está cargando, mostrar mensaje de carga
  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  // Si ocurre un error, mostrar el mensaje de error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 bg-white shadow-md rounded-lg pt-40">
      <h1 className="text-3xl font-bold text-center mb-4">{titulo}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Encuentra el servicio ideal para tu mascota con total facilidad.
        </p>
        <p className="text-base text-gray-700 mb-4">
          Tenemos una amplia variedad de servicios de {titulo} que se ajustan a tus necesidades. Con nuestro sistema de reserva, solo tienes que seleccionar el día que prefieras y verificar la disponibilidad horaria.
        </p>
        <p className="text-base text-gray-700 mb-4">
          Al hacer clic en <span className="font-bold text-blue-500">Ver disponibilidad de turnos</span>, podrás ver un calendario donde podrás elegir la fecha que mejor te convenga. 
        </p>
        <p className="text-base text-gray-700 mb-4">
          ¡Así de fácil es garantizar el bienestar de tu mascota! Agenda tu cita en pocos pasos y asegúrate de que esté en las mejores manos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {servicios.length === 0 ? (
          <p>No hay servicios disponibles para esta categoría.</p>
        ) : (
          servicios.map((servicio) => (
            <ServicesCard key={servicio.idServicio} servicio={servicio} mascotas={mascotas} />
          ))
        )}
      </div>
    </div>
  );
}

ContenedorServicios.propTypes = {
  titulo: PropTypes.string.isRequired,
  enumNombreServicio: PropTypes.string.isRequired, 
};
