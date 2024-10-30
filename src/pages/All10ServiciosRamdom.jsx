import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/globalApi'; 
import ServicesCard from '../components/ServicesCard';
import {jwtDecode} from 'jwt-decode'; 
import LoadingSpinner from '../components/Loading';

export default function All10ServiciosRamdom() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mascotas, setMascotas] = useState([]); 
  const [idUsuario, setIdUsuario] = useState(null); 
  const [tieneToken, setTieneToken] = useState(false);

  const token = localStorage.getItem('token');

  // Obtener el ID del usuario desde el token
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIdUsuario(decodedToken.idUser); // Guardar el ID del usuario en el estado
        setTieneToken(true);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setError("Error al decodificar el token. Por favor, inicia sesión.");
      }
    } else {
      console.warn("No se encontró token, no se puede obtener el ID del usuario");
    }
  }, [token]);

  // Obtener las mascotas del usuario
  useEffect(() => {
    const fetchMascotas = async () => {
      if (!token || !idUsuario) {
        console.warn("El usuario no está logueado o el ID de usuario no esta disponible");
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
      }
    };

    if (idUsuario) {
      fetchMascotas();
    }
  }, [idUsuario, token]); 

  // Función para obtener los servicios desde el back-end
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/servicios/allserviciosramdom`,
          // {headers: {
          //   'Content-Type': 'multipart/form-data',
          //   'Authorization': `Bearer ${token}`,
          // }},
        );
        setServicios(response.data); 
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los servicios.');
        setLoading(false);
        console.error(error);
      }
    };

    fetchServicios();
  }, [idUsuario]);

  // Si está cargando, mostrar mensaje de carga
  if (loading) {
    return <>
    <LoadingSpinner
    size = 'md'
    color = 'blue'
    />
    </>;
  }

  // Si ocurre un error, mostrar el mensaje de error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 bg-white shadow-md rounded-lg pt-40">
<div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
  <p className="text-lg font-semibold text-gray-800 mb-4">
    🐾 Encontra el servicio ideal para tu mascota con total facilidad.
  </p>
  <p className="text-base text-gray-700 mb-4">
    🐶 Tenemos una amplia variedad de servicios que se ajustan a tus necesidades. Con nuestro sistema de reservas, solo tienes que seleccionar el día que prefieras, verificar la disponibilidad horaria y hacer tu Reserva.
  </p>
  <p className="text-base text-gray-700 mb-4">
    🗓️ Al hacer clic en <span className="font-bold text-blue-500">Ver disponibilidad de turnos</span>, podrás ver un calendario donde elegir la fecha que mejor te convenga.
  </p>
  <p className="text-base text-gray-700 mb-4">
    💼 Agenda tu cita en pocos pasos y asegúrate de que tu mascota esté en las mejores manos.
  </p>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {servicios.length === 0 ? (
          <p>No hay servicios disponibles para esta categoría.</p>
        ) : (
          servicios.map((servicio) => (
<ServicesCard 
  key={servicio.idServicio} 
  servicio={servicio} 
  mascotas={Array.isArray(mascotas) ? mascotas : []} 
  tieneToken={tieneToken} 
/>          ))
        )}
      </div>
    </div>
  );
}

