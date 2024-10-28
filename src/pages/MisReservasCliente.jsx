import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../js/globalApi';

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
      <></>
        // <div>
        //     <h2>Mis Reservas</h2>
        //     {reservas.length === 0 ? (
        //         <p>No tienes reservas realizadas.</p>
        //     ) : (
        //         reservas.map((reserva) => (
        //             <div key={reserva.idReserva}>
        //                 <p>Fecha: {reserva.fechaReserva}</p>
        //                 <p>Servicio: {reserva.getServicio().nombre}</p>
        //                 {/* Otros detalles de la reserva */}
        //             </div>
        //         ))
        //     )}
        // </div>
    );
};

export default MisReservasCliente;

