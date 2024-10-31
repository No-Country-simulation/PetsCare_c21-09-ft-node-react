
import { FaLinkedin, FaGithub } from "react-icons/fa";
import aleImg from "../assets/ale.jpeg"
import mauroImg from "../assets/mauro.jpeg"
import fedeImg from "../assets/fede.jpeg"
import mariaImg from "../assets/maria.jpeg"
import walterImg from "../assets/walter.jpeg"
import gastonImage from "../assets/gaston.jpeg";
// URL de fotos de perfil y banderas
const photo = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
const argentinaFlag = 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg';
const costaRicaFlag = 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Costa_Rica.svg';
const boliviaFlag = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_Bolivia_%28state%29.svg';

const developers = [
  {
    name: "Walter",
    photo: walterImg,
    specialty: "Front-End Developer",
    country: argentinaFlag,
    description: "Apasionado del diseño de interfaces y experiencia de usuario.",
    linkedin: "https://www.linkedin.com/in/walter-mersing?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/walter",
  },
  {
    name: "Mauro",
    photo: mauroImg,
    specialty: "Back-End Developer",
    country: argentinaFlag,
    description: "Especialista en bases de datos y desarrollo del lado del servidor.",
    linkedin: "https://www.linkedin.com/in/mauro-rosales-rocfar/",
    github: "https://github.com/mauro",
  },
  {
    name: "Fede",
    photo: fedeImg,
    specialty: "UI/UX Designer",
    country: argentinaFlag,
    description: "Diseñador dedicado a mejorar la usabilidad y estética de interfaces.",
    linkedin: "https://www.linkedin.com/in/fedemerediz?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/fede",
  },
  {
    name: "María",
    photo: mariaImg,
    specialty: "Back-End Developer",
    country: costaRicaFlag,
    description: "Experta en lógica de negocios y seguridad en el desarrollo.",
    linkedin: "https://www.linkedin.com/in/mar%C3%ADa-villalobos-chaves/",
    github: "https://github.com/maria",
  },
  {
    name: "Gaston",
    photo: gastonImage,
    specialty: "Front-End Developer",
    country: argentinaFlag,
    description: "Desarrollador enfocado en la creación de interfaces interactivas.",
    linkedin: "https://www.linkedin.com/in/gaston-gomez1997",
    github: "https://github.com/gaston",
  },
  {
    name: "Alejandro",
    photo: aleImg,
    specialty: "Front-End Developer",
    country: boliviaFlag,
    description: "Creador de experiencias de usuario dinámicas y modernas.",
    linkedin: "https://www.linkedin.com/in/alejandro-camacho19/",
    github: "https://github.com/alejandro",
  },
];


const SobreNosotros = () => {
  return (
    <div className="min-h-screen bg-white py-16 mt-12">
      <div className="container mx-auto px-6 space-y-16">
        
               
  
        {/* Meet Our Team Section */}
        <section>
          <h1 className="text-5xl font-bold text-center text-primary mb-16">Nuestro Equipo</h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {developers.map((developer, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl text-center border-2 border-secondary transition duration-300 ease-in-out hover:scale-105 hover:shadow-3xl hover:shadow-secondary"
              >
                <img
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-secondary"
                  src={developer.photo}
                  alt={developer.name}
                />
                <h3 className="text-2xl font-bold text-secondary">{developer.name}</h3>
                <p className="text-primary font-semibold mb-4 text-lg">{developer.specialty}</p>
                
                {/* Short Description */}
                <p className="text-primary text-sm italic mb-6 leading-relaxed">
                  {developer.description}
                </p>
    
                {/* Social Media Links */}
                <div className="flex justify-center space-x-6 mt-4">
                  <a href={developer.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition duration-300 ease-in-out">
                    <FaLinkedin size={24} />
                  </a>
                  <a href={developer.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition duration-300 ease-in-out">
                    <FaGithub size={24} />
                  </a>
                </div>
    
                {/* Country Flag */}
                <div className="mt-6">
                  <img
                    className="w-16 h-10 mx-auto border border-secondary rounded-lg"
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
