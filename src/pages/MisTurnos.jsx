import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../js/globalApi';
import LoadingSpinner from "../components/Loading";

export default function MisTurnos() {
  const { idServicio } = useParams(); // Obtener idServicio desde la URL
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar el modal de confirmación
  const [turnoToDelete, setTurnoToDelete] = useState(null); // Guardar el turno que se quiere eliminar
  const [isHighPriorityDeletion, setIsHighPriorityDeletion] = useState(false); // Estado para verificar si es una eliminación con pocas horas

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}api/turnos/servicio/${idServicio}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setTurnos(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los turnos:', err);
        setError('Error al obtener los turnos.');
        setLoading(false);
      }
    };

    fetchTurnos();
  }, [idServicio]);

  // Función para calcular la diferencia en horas entre la fecha actual y la fecha del turno
  const calcularDiferenciaEnHoras = (fechaTurno, horaTurno) => {
    const ahora = new Date(); // Fecha y hora actual
    const turnoFechaHora = new Date(`${fechaTurno}T${horaTurno}`); // Fecha y hora del turno
    const diferenciaMs = turnoFechaHora - ahora; // Diferencia en milisegundos
    return diferenciaMs / (1000 * 60 * 60); // Convertir milisegundos a horas
  };

  const handleDeleteTurno = async () => {
    if (!turnoToDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}api/turnos/delete/${turnoToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Eliminar el turno de la lista de turnos después de la eliminación exitosa
      setTurnos(turnos.filter((turno) => turno.idTurno !== turnoToDelete));
      setSuccessMessage('Turno eliminado exitosamente.');
      setError('');
      setShowConfirmation(false); // Cerrar el modal de confirmación
      setTurnoToDelete(null);
      setIsHighPriorityDeletion(false); // Restablecer estado de alta prioridad

      // Desaparecer el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // 3000 ms = 3 segundos
    } catch (err) {
      console.error('Error al eliminar el turno:', err);
      setError('Error al eliminar el turno.');
      setSuccessMessage('');
      setShowConfirmation(false); // Cerrar el modal de confirmación
    }
  };

  const openConfirmationModal = (idTurno, reservadoTurno, fechaTurno, horaTurno) => {
    // Verificar si el turno está reservado
    if (reservadoTurno) {
      const horasRestantes = calcularDiferenciaEnHoras(fechaTurno, horaTurno);

      if (horasRestantes < 48) {
        // Si quedan menos de 48 horas, mostrar un mensaje de advertencia
        setWarningMessage('Advertencia: Estás a punto de cancelar una reserva con menos de 48 horas de antelación.');
        setIsHighPriorityDeletion(true); // Indicar que es una cancelación prioritaria
      } else {
        setWarningMessage('');
        setIsHighPriorityDeletion(false);
      }
    }

    setTurnoToDelete(idTurno);
    setShowConfirmation(true); // Mostrar el modal de confirmación
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false); // Cerrar el modal de confirmación
    setTurnoToDelete(null);
    setWarningMessage(''); // Limpiar el mensaje de advertencia
  };

  if (loading) {
    return         <LoadingSpinner
    size = 'md'
    color = 'blue'
    />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg  pt-40 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Mis Turnos</h2>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {turnos.length === 0 ? (
        <p>Aún no tienes turnos disponibles para este servicio. Ve al panel de administración, elige los días y horarios que mejor se ajusten a tu disponibilidad, ¡y prepárate para comenzar a recibir reservas! Brinda lo mejor a la comunidad y marca la diferencia.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {turnos.map((turno) => (
            <div key={turno.idTurno} className="border p-4 rounded">
              <p><strong>Fecha:</strong> {turno.fechaTurno}</p>
              <p><strong>Hora:</strong> {turno.horaTurno}</p>
              <p><strong>Reservado:</strong> {turno.reservadoTurno ? 'Sí' : 'No'}</p>

              {/* Verificación para mostrar el botón de eliminar o cancelar */}
              {!turno.reservadoTurno || (turno.reservadoTurno && calcularDiferenciaEnHoras(turno.fechaTurno, turno.horaTurno) >= 48) ? (
                <button
                  onClick={() => openConfirmationModal(turno.idTurno, turno.reservadoTurno, turno.fechaTurno, turno.horaTurno)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300"
                >
                  {turno.reservadoTurno ? 'Cancelar Reserva' : 'Eliminar Turno'}
                </button>
              ) : (
                <p className="text-yellow-500">No puedes cancelar una reserva con menos de 48 horas de antelación.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{isHighPriorityDeletion ? '¿Estás seguro de que deseas cancelar esta reserva?' : '¿Estás seguro de que deseas eliminar este turno?'}</h2>
            {isHighPriorityDeletion && <p className="text-red-500 mb-4">{warningMessage}</p>}
            <p className="mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeConfirmationModal}
                className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteTurno}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

