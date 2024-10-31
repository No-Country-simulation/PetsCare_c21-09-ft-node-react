import PropTypes from 'prop-types';
import { useState } from 'react';

const VerReservaCardClient = ({ reserva }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCancelClick = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto border border-gray-200 relative">
      {/* Información de la reserva */}
      <p className="text-gray-500 mb-4">
        <span className="font-semibold text-gray-700">Fecha de la Reserva:</span> {reserva.fechaReserva}
      </p>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-blue-600">Información del Usuario que Reservó:</h4>
        <p><span className="font-medium text-gray-600">Nombre:</span> {reserva.usuarioNombreReserva} {reserva.usuarioApellidoReserva}</p>
        <p><span className="font-medium text-gray-600">Email:</span> {reserva.usuarioEmailReserva}</p>
        <p><span className="font-medium text-gray-600">Teléfono:</span> {reserva.usuarioTelefonoReserva}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-blue-600">Información del Prestador de Servicio:</h4>
        <p><span className="font-medium text-gray-600">Nombre:</span> {reserva.prestadorNombre} {reserva.prestadorApellido}</p>
        <p><span className="font-medium text-gray-600">Email:</span> {reserva.prestadorEmail}</p>
        <p><span className="font-medium text-gray-600">Teléfono:</span> {reserva.prestadorTelefono}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-green-600">Información de la Mascota:</h4>
        <p><span className="font-medium text-gray-600">Nombre:</span> {reserva.mascotaNombre}</p>
        <p><span className="font-medium text-gray-600">Especie:</span> {reserva.mascotaEspecie}</p>
        <p><span className="font-medium text-gray-600">Raza:</span> {reserva.mascotaRaza}</p>
        <p><span className="font-medium text-gray-600">Edad:</span> {reserva.mascotaEdad} años</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-purple-600">Turnos Reservados:</h4>
        <ul className="list-disc list-inside pl-4">
          {reserva.turnosId.map((turnoId, index) => (
            <li key={turnoId} className="text-gray-700">
              <span className="font-medium">Fecha:</span> {reserva.turnosFecha[index]} - <span className="font-medium">Hora:</span> {reserva.turnosHora[index]}
            </li>
          ))}
        </ul>
      </div>

      {/* Botón "Cancelar Reserva" */}
      <button
        onClick={handleCancelClick}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Cancelar Reserva
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="text-gray-700 font-semibold">MVP - A desarrollar la funcionalidad de cancelar reserva</p>
          </div>
        </div>
      )}
    </div>
  );
};

VerReservaCardClient.propTypes = {
  reserva: PropTypes.shape({
    fechaReserva: PropTypes.string.isRequired,
    usuarioNombreReserva: PropTypes.string.isRequired,
    usuarioApellidoReserva: PropTypes.string.isRequired,
    usuarioEmailReserva: PropTypes.string.isRequired,
    usuarioTelefonoReserva: PropTypes.string.isRequired,
    prestadorNombre: PropTypes.string.isRequired,
    prestadorApellido: PropTypes.string.isRequired,
    prestadorEmail: PropTypes.string.isRequired,
    prestadorTelefono: PropTypes.string.isRequired,
    mascotaNombre: PropTypes.string.isRequired,
    mascotaEspecie: PropTypes.string.isRequired,
    mascotaRaza: PropTypes.string.isRequired,
    mascotaEdad: PropTypes.number.isRequired,
    turnosId: PropTypes.arrayOf(PropTypes.string).isRequired,
    turnosFecha: PropTypes.arrayOf(PropTypes.string).isRequired,
    turnosHora: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default VerReservaCardClient;
