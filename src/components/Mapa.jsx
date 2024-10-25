import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// Componente para mover la cámara cuando cambia la posición
const ChangeView = ({ center, zoom }) => {
  const map = useMap(); // Obtenemos la instancia del mapa
  useEffect(() => {
    map.setView(center, zoom); // Movemos la cámara cuando cambien las coordenadas
  }, [center, zoom, map]);
  
  return null; // No necesita renderizar nada
};

const Mapa = ({ position }) => {
  const zoom = 13; // Puedes ajustar el nivel de zoom

  return (
    <div className='w-72 h-72 border-4 border-blue-500 shadow-lg rounded-md overflow-hidden z-0'>
      <MapContainer center={position} zoom={zoom} className='h-full w-full'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Componente que actualiza la cámara */}
        <ChangeView center={position} zoom={zoom} />
        <Marker position={position}>
          <Popup>Aquí está un marcador.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapa;