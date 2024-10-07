import React from 'react'

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">Inserte Nombre</a>
        <div>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg mr-2 hover:bg-blue-100 transition duration-300">Registrarse</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Iniciar Sesión</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
