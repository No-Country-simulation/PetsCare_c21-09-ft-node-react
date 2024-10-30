import React, { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    comments: "",
  });

  // Manejar los cambios en los campos del formulario y actualizar el estado
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Mostrar formData en consola cuando cambie
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-light-blue via-blue-200 to-light-blue flex items-center justify-center py-20 px-8">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-12 border-4 border-light-violet space-y-8 relative">
        
        {/* Imagen decorativa */}
        <div className="flex justify-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1555685812-4b74353e0311?fit=crop&w=300&h=300&q=80"
            alt="Happy pet"
            className="w-32 h-32 object-cover rounded-full shadow-md"
          />
        </div>

        {/* Título */}
        <h1 className="text-5xl font-playfair font-bold text-primary mb-4 text-center">CONTACT</h1>
        
        {/* Pregunta inicial */}
        <p className="text-xl text-center text-gray-800 mb-8">
          Do you have any query or problem? Contact us
        </p>
        
        {/* Mensaje de invitación */}
        <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed max-w-2xl mx-auto">
          If you have any questions or need more information about our pet care services, feel free to reach out!
        </p>
  
        {/* Formulario */}
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="text-lg text-gray-800 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300 shadow-sm focus:shadow-lg"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="lastname" className="text-lg text-gray-800 font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300 shadow-sm focus:shadow-lg"
              placeholder="Enter your last name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="text-lg text-gray-800 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300 shadow-sm focus:shadow-lg"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="comments" className="text-lg text-gray-800 font-semibold">
              Comments
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all duration-300 shadow-sm focus:shadow-lg"
              placeholder="Your comments or questions"
              rows="5"
            ></textarea>
          </div>
          
          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gradient-to-l transition-all duration-300 ease-in-out"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
