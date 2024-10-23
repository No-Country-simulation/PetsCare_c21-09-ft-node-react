
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export default function DosBotonesSeleccionPrestador() {
  const navigate = useNavigate();
  const { idServicio } = useParams(); // Captura el idServicio desde la URL

  // Usamos useRef para almacenar idServicio
  const idServicioRef = useRef(null);

  // Almacenar el idServicio en useRef cuando se cargue el componente
  useEffect(() => {
    if (idServicio) {
      idServicioRef.current = idServicio;
    }
  }, [idServicio]);

  // Función para redirigir a cargar turnos
  const handleCargarTurnos = () => {
    navigate(`/cargar-turnos/${idServicioRef.current}`);
  };

  // Función para redirigir a ver mis turnos
  const handleVerMisTurnos = () => {
    navigate(`/mis-turnos/${idServicioRef.current}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg padding5rembt">
      <h2 className="text-2xl font-bold text-center mb-6">Administrar Turnos</h2>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleCargarTurnos}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Cargar Turnos
        </button>

        <button
          onClick={handleVerMisTurnos}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
        >
          Ver Mis Turnos
        </button>
      </div>
    </div>
  );
}
