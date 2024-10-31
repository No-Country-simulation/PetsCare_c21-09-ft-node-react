import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../js/globalApi';
import VerReservaCardClient from '../components/VerReservaCardClient';

const MisReservasCliente = () => {
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
                const response = await axios.get(apiUrl+`api/reserva/usuarioquereserva/${idUsuario}`,
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
            <h2 className="text-2xl font-bold text-center mb-6 pt-40">MIS RESERVAS</h2>
            {error && <p className="text-red-500">{error}</p>}
            {reservas.length === 0 ? (
                <p className="text-center text-gray-500">No tienes reservas realizadas.</p>
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

export default MisReservasCliente;

