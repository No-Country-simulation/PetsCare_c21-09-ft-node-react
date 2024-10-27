import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { apiUrl, urlImage } from '../js/globalApi';


function PetProfileCard({ pet }) {

  const navigate = useNavigate();


  const [isEditing, setIsEditing] = useState(false);
  const [editedPet, setEditedPet] = useState({ ...pet });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const token = localStorage.getItem('token');

  // Función para actualizar los datos de la mascota
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}api/mascotas/update/${editedPet.idPet}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editedPet),
      });
      if (!response.ok) throw new Error('Error al actualizar los datos de la mascota');
      const updatedPet = await response.json();
      setEditedPet(updatedPet);
      setIsEditing(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

// Función para eliminar la mascota
const handleDelete = async () => {
  try {
    const response = await fetch(`${apiUrl}api/mascotas/eliminar/${pet.idPet}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 409) {
      // Error de conflicto: la mascota tiene reservas asignadas
      setErrorMessage("No se puede eliminar la mascota porque tiene reservas asignadas.");
      setShowErrorModal(true);
    } else if (!response.ok) {
      // Otro error
      setErrorMessage("No se puede eliminar la mascota porque tiene reservas asignadas.");
      setShowErrorModal(true);
    } else {
      //  mascota eliminada
      setShowDeleteModal(true);
      setTimeout(() => {
        setShowDeleteModal(false);
        navigate("/admin-mascotas"); // Redirigir para traer las mascotas, sin la eliminada
      }, 3000);
    }
  } catch (error) {
    console.error(error);
    setErrorMessage("Error en la conexión. Inténtalo nuevamente.");
    setShowErrorModal(true);
  }
};

  return (
    <div className="bg-white rounded-lg shadow-lg transition-all duration-300 w-full max-w-md mx-auto hover:shadow-xl cursor-pointer transform hover:scale-105 pt-20 mt-10">
      {/* Modal de éxito al guardar */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">¡Éxito!</h2>
            <p>Cambios de la mascota realizados con éxito.</p>
          </div>
        </div>
      )}
      {/* Modal de éxito al eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">¡Eliminada!</h2>
            <p>La mascota ha sido eliminada exitosamente.</p>
          </div>
        </div>
      )}
      {/* Modal de error */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p>{errorMessage}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => setShowErrorModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Imagen de la mascota */}
      <div className="relative">
        <img
          src={urlImage + pet.imagePet}
          alt={pet.name}
          className="w-full h-48 object-contain rounded-t-lg"
        />
     <button
          className="absolute  top-2 right-0 bg-red-600 bg-opacity-75 text-white p-1 rounded-full hover:bg-opacity-90"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Eliminar
        </button>
        <button
          className="absolute top-10 right-2 bg-gray-800 bg-opacity-75 text-white p-1 rounded-full hover:bg-opacity-90 mt-8"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedPet.name}
              onChange={handleChange}
              className="block border border-gray-300 rounded p-2 w-full mt-2"
              placeholder="Nombre"
            />
            <input
              type="text"
              name="species"
              value={editedPet.species}
              onChange={handleChange}
              className="block border border-gray-300 rounded p-2 w-full mt-2"
              placeholder="Especie"
            />
            <input
              type="text"
              name="breed"
              value={editedPet.breed}
              onChange={handleChange}
              className="block border border-gray-300 rounded p-2 w-full mt-2"
              placeholder="Raza"
            />
            <input
              type="number"
              name="age"
              value={editedPet.age}
              onChange={handleChange}
              className="block border border-gray-300 rounded p-2 w-full mt-2"
              placeholder="Edad"
            />
            <div className="my-2">
              <label className="font-semibold">Vacunas al día:</label>
              <select
                name="vaccinated"
                value={editedPet.vaccinated}
                onChange={handleChange}
                className="block border border-gray-300 rounded p-2 mt-1 w-full"
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <input
              type="text"
              name="personality"
              value={editedPet.personality}
              onChange={handleChange}
              className="block border border-gray-300 rounded p-2 w-full mt-2"
              placeholder="Personalidad"
            />
            <input
              type="number"
              name="weight"
              value={editedPet.weight}
              onChange={handleChange}
              className="block border border-gray-300 rounded p-2 w-full mt-2"
              placeholder="Peso (kg)"
            />
            <textarea
              name="details"
              value={editedPet.details}
              onChange={handleChange}
              className="block border border-gray-300 rounded p-2 w-full mt-2"
              placeholder="Detalles"
            />
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition-colors duration-200"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{editedPet.name}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Especie:</span> {editedPet.species}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Raza:</span> {editedPet.breed}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Edad:</span> {editedPet.age} años
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Vacunas al día:</span> {editedPet.vaccinated ? 'Sí' : 'No'}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Personalidad:</span> {editedPet.personality}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Peso:</span> {editedPet.weight} kg
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Detalles:</span> {editedPet.details}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

PetProfileCard.propTypes = {
  pet: PropTypes.shape({
    idPet: PropTypes.number.isRequired,
    imagePet: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    vaccinated: PropTypes.bool.isRequired,
    personality: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};

export default PetProfileCard;
