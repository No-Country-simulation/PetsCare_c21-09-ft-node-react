import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { urlImage, apiUrl } from '../js/globalApi';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importar jwt-decode

export default function ServicesCard({ servicio, mascotas }) {
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
    turnosDisponiblesNoReservados
  } = servicio;

console.log(idUsuarioPrestador)

  const [showCalendar, setShowCalendar] = useState(false); // Controla la visibilidad del calendario
  const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada por el usuario
  const [turnosDisponibles, setTurnosDisponibles] = useState([]); // Turnos disponibles para la fecha seleccionada
  const [selectedTurnos, setSelectedTurnos] = useState([]); // Turnos seleccionados para reserva
  const [showModal, setShowModal] = useState(false); // Modal de selección de mascota
  const [showNoMascotasModal, setShowNoMascotasModal] = useState(false); // Modal para cuando no hay mascotas registradas
  const [selectedMascota, setSelectedMascota] = useState(null); // Mascota seleccionada para la reserva

  //  mostrar/ocultar el calendario
  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // manejar la selección de la fecha
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Filtrar turnos disponibles por la fecha seleccionada
    const turnosFiltrados = turnosDisponiblesNoReservados.filter(turno =>
      turno.fechaTurno === date.toISOString().split('T')[0]
    );

    setTurnosDisponibles(turnosFiltrados);
  };

  // Función para manejar la selección de un turno
  const handleTurnoSelect = (turnoId) => {
    setSelectedTurnos((prevSelected) =>
      prevSelected.includes(turnoId)
        ? prevSelected.filter(id => id !== turnoId) // Deseleccionar si ya está seleccionado
        : [...prevSelected, turnoId] // Agregar si no está seleccionado
    );
  };

  // Mostrar el modal para seleccionar la mascota o mensaje si no hay mascotas
  const handleReservar = () => {
    if (mascotas.length === 0) {
      setShowNoMascotasModal(true); // Mostrar modal si no hay mascotas registradas
    } else {
      setShowModal(true); // Mostrar modal de selección de mascotas si hay
    }
  };

  // Función para enviar la reserva
  const handleSubmitReserva = async () => {
    if (!selectedMascota || selectedTurnos.length === 0) {
      alert('Por favor selecciona una mascota y turnos para reservar.');
      return;
    }

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

    console.log('Datos de la reserva:', reservaDTO);


    try {
      const response = await axios.post(`${apiUrl}api/reserva/nueva`, reservaDTO, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Reserva realizada exitosamente');
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    }
  };

  // Formatear fecha en español sin desfase
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC', // Añadir zona horaria UTC para evitar desfase
    });
  };

  // Formatear la hora a "17:00 hs"
  const formatTime = (time) => {
    return time.substring(0, 5) + ' hs';
  };

  return (
    <div className="w-full lg:w-5/6 mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6">
      <img className="w-full h-56 object-cover" src={urlImage + imagenServicio} alt={nombreServicio} />
      <div className="p-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{nombreServicio}</h2>
        <p className="text-gray-700 mb-2"><strong>Comercio:</strong> {nombreComercio}</p>
        <p className="text-gray-600 mb-2"><strong>Pais:</strong> {pais}</p>
        <p className="text-gray-600 mb-2"><strong>Provincia:</strong> {provincia}</p>
        <p className="text-gray-600 mb-2"><strong>Departamento:</strong> {estadoDepartamento}</p>
        <p className="text-gray-600 mb-2"><strong>Lugar físico:</strong> {lugarFisico ? 'Sí' : 'No'}</p>
        <p className="text-gray-600 mb-2"><strong>Voy al lugar:</strong> {voyAlLugar ? 'Sí' : 'No'}</p>
        <p className="text-gray-700 mb-4">{observacion}</p>

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
                disabled={mascotas.length === 0} // Deshabilitar si no hay mascotas
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar cuando no hay mascotas registradas */}
      {showNoMascotasModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">No tienes mascotas registradas</h2>
            <p className="text-gray-700 mb-4">
              Los servicios de la plataforma están destinados a mascotas. 
              No puedes realizar una reserva si no tienes mascotas registradas.
            </p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowNoMascotasModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ServicesCard.propTypes = {
  servicio: PropTypes.shape({
    idUsuarioPrestador: PropTypes.number.isRequired,
    nombreServicio: PropTypes.string.isRequired,
    nombreComercio: PropTypes.string.isRequired,
    imagenServicio: PropTypes.string.isRequired,
    lugarFisico: PropTypes.bool.isRequired,
    voyAlLugar: PropTypes.bool.isRequired,
    observacion: PropTypes.string.isRequired,
    pais: PropTypes.string.isRequired,
    provincia: PropTypes.string.isRequired,
    estadoDepartamento: PropTypes.string.isRequired,
    turnosDisponiblesNoReservados: PropTypes.arrayOf(
      PropTypes.shape({
        idTurno: PropTypes.number.isRequired,
        fechaTurno: PropTypes.string.isRequired,
        horaTurno: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  mascotas: PropTypes.array.isRequired, // Recibiendo las mascotas desde props
};


