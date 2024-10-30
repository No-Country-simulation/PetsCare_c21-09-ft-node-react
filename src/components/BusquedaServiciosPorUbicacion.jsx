import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigate } from 'react-router-dom';

export default function BusquedaServiciosPorUbicacion() {
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [redirigir, setRedirigir] = useState(false);

  // Componente para capturar la ubicación al hacer clic en el mapa
  const LocationMarker = () => {
    useMapEvents({
      click(event) {
        setLatitud(event.latlng.lat);
        setLongitud(event.latlng.lng);
      },
    });

    return latitud && longitud ? (
      <Marker position={[latitud, longitud]} />
    ) : null;
  };

  // Iniciar la redirección con latitud y longitud en la URL
  const handleBuscarServicios = () => {
    if (latitud && longitud) {
      setRedirigir(true);
    } else {
      alert('Selecciona una ubicación en el mapa para buscar servicios cercanos.');
    }
  };

  // Redirigir a la ruta `/servicessearch` con los parámetros en la URL
  if (redirigir) {
    return <Navigate to={`/servicessearch?latitud=${latitud}&longitud=${longitud}`} />;
  }

  return (
    <div className="w-full lg:w-5/6 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Buscar Servicios Cercanos por Ubicación</h2>
      <div className="h-64 mb-4">
        <MapContainer
          center={[-34.6037, -58.3816]} // Coordenadas iniciales (ajusta según prefieras)
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>
      
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleBuscarServicios}
      >
        Buscar Servicios Cercanos
      </button>
    </div>
  );
}

