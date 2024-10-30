import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/globalApi'; 
import ServicesCard from '../components/ServicesCard';
import { jwtDecode } from 'jwt-decode'; 
import LoadingSpinner from '../components/Loading';
import { useLocation } from 'react-router-dom';

export default function ServiciosPorUbicacion() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mascotas, setMascotas] = useState([]); 
  const [idUsuario, setIdUsuario] = useState(null); 
  const [tieneToken, setTieneToken] = useState(false);

  const token = localStorage.getItem('token');
  const location = useLocation();

  // Obtener latitud y longitud de los parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  const latitud = queryParams.get('latitud');
  const longitud = queryParams.get('longitud');

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
        console.warn("El usuario no está logueado o el ID de usuario no está disponible");
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

  // Función para obtener los servicios cercanos desde el back-end
  useEffect(() => {
    const fetchServicios = async () => {
      if (latitud && longitud) {
        try {
            const response = await axios.get(`${apiUrl}api/servicios/allserviciosramdom`,{

                // ESTE ES UN LLAMADO QUE SE PENSABA HACER, FALTA MODIFICAR APP SPRING BOOT PARA LA FUNCIONALIDAD
                // AHORA TRAE 10 SERVICIOS RAMDOM PARA PRUEBA 
        //   const response = await axios.get(`${apiUrl}api/servicios/search/${latitud}/${longitud}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          setServicios(response.data); 
          setLoading(false);
        } catch (error) {
          setError('Error al cargar los servicios.');
          setLoading(false);
          console.error(error);
        }
      }
    };

    fetchServicios();
  }, [latitud, longitud, token]);

  // Mostrar mensaje de carga
  if (loading) {
    return <LoadingSpinner size='md' color='blue' />;
  }

  // Si ocurre un error, mostrar el mensaje de error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
   (
  <div className="max-w-6xl mx-auto p-6 mt-12">
    <div className="bg-white shadow-lg rounded-lg p-8 mt-6 pt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Servicios cercanos a tu ubicación</h1>
      <p className="text-gray-600 mb-8">
        Descubre servicios disponibles en tu área. Basándonos en tu ubicación, te mostramos una selección de opciones cercanas
        para que puedas acceder a los servicios que necesitas con facilidad y rapidez. Explora la variedad de opciones de servicios
        que se ofrecen en tu zona y encuentra lo que estás buscando en un solo lugar.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
      {servicios.length === 0 ? (
        <p>No hay servicios cercanos disponibles.</p>
      ) : (
        servicios.map((servicio) => (
          <ServicesCard key={servicio.idServicio} servicio={servicio} mascotas={mascotas} tieneToken={tieneToken} />
        ))
      )}
    </div>
  </div>
);
    </>

  );
}
