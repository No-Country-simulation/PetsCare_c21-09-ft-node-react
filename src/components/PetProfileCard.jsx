import { useState } from 'react'

function PetProfileCard({ pet }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className={`bg-white rounded-lg shadow-md transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-48 cursor-pointer'
      }`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <img 
        src={pet.image} 
        alt={pet.name} 
        className={`w-full rounded-t-lg ${isExpanded ? 'h-48 object-cover' : 'h-32'}`}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pet.name}</h2>
        {isExpanded && (
          <>
            <p className="mb-1">
              <span className="font-semibold">Vacunas al día:</span> {pet.vaccinated ? 'Sí' : 'No'}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Personalidad:</span> {pet.personality}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Peso:</span> {pet.weight}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Detalles:</span> {pet.details}
            </p>
            <button 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
            >
              Cerrar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PetProfileCard