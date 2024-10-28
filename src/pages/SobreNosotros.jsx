
import { FaLinkedin, FaGithub } from 'react-icons/fa';
// URL de fotos de perfil y banderas
const photo = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
const argentinaFlag = 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg';
const costaRicaFlag = 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Costa_Rica.svg';
const boliviaFlag = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_Bolivia_%28state%29.svg';

const developers = [
  {
    name: "Walter",
    photo: photo,
    specialty: "Front-End Developer",
    country: argentinaFlag,
    description: "Apasionado del diseño de interfaces y experiencia de usuario.",
  },
  {
    name: "Mauro",
    photo: photo,
    specialty: "Back-End Developer",
    country: argentinaFlag,
    description: "Especialista en bases de datos y desarrollo del lado del servidor.",
  },
  {
    name: "Fede",
    photo: photo,
    specialty: "UI/UX Designer",
    country: argentinaFlag,
    description: "Diseñador dedicado a mejorar la usabilidad y estética de interfaces.",
  },
  {
    name: "María",
    photo: photo,
    specialty: "Back-End Developer",
    country: costaRicaFlag,
    description: "Experta en lógica de negocios y seguridad en el desarrollo.",
  },
  {
    name: "Gaston",
    photo: photo,
    specialty: "Front-End Developer",
    country: argentinaFlag,
    description: "Desarrollador enfocado en la creación de interfaces interactivas.",
  },
  {
    name: "Alejandro",
    photo: photo,
    specialty: "Front-End Developer",
    country: boliviaFlag,
    description: "Creador de experiencias de usuario dinámicas y modernas.",
  },
];

const SobreNosotros = () => {
  return (
    <div className="min-h-screen bg-light-blue py-12">
      <div className="container mx-auto px-4 space-y-16">
        
        {/* About Us Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Bienvenido a nuestra aplicación de servicios para mascotas, diseñada para facilitar el cuidado integral de tus animales
            queridos. Ofrecemos soluciones confiables y amorosas para todas sus necesidades, desde atención veterinaria hasta paseos
            diarios. Nos enorgullece contar con un equipo experimentado y apasionado por el bienestar de nuestras mascotas.
          </p>
        </section>
  
        {/* Our Services Section */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-primary mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {["Guardería", "Educación", "Veterinaria", "Paseo de Perros", "Peluquería"].map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-light-violet hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-secondary">{service}</h3>
              </div>
            ))}
          </div>
        </section>
  
        {/* Meet Our Team Section */}
        <section>
          <h1 className="text-4xl font-bold text-center text-primary mb-12">Meet Our Team</h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {developers.map((developer, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-main-blue transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <img
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-secondary"
                  src={developer.photo}
                  alt={developer.name}
                />
                <h3 className="text-xl font-bold text-secondary">{developer.name}</h3>
                <p className="text-main-blue mb-4">{developer.specialty}</p>
                
                {/* Short Description */}
                <p className="text-gray-600 text-sm italic mb-4">
                  {developer.description}
                </p>
    
                {/* Social Media Links */}
                <div className="flex justify-center space-x-4 mt-2">
                  <a href={developer.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={developer.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
                    <FaGithub size={20} />
                  </a>
                </div>
    
                {/* Country Flag */}
                <div className="mt-4">
                  <img
                    className="w-12 h-8 mx-auto border border-light-violet rounded"
                    src={developer.country}
                    alt={`Flag of ${developer.name}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
  
      </div>
    </div>
  );
  
};

export default SobreNosotros;
