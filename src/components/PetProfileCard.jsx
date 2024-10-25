import { useState } from 'react';
import PropTypes from 'prop-types';
import { urlImage } from '../js/globalApi';
import VistaEnlaceAdminUserPet from '../components/VistaEnlaceAdminUserPet';

function PetProfileCard({ pet }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Controla el modo de edición
  const [editedPet, setEditedPet] = useState({ ...pet }); // Estado para los cambios de edición
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el loading

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  // Función para guardar cambios
  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Aquí puedes hacer una llamada a la API para guardar los datos
      const response = await fetch(`/api/pets/${editedPet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPet),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos de la mascota');
      }

      const updatedPet = await response.json();
      setEditedPet(updatedPet); // Actualizar el estado con la nueva data
      setIsEditing(false); // Salir del modo de edición
      setIsExpanded(false); // Cerrar después de guardar si lo deseas
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="div">
        <div
          className={`bg-white rounded-lg shadow-md transition-all duration-300 ${
            isExpanded ? 'w-full col-span-2' : 'w-full cursor-pointer'
          }`}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          <div className={`flex ${isExpanded ? 'flex-row' : 'flex-col'}`}>
            <img
              src={urlImage + pet.imagePet}
              alt={pet.name}
              className={`rounded-t-lg ${isExpanded ? 'w-1/3 h-2/3 object-cover rounded-l-lg rounded-t-none' : 'w-full h-32 object-cover'} max-w-full max-h-full`}
            />
            <div className={`p-4 ${isExpanded ? 'w-2/3' : 'w-full'}`}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedPet.name}
                    onChange={handleChange}
                    className="block border rounded p-1 w-full mt-1"
                  />
                  <div className="mb-1">
                    <label className="font-semibold">Vacunas al día:</label>
                    <select
                      name="vaccinated"
                      value={editedPet.vaccinated}
                      onChange={handleChange}
                      className="block border rounded p-1 mt-1"
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
                    className="block border rounded p-1 w-full mt-1"
                  />
                  <input
                    type="number"
                    name="weight"
                    value={editedPet.weight}
                    onChange={handleChange}
                    className="block border rounded p-1 w-full mt-1"
                  />
                  <textarea
                    name="details"
                    value={editedPet.details}
                    onChange={handleChange}
                    className="block border rounded p-1 w-full mt-1"
                  />
                  <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Guardando...' : 'Guardar'}
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-2">{editedPet.name}</h2>
                  <p className="mb-1">
                    <span className="font-semibold">Vacunas al día:</span>{' '}
                    {editedPet.vaccinated ? 'Sí' : 'No'}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Personalidad:</span>{' '}
                    {editedPet.personality}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Peso:</span> {editedPet.weight}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Detalles:</span> {editedPet.details}
                  </p>
                  <div className='flex flex-row justify-around'>
                    <button
                      className="mt-4 bg-main-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                      }}
                    >
                      Cerrar
                    </button>
                    <button
                      className="mt-4 bg-main-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true); // Activa el modo de edición
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <VistaEnlaceAdminUserPet />
      </div>
    </>
  );
}

PetProfileCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imagePet: PropTypes.string.isRequired,
    vaccinated: PropTypes.bool.isRequired,
    personality: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};

export default PetProfileCard;