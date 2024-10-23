import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { apiUrl } from '../js/globalApi';


export default function EditarServicio() {
  // el id del servicio se obtiene desde la url
  const { idServicio } = useParams();



  
  const navigate = useNavigate();

  // Estados para los datos del servicio
  const [nombreServicio, setNombreServicio] = useState('');
  const [lugarFisico, setLugarFisico] = useState(false);
  const [voyAlLugar, setVoyAlLugar] = useState(false);
  const [observacion, setObservacion] = useState('');
  const [pais, setPais] = useState('');
  const [provincia, setProvincia] = useState('');
  const [estadoDepartamento, setEstadoDepartamento] = useState('');
  const [direccionServicio, setDireccionServicio] = useState('');

  // Estados para los datos del usuario
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [direccionUsuario, setDireccionUsuario] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  // Se traen los datos del servicio y del usuario al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Decodifico token para extraer el idUsuario
    const decodedToken = jwtDecode(token);
    const idUsuario = decodedToken.idUser;
    console.log("debug id usuario para consulta en DTO "+idUsuario)

    if (token) {
      axios
        .get(`${apiUrl}api/servicios/buscar/${idServicio}/${idUsuario}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          const servicioUsuario = response.data;

          // Datos del servicio
          setNombreServicio(servicioUsuario.nombreServicio);
          setLugarFisico(servicioUsuario.lugarFisico);
          setVoyAlLugar(servicioUsuario.voyAlLugar);
          setObservacion(servicioUsuario.observacion);
          setPais(servicioUsuario.pais);
          setProvincia(servicioUsuario.provincia);
          setEstadoDepartamento(servicioUsuario.estadoDepartamento);
          setDireccionServicio(servicioUsuario.direccionServicio);

          // Datos del usuario
          setName(servicioUsuario.name);
          setLastName(servicioUsuario.lastName);
          setUsername(servicioUsuario.username);
          setEmail(servicioUsuario.email);
          setPhone(servicioUsuario.phone);
          setDireccionUsuario(servicioUsuario.direccionUsuario);

          setLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener el servicio:', error);
          setError('Error al obtener el servicio.');
          setLoading(false);
        });
    }
  }, [idServicio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
  
    // Decodifico token para extraer el idUsuario
    const decodedToken = jwtDecode(token);
    const idUsuario = decodedToken.idUser;
  
    // Preparar el DTO para enviar al backend
    const servicioUsuarioActualizado = {
      nombreServicio,
      lugarFisico,
      voyAlLugar,
      observacion,
      pais,
      provincia,
      estadoDepartamento,
      direccionServicio,
      idUsuario,
      name,
      lastName,
      username,
      email,
      phone,
      direccionUsuario,
    };
  
    try {
      const response = await axios.put(`${apiUrl}api/servicios/modificar/${idServicio}`, servicioUsuarioActualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response);
      setSuccessMessage('Servicio actualizado exitosamente'); // Mostrar mensaje de éxito

      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/admin-servicios');
      }, 3000);

    } catch (error) {
      // Verifica si existe una respuesta del servidor
      if (error.response) {
        if (error.response.status === 409) {
          setSuccessMessage('Los cambios se realizaron correctamente, pero ocurrió un error de visualización.');
          setTimeout(() => {
            navigate('/admin-servicios');
          }, 3000);
        } else {
          console.error('Error al actualizar el servicio:', error.response);
          setError('Error al actualizar el servicio.');
        }
      } else {
        console.error('Error al actualizar el servicio:', error);
        setError('Error al actualizar el servicio.');
      }
    }
  };

  if (loading) {
    return <p>Cargando datos del servicio...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg pt-12 mt-12 pb-12">
      <h2 className="text-2xl font-bold text-center mb-6">Editar Servicio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Datos del servicio */}
        <div className="flex flex-col">
          <label htmlFor="nombreServicio" className="text-gray-700">Nombre del Servicio</label>
          <input
            type="text"
            id="nombreServicio"
            className="p-2 border border-gray-300 rounded"
            value={nombreServicio}
            onChange={(e) => setNombreServicio(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-row space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lugarFisico"
              checked={lugarFisico}
              onChange={(e) => setLugarFisico(e.target.checked)}
            />
            <label htmlFor="lugarFisico" className="ml-2 text-gray-700">¿Tiene lugar físico?</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="voyAlLugar"
              checked={voyAlLugar}
              onChange={(e) => setVoyAlLugar(e.target.checked)}
            />
            <label htmlFor="voyAlLugar" className="ml-2 text-gray-700">¿Voy al lugar?</label>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="observacion" className="text-gray-700">Observaciones</label>
          <textarea
            id="observacion"
            className="p-2 border border-gray-300 rounded"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            required
          />
        </div>

        {/* Datos del usuario */}
        <h2 className="text-xl font-bold text-center mt-6">Datos del Usuario</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              className="p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-gray-700">Apellido</label>
            <input
              type="text"
              id="lastName"
              className="p-2 border border-gray-300 rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              className="p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700">Teléfono</label>
            <input
              type="text"
              id="phone"
              className="p-2 border border-gray-300 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="direccionUsuario" className="text-gray-700">Dirección</label>
            <input
              type="text"
              id="direccionUsuario"
              className="p-2 border border-gray-300 rounded"
              value={direccionUsuario}
              onChange={(e) => setDireccionUsuario(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-main-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Guardar Cambios
        </button>
      </form>

      {/* Mostrar mensaje de éxito debajo del formulario */}
      {successMessage && (
        <div className="mt-4 text-center text-green-500">
          {successMessage}
        </div>
      )}
    </div>
  );
}



