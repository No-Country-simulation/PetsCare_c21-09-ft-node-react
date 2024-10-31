import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { urlImage, apiUrl } from '../js/globalApi';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';


export default function ServicesCard({ servicio, mascotas, tieneToken }) {
  const navigate = useNavigate();
  const {
    idUsuarioPrestador,
    nombreServicio,
    nombreComercio,
    imagenServicio,
    lugarFisico,
    voyAlLugar,
    observacion,
    pais,
    provincia,
    estadoDepartamento,
    direccionServicio, 
    pricehour,         
    latitud, 
    longitud,
    // name,              
    // lastName,          
    username,          
    email,             
    phone,             
    // direccionUsuario, 
    turnosDisponiblesNoReservados,
  } = servicio;
  

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [selectedTurnos, setSelectedTurnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNoMascotasModal, setShowNoMascotasModal] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [showMapModal, setShowMapModal] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);

  // open close de botones de modales

  const handleOpenModal = () => setShowModalDetails(true);
  const handleCloseModal = () => setShowModalDetails(false);
 

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const turnosFiltrados = turnosDisponiblesNoReservados.filter(
      (turno) => turno.fechaTurno === date.toISOString().split('T')[0]
    );

    setTurnosDisponibles(turnosFiltrados);
  };

  const handleTurnoSelect = (turnoId) => {
    setSelectedTurnos((prevSelected) =>
      prevSelected.includes(turnoId)
        ? prevSelected.filter((id) => id !== turnoId)
        : [...prevSelected, turnoId]
    );
  };

  const handleReservar = () => {
    if (!tieneToken) {
      setShowNoMascotasModal(true);
    } else if (mascotas.length === 0) {
      setShowNoMascotasModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleSubmitReserva = async () => {
    if (!selectedMascota || selectedTurnos.length === 0) {
      alert('Por favor selecciona una mascota y turnos para reservar.');
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const idUsuarioReserva = decodedToken.idUser;

    const reservaDTO = {
      idUsuarioQueReserva: idUsuarioReserva,
      idPrestadorServicio: idUsuarioPrestador,
      idMascota: selectedMascota,
      idTurnos: selectedTurnos,
      fechaReserva: selectedDate.toISOString().split('T')[0],
    };

    try {
      const response = await axios.post(`${apiUrl}api/reserva/nueva`, reservaDTO, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setShowModal(false); // Cerrar modal de selección de mascota
        setIsLoading(false); // Ocultar modal de carga
        setShowConfirmation(true); // Mostrar modal de confirmación

        //  ocultar el modal de confirmación y redirigir
        setTimeout(() => {
          setShowConfirmation(false);
          navigate('/misreservas-user'); // Redirigir a la página de "Mis Reservas"
        }, 3000);
      }
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };

  const formatTime = (time) => {
    return time.substring(0, 5) + ' hs';
  };

  return (
    <div className="w-full lg:w-5/6 mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6 border-4 border-secondary">
      <img className="w-full h-48 object-contain rounded-t-lg" src={urlImage + imagenServicio} alt={nombreServicio} />
      <div className="p-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">{nombreServicio}</h2>
        <p className="text-primary mb-2"><strong>Provincia:</strong> {provincia}</p>
        {/* <p className="text-gray-700 mb-2"><strong>Comercio:</strong> {nombreComercio}</p>
        <p className="text-gray-600 mb-2"><strong>Pais:</strong> {pais}</p>
        <p className="text-gray-600 mb-2"><strong>Provincia:</strong> {provincia}</p>
        <p className="text-gray-600 mb-2"><strong>Departamento:</strong> {estadoDepartamento}</p>
        <p className="text-gray-600 mb-2"><strong>Lugar físico:</strong> {lugarFisico ? 'Sí' : 'No'}</p> */}
        {/* <p className="text-gray-600 mb-2"><strong>Voy al lugar:</strong> {voyAlLugar ? 'Sí' : 'No'}</p> */}
        <p className="text-primary mb-4">{observacion}</p>

        <button
        className="bg-secondary hover:bg-white hover:text-secondary text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
        onClick={handleOpenModal}
      >
        Ver detalles del servicio
      </button>
        
        {/* boton mapa */}
        <button
  className="bg-secondary hover:bg-white text-white font-bold hover:text-secondary transition duration-300 ease-in-out rounded-lg mt-4 mb-4 pb-2 flex items-center pl-3 self-start"
  onClick={() => setShowMapModal(true)}
  style={{ width: '48px', height: '48px' }}
>
  <FaMapMarkerAlt size={20} className="mr-2" /> 
</button>



      {showModalDetails && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={handleCloseModal}
        aria-label="Cerrar modal"
      >
        <FaTimes size={20} />
      </button>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles del Servicio</h2>
      <div className="text-gray-700 space-y-2">
        <p><strong>Servicio:</strong> {nombreServicio}</p>
        <p><strong>Comercio:</strong> {nombreComercio}</p>
        <p><strong>País:</strong> {pais}</p>
        <p><strong>Provincia:</strong> {provincia}</p>
        <p><strong>Departamento:</strong> {estadoDepartamento}</p>
        <p><strong>Lugar físico:</strong> {lugarFisico ? 'Sí' : 'No'}</p>
        <p><strong>Dirección del Servicio:</strong> {direccionServicio}</p>
         <p className="text-gray-600 mb-2"><strong>Voy al lugar:</strong> {voyAlLugar ? 'Sí' : 'No'}</p>
        <p><strong>Precio por Hora:</strong> {pricehour}</p>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Información del Prestador</h3>
        {/* <p><strong>Nombre:</strong> {name} {lastName}</p> */}
        <p><strong>Nombre de Usuario:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Teléfono:</strong> {phone}</p>
        {/* <p><strong>Dirección del Prestador:</strong> {direccionUsuario}</p> */}
      </div>
    </div>
  </div>
)}



        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleShowCalendar}
        >
          {showCalendar ? 'Ocultar calendario' : 'Ver disponibilidad de turnos'}
        </button>

        {showCalendar && (
          <div className="mt-4 w-full flex flex-col items-center">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="w-full"
            />
            {turnosDisponibles.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Turnos disponibles:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {turnosDisponibles.map((turno, index) => (
                    <li key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedTurnos.includes(turno.idTurno)}
                        onChange={() => handleTurnoSelect(turno.idTurno)}
                      />
                      <span>
                        {formatDate(turno.fechaTurno)} - {formatTime(turno.horaTurno)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : selectedDate && (
              <p className="mt-4 text-gray-500">No hay turnos disponibles para esta fecha.</p>
            )}
          </div>
        )}



{showMapModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <button
        className="text-red-500 hover:text-red-700 font-bold text-lg mb-4"
        onClick={() => setShowMapModal(false)}
      >
        Cerrar
      </button>
      <div className="h-64 w-full">
        <MapContainer
          center={[latitud, longitud]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitud, longitud]} />
        </MapContainer>
      </div>
    </div>
  </div>
)}

        {selectedTurnos.length > 0 && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleReservar}
          >
            Agregar mascota y reservar Turno
          </button>
        )}
      </div>

      {/* Modal para seleccionar la mascota */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Selecciona tu mascota</h2>
            <ul>
              {mascotas.map((mascota) => (
                <li key={mascota.idPet} className="mb-2">
                  <label>
                    <input
                      type="radio"
                      value={mascota.idPet}
                      checked={selectedMascota === mascota.idPet}
                      onChange={() => setSelectedMascota(mascota.idPet)}
                    />
                    {mascota.name}
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmitReserva}
                disabled={mascotas.length === 0}
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de "No tienes mascotas registradas" o "No estás logueado" */}
      {showNoMascotasModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            {tieneToken ? (
              <>
                <h2 className="text-2xl font-bold text-red-600 mb-4">No tienes mascotas registradas</h2>
                <p className="text-gray-700 mb-4">
                  Los servicios de la plataforma están destinados a mascotas. 
                  No puedes realizar una reserva si no tienes mascotas registradas.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-600 mb-4">Usuario no logueado</h2>
                <p className="text-gray-700 mb-4">
                  Para poder reservar un turno, necesitas iniciar sesión.
                </p>
              </>
            )}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowNoMascotasModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de carga "Realizando Reserva de servicio" */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Realizando Reserva de servicio</h2>
            <p className="text-gray-700 mb-4">
              Aguarde la confirmación...
            </p>
          </div>
        </div>
      )}

      {/* Modal de confirmación de reserva exitosa */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Reserva Confirmada</h2>
            <p className="text-gray-700 mb-4">¡Reserva realizada con éxito!</p>
          </div>
        </div>
      )}
    </div>
  );
}

ServicesCard.propTypes = {
  servicio: PropTypes.object.isRequired,
  mascotas: PropTypes.array.isRequired,
  tieneToken: PropTypes.bool.isRequired,
};
