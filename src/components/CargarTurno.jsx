import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../js/globalApi';

const CargarTurnos = () => {
  const { idServicio } = useParams(); // Captura el idServicio desde la URL
  const [selectedDates, setSelectedDates] = useState([]);
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [existingTurnos, setExistingTurnos] = useState([]); // Turnos ya existentes
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado del modal
  const navigate = useNavigate();

  // Usamos useRef para almacenar idServicio
  const idServicioRef = useRef(null);

  // Almacenar el idServicio con useRef de react
  idServicioRef.current = idServicio;

  // Obtener los turnos existentes del backend para este servicio
  useEffect(() => {
    const fetchExistingTurnos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}api/turnos/servicio/${idServicio}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setExistingTurnos(response.data); // Almacenar los turnos existentes
      } catch (error) {
        console.error('Error al obtener los turnos existentes:', error);
        setErrorMessage('Error al obtener los turnos existentes.');
       
      }
    };

    fetchExistingTurnos();
  }, [idServicio]);

  // Función para agregar una fecha seleccionada
  const handleDateChange = (date) => {
    if (!selectedDates.includes(date)) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  // Función para eliminar una fecha seleccionada
  const handleRemoveDate = (dateToRemove) => {
    setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
  };

  // Función para dar formato a las fechas en español
  const formatSpanishDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',  // Día de la semana
      year: 'numeric',
      month: 'long',    // Nombre completo del mes
      day: 'numeric'
    }).replace(',', ''); // Eliminamos la coma que genera por defecto
  };

  // Función para verificar si el turno ya existe en los turnos actuales
  const isTurnoDuplicated = (fecha, hora) => {
    return existingTurnos.some(turno =>
      turno.fechaTurno === fecha && turno.horaTurno === hora
    );
  };

  // Función para generar turnos según el rango de horas
  const generarTurnos = () => {
    const turnos = [];

    selectedDates.forEach((fecha) => {
      let startTime = new Date(fecha);
      startTime.setHours(horaInicio.split(':')[0], horaInicio.split(':')[1]);

      let endTime = new Date(fecha);
      endTime.setHours(horaFin.split(':')[0], horaFin.split(':')[1]);

      // Genera turnos cada una hora dentro del rango
      while (startTime < endTime) {
        const fechaTurno = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const horaTurno = startTime.toTimeString().split(' ')[0]; // Formato HH:MM:SS

        // Verificar si el turno ya existe
        if (!isTurnoDuplicated(fechaTurno, horaTurno)) {
          const turno = {
            fechaTurno,
            horaTurno,
            reservadoTurno: false,
            servicio: { idServicio: idServicio }, // Usar el idServicio capturado desde la URL
          };
          turnos.push(turno);
        } else {
          // Mostrar el modal si hay duplicados
          setShowModal(true);
          return [];
        }

        // Incrementa la hora en 1 hora
        startTime.setHours(startTime.getHours() + 1);
      }
    });

    return turnos;
  };

  // Función para restablecer los valores del formulario
  const resetFormValues = () => {
    setSelectedDates([]);
    setHoraInicio('');
    setHoraFin('');
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const turnosGenerados = generarTurnos();

    if (turnosGenerados.length === 0) {
      setErrorMessage('No se pueden crear turnos duplicados o sin fecha.');
      console.error(errorMessage);
      return;
    }

    // Obtener el id del usuario desde el token
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(apiUrl + 'api/turnos/agregarturnos', turnosGenerados, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setSuccessMessage('Turnos cargados exitosamente.');
        setErrorMessage('');
        // Redirigir después de 3 segundos, incluyendo el idServicio en la URL
        setTimeout(() => navigate(`/mis-turnos/${idServicioRef.current}`), 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al cargar los turnos.');
      setSuccessMessage('');
    }
  };

  // Función para regresar al panel de servicios
  const handleRegresarPanel = () => {
    navigate('/admin-servicios');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg pt-12 pb-8 mt-5">
      <h2 className="text-2xl font-bold text-center mb-6">Selecciona los días disponibles</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <div className="w-full md:w-3/4 lg:w-1/2 flex justify-center items-center">
              <DatePicker
                selected={null}
                onChange={(date) => handleDateChange(date)}
                inline
                minDate={new Date()} // Solo fechas futuras
                dateFormat="dd/MM/yyyy"
              />
            </div>
          <div className="mt-2">
            <p className="font-semibold text-gray-700">Días seleccionados:</p>
            <ul>
              {selectedDates.map((date, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                  {`Día: ${formatSpanishDate(date)}`}
                  <button
                    type="button"
                    onClick={() => handleRemoveDate(date)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="flex flex-col">
            <label htmlFor="horaInicio" className="text-gray-700">Hora de inicio</label>
            <input
              type="time"
              id="horaInicio"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
              className="border p-2 rounded-md shadow-sm"
              step="60" // Incrementa en intervalos de minutos
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="horaFin" className="text-gray-700">Hora de fin</label>
            <input
              type="time"
              id="horaFin"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              required
              className="border p-2 rounded-md shadow-sm"
              step="60" // Incrementa en intervalos de minutos
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-main-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Guardar Turnos
        </button>
      </form>

      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}


      {/* Modal para turnos duplicados */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Turnos duplicados</h2>
            <p>Algunos turnos ya existen. Para evitar la duplicidad, restablezca los valores o regrese al panel de servicios.</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={resetFormValues}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Restablecer valores
              </button>
              <button
                onClick={handleRegresarPanel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
              >
                Regresar al Panel Servicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CargarTurnos;




