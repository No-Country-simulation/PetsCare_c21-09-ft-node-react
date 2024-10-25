import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/globalApi'; 

// import {jwtDecode} from 'jwt-decode';

export default function All10ServiciosRamdom() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  // Obtener el id del usuario desde el token
  const token = localStorage.getItem('token');

  // Función para obtener los servicios desde el back-end
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/servicios/allserviciosramdom`,
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

  }, []);

  console.log(servicios);

  // Si está cargando, mostrar mensaje de carga
  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  // Si ocurre un error, mostrar el mensaje de error
  if (error) {
    return <p>{error}</p>;
  }



//   Mock Data para que pruebes en base a lo que devuelve el back gaaton

const mockServicios = [
    {
      idServicio: 4,
      idUsuarioPrestador: 1,
      nombreServicio: "VETERINARIA",
      nombreComercio: "El cimarron",
      imagenServicio: "25a8cd20-76d1-4272-b034-05aa0d525504.jpeg",
      lugarFisico: true,
      voyAlLugar: false,
      observacion: "Atención veterinaria completa",
      pais: "Argentina",
      provincia: "Buenos Aires",
      estadoDepartamento: "CABA",
      direccionServicio: "Av. Corrientes 1234",
      direccionUsuario: "Av. Corrientes 1234",
      latitud: -34.603684,
      longitud: -58.381559,
      phone: "3405405315",
      email: "veterinaria.cimarron@gmail.com",
      name: "Mauro R",
      lastName: "Rosales",
      username: "Mauro C",
      turnosDisponiblesNoReservados: [
        { idTurno: 1, fechaTurno: "2024-10-30", horaTurno: "09:00" },
        { idTurno: 2, fechaTurno: "2024-10-30", horaTurno: "14:00" },
      ],
    },
    {
      idServicio: 5,
      idUsuarioPrestador: 2,
      nombreServicio: "PELUQUERIA CANINA",
      nombreComercio: "Pelos & Colitas",
      imagenServicio: "b1a9fd20-56d1-4372-b004-05aa0d517888.jpeg",
      lugarFisico: true,
      voyAlLugar: true,
      observacion: "Peluquería a domicilio para mascotas",
      pais: "Argentina",
      provincia: "Buenos Aires",
      estadoDepartamento: "CABA",
      direccionServicio: "Florida 500",
      direccionUsuario: "San Martín 900",
      latitud: -34.6023,
      longitud: -58.3772,
      phone: "3412345678",
      email: "peloscolitas@gmail.com",
      name: "Lucia G",
      lastName: "Fernandez",
      username: "LuciaF",
      turnosDisponiblesNoReservados: [
        { idTurno: 3, fechaTurno: "2024-11-01", horaTurno: "10:00" },
        { idTurno: 4, fechaTurno: "2024-11-01", horaTurno: "15:00" },
      ],
    },
    {
      idServicio: 6,
      idUsuarioPrestador: 3,
      nombreServicio: "GUARDERÍA CANINA",
      nombreComercio: "Patitas Felices",
      imagenServicio: "1234fd20-56d1-4372-b004-05aa0d517aaa.jpeg",
      lugarFisico: true,
      voyAlLugar: false,
      observacion: "Guardería de día para perros",
      pais: "Argentina",
      provincia: "Buenos Aires",
      estadoDepartamento: "CABA",
      direccionServicio: "Honduras 5700",
      direccionUsuario: "Honduras 5700",
      latitud: -34.5866,
      longitud: -58.4306,
      phone: "3412123456",
      email: "patitas.felices@gmail.com",
      name: "Carlos P",
      lastName: "Martínez",
      username: "CarlosM",
      turnosDisponiblesNoReservados: [
        { idTurno: 5, fechaTurno: "2024-11-03", horaTurno: "08:00" },
        { idTurno: 6, fechaTurno: "2024-11-03", horaTurno: "13:00" },
      ],
    },
  ];

  return (
    <>
    
    
    </>
  );
}

