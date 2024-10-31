import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../js/globalApi';
import VerReservaCardClient from '../components/VerReservaCardClient';

const TusReservasPrestador = () => {
  const navigate = useNavigate();

    const [reservas, setReservas] = useState([]);
    const [error, setError]= useState('');
    const [idUsuario, setIdUsuario] = useState(null); 


  const token = localStorage.getItem('token');

  // Obtener el ID del usuario desde el token
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIdUsuario(decodedToken.idUser); // Guardar el ID del usuario en el estado
      
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setError("Error al decodificar el token. Por favor, inicia sesión.");
        navigate("signin");
      }
    } else {
      console.warn("No se encontró token, no se puede obtener el ID del usuario");
    }
  }, [token]);



    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(apiUrl+`api/reserva/usuarioqueprestaservicio/${idUsuario}`,
                  {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  }},
                );
                console.log("Las reservas traídas:", response.data);
                setReservas(response.data);
              
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
                setError("Error al obtener las reservas realizadas")
            }
        };

        if (idUsuario) {
          fetchReservas();
        }
        
    }, [idUsuario, token]);

    return (
      <>
         <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-6 pt-40">Estos son las Reservas de tu Servicio</h2>
            {error && <p className="text-red-500">{error}</p>}
            {reservas.length === 0 ? (
                <div className="text-center text-gray-700 bg-gray-100 p-6 rounded-lg shadow-md">
  <p className="text-lg font-semibold mb-4">
    Aún no tienes reservas en tu servicio.
  </p>
  <p className="text-gray-600 mb-6">
    ¡Invita a tus clientes a reservar cargando nuevos turnos y mantente atento para brindar el mejor servicio a nuestra comunidad!
  </p>
  <button
    onClick={() => navigate("/admin-servicios")}
    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    Administracion de Servicio
  </button>
</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reservas.map((reserva) => (
                  <VerReservaCardClient key={reserva.idReserva} reserva={reserva} 
                  className="h-full"
                  />
              ))}
          </div>
            )}
        </div>
        </>
    );
};

export default TusReservasPrestador;

