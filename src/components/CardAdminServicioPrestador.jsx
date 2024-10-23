import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { urlImage } from '../js/globalApi';

export default function CardAdminServicioPrestador({ servicio }) {


  const [nombreServicio, setNombreServicio] = useState(servicio.nombreServicio);
  const [lugarFisico, setLugarFisico] = useState(servicio.lugarFisico);
  const [voyAlLugar, setVoyAlLugar] = useState(servicio.voyAlLugar);
  const [observacion, setObservacion] = useState(servicio.observacion);
  const [pais, setPais] = useState(servicio.pais);
  const [provincia, setProvincia] = useState(servicio.provincia);
  const [estadoDepartamento, setEstadoDepartamento] = useState(servicio.estadoDepartamento);
  const [direccion, setDireccion] = useState(servicio.direccion);
  const [imagenServicio, setImagenServicio] = useState(servicio.imagenServicio);

  const idServicio = servicio.idServicio;

  const navigate = useNavigate();

  const handleEditarServicio = () => {
    navigate(`/editar-servicio/${idServicio}`);
  };

  const handleAdministrarTurnos = () => {
    navigate(`/seleccion-admin-turnos/${idServicio}`);
  };

  const handleTusReservas = () => {
    navigate(`/tus-reservas/${idServicio}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Imagen del servicio */}
      {imagenServicio && (
        <img
          src={`${urlImage}${imagenServicio}`} 
          alt={nombreServicio}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      {/* Información del servicio */}
      <h2 className="text-xl font-bold text-primaryColor mb-2">
        {nombreServicio}
      </h2>
      <p className="text-gray-700 mb-2">
        {observacion}
      </p>
      <p className="text-gray-500 mb-2">
        Dirección: {direccion}, {estadoDepartamento}, {provincia}, {pais}
      </p>
      <p className="text-gray-500 mb-4">
        Lugar físico: {lugarFisico ? 'Sí' : 'No'}, ¿Voy al lugar?: {voyAlLugar ? 'Sí' : 'No'}
      </p>

      {/* Botones */}
      <div className="flex space-x-4">
        <button
          onClick={handleEditarServicio}
          className="w-full bg-main-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Editar Mi Servicio
        </button>
        <button
          onClick={handleAdministrarTurnos}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Administrar Turnos
        </button>
        <button
          onClick={handleTusReservas}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
        >
          Tus Reservas
        </button>
      </div>
    </div>
  );
}

CardAdminServicioPrestador.propTypes = {
  servicio: PropTypes.shape({
    idServicio: PropTypes.number.isRequired,
    nombreServicio: PropTypes.string.isRequired,
    lugarFisico: PropTypes.bool.isRequired,
    voyAlLugar: PropTypes.bool.isRequired,
    observacion: PropTypes.string.isRequired,
    pais: PropTypes.string.isRequired,
    provincia: PropTypes.string.isRequired,
    estadoDepartamento: PropTypes.string.isRequired,
    direccion: PropTypes.string.isRequired,
    imagenServicio: PropTypes.string,
    latitud: PropTypes.number.isRequired,
    longitud: PropTypes.number.isRequired,
    turnosDisponibles: PropTypes.arrayOf(
      PropTypes.shape({
        idTurno: PropTypes.number,
        fechaTurno: PropTypes.string,
        horaTurno: PropTypes.string,
        reservadoTurno: PropTypes.bool,
      })
    ),
  }).isRequired,
};

