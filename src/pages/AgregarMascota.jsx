
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../js/globalApi';
import {jwtDecode} from 'jwt-decode'; // asegúrate de instalar jwt-decode con npm

export default function AgregarMascota() {
  const navigate = useNavigate();

  // Estados para los atributos de la mascota
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [vaccinated, setVaccinated] = useState(false);
  const [personality, setPersonality] = useState('');
  const [weight, setWeight] = useState('');
  const [details, setDetails] = useState('');
  const [imagenMascota, setImagenMascota] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [esError, setEsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

       // Si ya se está enviando, no hacer nada
       if (isSubmitting) return;

       setIsSubmitting(true); // Bloquear el botón al iniciar la solicitud

    // Creación de FormData para enviar la imagen y otros datos
    const formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('vaccinated', vaccinated);
    formData.append('personality', personality);
    formData.append('weight', weight);
    formData.append('details', details);
    formData.append('imagenMascota', imagenMascota);

    // Obtener el id del usuario desde el token
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const idUsuario = decodedToken.idUser;

    formData.append('idUsuario', idUsuario);

    try {
      // Enviar la solicitud al backend
      const response = await axios.post(`${apiUrl}api/mascotas/agregar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response);
      setEsError(false);
      setMensaje('Mascota agregada exitosamente');
      setMostrarMensaje(true);

      // Redirigir a /mis-mascotas después de 3 segundos
      setTimeout(() => {
        setMostrarMensaje(false);
        navigate('/admin-mascotas');
      }, 3000);

    } catch (error) {
      console.error('Error al agregar la mascota:', error);
      setEsError(true);
      setMensaje('Error al agregar la mascota. Por favor, inténtalo de nuevo.');

      setTimeout(() => {
        setEsError(false);
        navigate('/mis-mascotas');
      }, 3000);
      setMostrarMensaje(true);
    }finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 pt-40 pb-20">
      <h1 className="text-2xl font-bold mb-4">Agregar Mascota</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-blue focus:border-main-blue sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Especie</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-blue focus:border-main-blue sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Raza</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-blue focus:border-main-blue sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-blue focus:border-main-blue sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vacunas al día</label>
          <input
            type="checkbox"
            checked={vaccinated}
            onChange={(e) => setVaccinated(e.target.checked)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Personalidad</label>
          <input
            type="text"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-blue focus:border-main-blue sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Peso</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-blue focus:border-main-blue sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Detalles</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-blue focus:border-main-blue sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Imagen de la mascota</label>
          <input
            type="file"
            onChange={(e) => setImagenMascota(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className={`mt-4 w-full bg-main-blue text-white py-2 px-4 rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Agregar Mascota'}
        </button>
      </form>

      {mostrarMensaje && (
        <div className={`mt-4 p-4 rounded ${esError ? 'bg-red-200' : 'bg-green-200'}`}>
          <p>{mensaje}</p>
        </div>
      )}
    </div>
  );
}

