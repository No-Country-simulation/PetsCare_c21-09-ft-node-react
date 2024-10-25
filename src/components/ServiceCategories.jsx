import React, { useState, useEffect } from 'react';
import exampleImage from '../assets/educacion.jpeg';
import Mapa from './Mapa';
import paseoImage from '../assets/paseo-2.jpeg';
import cuidadoImage from '../assets/cuidado.jpeg';
import peluqueriaImage from '../assets/peluqueria-2.jpeg';
import saludImage from '../assets/salud.jpeg';
import ejercicioImage from '../assets/ejercicio.jpeg';
import educacionImage from '../assets/educacion.jpeg';

// Array con las ofertas de servicio
const serviceOffer = [
  { id: '01', activity: 'Paseo de Perros', image: exampleImage, address: 'B1704 Ramos Mejía, Provincia de Buenos Aires', horario: '14:00 - 18:30', description: 'Paseo perros', price: '5000' },
  { id: '02', activity: 'Cuidado', image: exampleImage, address: 'Brandsen 805, C1161AAQ Cdad. Autónoma de Buenos Aires', horario: '14:00 - 18:30', description: 'Cuidado', price: '5000' },
  { id: '03', activity: 'Ejercicio', image: exampleImage, address: 'San Lorenzo 141, A4400 Salta', horario: '14:00 - 18:30', description: 'Entrenamiento de perros', price: '5000' },
  { id: '04', activity: 'Peluqueria', image: exampleImage, address: 'calle falsa 789', horario: '14:00 - 18:30', description: 'Entrenamiento de perros', price: '5000' },
  { id: '05', activity: 'Salud', image: exampleImage, address: 'calle falsa 789', horario: '14:00 - 18:30', description: 'Entrenamiento de perros', price: '5000' },
  { id: '06', activity: 'Educación', image: exampleImage, address: 'calle falsa 789', horario: '14:00 - 18:30', description: 'Entrenamiento de perros', price: '5000' }
];

function Services({ onSelectService }) {
  const services = [
    { title: 'Paseo de Perros', image: paseoImage, description: 'Inserte descripción del servicio' },
    { title: 'Cuidado', image: cuidadoImage, description: 'Inserte descripción del servicio' },
    { title: 'Peluquería', image: peluqueriaImage, description: 'Inserte descripción del servicio' },
    { title: 'Salud', image: saludImage, description: 'Inserte descripción del servicio' },
    { title: 'Ejercicio', image: ejercicioImage, description: 'Inserte descripción del servicio' },
    { title: 'Educación', image: educacionImage, description: 'Inserte descripción del servicio' }
  ];

  return (
    <div className="p-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12 text-primary">Busca el servicio que necesitas</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border bg-white p-2 size-44 cursor-pointer hover:text-secondary transition duration-300 hover:border-secondary hover:shadow-xl hover:shadow-secondary rounded-lg shadow-md"
              onClick={() => onSelectService(service.title)} // Llama a la función de selección
            >
              <img src={service.image} alt={service.title} className='w-full h-28 object-contain mb-4 items-center ' />
              <h3 className="text-lg font-semibold mb-2 text-center text-primary ">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCategories() {
  const [selectedService, setSelectedService] = useState(null);
  const [position, setPosition] = useState([-34.6037, -58.3816]); // Estado del mapa (Buenos Aires)
  const [error, setError] = useState(null);

  const handleSelectService = (serviceTitle) => {
    const selected = serviceOffer.find((service) => service.activity === serviceTitle);
    if (selected) {
      geocodeAddress(selected.address); // Convertir dirección en coordenadas
      setSelectedService(serviceTitle);
    }
  };

  // Función para obtener coordenadas desde Nominatim
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]); // Actualizar la posición con las coordenadas
      } else {
        setError('No se encontraron resultados para la dirección proporcionada');
      }
    } catch (error) {
      setError('Error al geocodificar la dirección');
      console.error(error);
    }
  };

  const filteredServices = selectedService
    ? serviceOffer.filter((service) => service.activity === selectedService)
    : serviceOffer;

  return (
    <div>
      <Services onSelectService={handleSelectService} />
      
      <div className='flex flex-row p-4 w-full h-screen'>
        <div className='flex flex-col p-1 w-1/3 h-full overflow-y-auto gap-6'>
          {filteredServices.map((service, index) => (
            <div key={index} className='container mx-auto p-2 flex self-start flex-row border-4 rounded-xl  h-72 w-full cursor-pointer hover:border-secondary transition duration-300'>
              <div className='h-full w-2/6'>
                <img src={service.image} alt={service.activity} className="w-full h-full object-cover" />
              </div>

              <div className="md:w-4/6 p-1 flex flex-col justify-between px-4">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-2">{service.activity}</h2>
                  <p className="text-primary mb-4">{service.address}</p>
                  <p className="text-primary mb-4">Horarios: {service.horario}</p>
                  <p className="text-xl font-semibold text-secondary mb-4">ARS {service.price}</p>
                </div>
                <div className='flex flex-row justify-between px-4'>
                  <button className='bg-secondary px-2 py-1 border-2 rounded cursor-pointer border-white text-white hover:scale-125 transition duration-300'>Contactar</button>
                  <button className='bg-secondary px-2 py-1 border-2 rounded cursor-pointer border-white text-white hover:scale-125 transition duration-300'>Reservar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='w-1/2 h-full p-8 z-0'>
          <Mapa position={position} /> {/* Pasar las coordenadas al mapa */}
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default ServiceCategories;