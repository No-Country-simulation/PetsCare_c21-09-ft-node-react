import { useNavigate } from 'react-router-dom';

export default function VistaEnlaceAdminUserPet() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
      <button
        className="bg-main-blue text-white py-2 px-4 rounded hover:bg-blue-600 w-64"
        onClick={() => navigate('/misreservas-user')}
      >
        Mis Reservas
      </button>

      <button
        className="bg-main-blue text-white py-2 px-4 rounded hover:bg-blue-600 w-64"
        onClick={() => navigate('/serviciosdisponibles')}
      >
        Buscar Servicios
      </button>

      <button
        className="bg-main-blue text-white py-2 px-4 rounded hover:bg-blue-600 w-64"
        onClick={() => navigate('/agregar-mascota')}
      >
        Agregar Mascota
      </button>
    </div>
  );
}

