import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/globalApi';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


function UserStatsCard({ countPrestador, countDuenio }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Estadísticas de Usuarios</h2>
        
        {/* Contenedor para organizar en filas */}
        <div className="space-y-6">
          
          {/* Prestador de Servicio */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-900 rounded-sm"></div>
            <div>
              <p className="text-gray-700 font-semibold">Prestador de Servicio</p>
              <p className="text-gray-500">{countPrestador} usuarios</p>
            </div>
          </div>
          
          {/* Dueño de Mascotas */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
            <div>
              <p className="text-gray-700 font-semibold">Dueño de Mascotas</p>
              <p className="text-gray-500">{countDuenio} usuarios</p>
            </div>
          </div>
  
        </div>
      </div>
    );
  }

  UserStatsCard.propTypes = {
    countPrestador: PropTypes.number.isRequired,
    countDuenio: PropTypes.number.isRequired,
  };


export default function AdministracionVistaPrincipal() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

    // Variables de conteo para los roles
    const [countPrestador, setCountPrestador] = useState(0);
    const [countDuenio, setCountDuenio] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [showModal, setShowModal] = useState(false);

  // Función para mostrar el modal durante 3 segundos
  const handleClick = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/usuario/traertodosdto`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUsuarios(response.data);

            // Contar los roles
            const prestadorCount = response.data.filter(user => user.role === 'PRESTADORSERVICIO').length;
            const duenioCount = response.data.filter(user => user.role === 'USUARIO').length;
    
            setCountPrestador(prestadorCount);
            setCountDuenio(duenioCount);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setError('Error al cargar los usuarios. Por favor, inténtalo de nuevo.');
        if (error.response && error.response.status === 401) {
          setError('Usuario no autenticado. Redirigiendo al inicio de sesión...');
          setTimeout(() => navigate('/login'), 3000);
        }
      }
    };

    fetchUsuarios();
  }, [token, navigate]);

  // Función para marcar usuario como verificado este metodo es para prueba del MVP para habilitar correos de prueba
//   Ademas setea el rol a PRESTADOR DE SERVICIO por defecto 
  const handleMarcarVerificado = async (idUsuario) => {
    try {
      await axios.put(
        `${apiUrl}api/usuario/marcarverify/${idUsuario}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Actualizar el estado local para reflejar el cambio
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.idUsuario === idUsuario
            ? { ...usuario, usuarioVerificado: true }
            : usuario
        )
      );
    } catch (error) {
      console.error('Error al marcar como verificado:', error);
      setError('No se pudo marcar como verificado.');
    }
  };



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administración de Usuarios</h1>

 {/* Panel superior con accesos */}
 <div className="flex justify-around items-center bg-gray-100 p-4 rounded-md shadow-md mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Ver Mensajes
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Administrar Reservas
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Ver Servicios
        </button>
      </div>

           {/* Modal faltan funcionalidades*/}
           {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="text-gray-800 font-semibold">Lo siento Administrador, Falta implementar la lógica de estas funcionalidades</p>
          </div>
        </div>
      )}
    {/* Gráfico de roles */}
  
    <UserStatsCard countPrestador={countPrestador} countDuenio={countDuenio} />


      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Usuario</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Teléfono</th>
              <th className="py-2 px-4 border-b">Rol</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.idUsuario} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{usuario.idUsuario}</td>
                <td className="py-2 px-4 border-b">{usuario.name} {usuario.lastName}</td>
                <td className="py-2 px-4 border-b">{usuario.username}</td>
                <td className="py-2 px-4 border-b">{usuario.email}</td>
                <td className="py-2 px-4 border-b">{usuario.phone}</td>
                <td className="py-2 px-4 border-b text-center">{usuario.role}</td>
                <td className="py-2 px-4 border-b text-center space-x-2">
                  <button
                    className={`${
                      usuario.usuarioVerificado
                        ? 'bg-green-500 hover:bg-green-700'
                        : 'bg-red-500 hover:bg-red-700'
                    } text-white font-bold py-1 px-2 rounded`}
                    onClick={() => handleMarcarVerificado(usuario.idUsuario)}
                    disabled={usuario.usuarioVerificado}
                  >
                    {usuario.usuarioVerificado ? 'Verificado' : 'Verificar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
