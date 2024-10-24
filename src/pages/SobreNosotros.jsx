import React from 'react';

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
  },
  {
    name: "Mauro",
    photo: photo,
    specialty: "Back-End Developer",
    country: argentinaFlag,
  },
  {
    name: "Fede",
    photo: photo,
    specialty: "UI/UX Designer",
    country: argentinaFlag,
  },
  {
    name: "María",
    photo: photo,
    specialty: "Back-End Developer",
    country: costaRicaFlag,
  },
  {
    name: "Gaston",
    photo: photo,
    specialty: "Front-End Developer",
    country: argentinaFlag,
  },
  {
    name: "Alejandro",
    photo: photo,
    specialty: "Front-End Developer",
    country: boliviaFlag,
  },
];

const SobreNosotros = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {developers.map((developer, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src={developer.photo}
                alt={developer.name}
              />
              <h3 className="text-xl font-bold text-gray-800">{developer.name}</h3>
              <p className="text-gray-600">{developer.specialty}</p>
              <div className="mt-4">
                <img
                  className="w-12 h-8 mx-auto"
                  src={developer.country}
                  alt={`Flag of ${developer.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
