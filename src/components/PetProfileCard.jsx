import { useState } from 'react'

function PetProfileCard({ pet }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className={`bg-white rounded-lg shadow-md transition-all duration-300 ${
        isExpanded ? 'w-full col-span-2' : 'w-full cursor-pointer'
      }`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <div className={`flex ${isExpanded ? 'flex-row' : 'flex-col'}`}>
        <img 
          src={pet.image} 
          alt={pet.name} 
          className={`rounded-t-lg ${isExpanded ? 'w-1/3 h-full object-cover rounded-l-lg rounded-t-none' : 'w-full h-32 object-cover'}`}
        />
        <div className={`p-4 ${isExpanded ? 'w-2/3' : 'w-full'}`}>
          <h2 className="text-xl font-bold mb-2">{pet.name}</h2>
          {isExpanded ? (
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
                className="mt-4 bg-main-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(false)
                }}
              >
                Cerrar
              </button>
            </>
          ) : (
            <p className="text-gray-600">Clic para más detalles</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PetProfileCard