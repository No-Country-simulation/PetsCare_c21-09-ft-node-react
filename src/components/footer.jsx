import { useState } from "react";

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);

  const toggleTerms = () => {
    console.log("Estoy funcionando")
    setShowTerms(!showTerms);
  };

  return (
    <footer className="bg-main-blue text-white py-8  flex flex-col">
      <div className="w-full px-4 ">
        <div className="flex flex-col flex-wrap justify-between items-start md:flex-row md:justify-between  ">
          <div className="flex flex-col flex-wrap justify-between gap-4 w-full md:w-1/3 mb-6 md:mb-0">
            <a href='' className='text-white font-bold hover:text-light-violet hover:fill-light-violet  transition duration-300'>
            <svg  width="32"  height="32"  viewBox="0 0 32 32"  className="svg-icon" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 24V27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M11.5 19C12.3284 19 13 18.3284 13 17.5C13 16.6716 12.3284 16 11.5 16C10.6716 16 10 16.6716 10 17.5C10 18.3284 10.6716 19 11.5 19Z" fill="currentColor" />
              <path d="M20.5 19C21.3284 19 22 18.3284 22 17.5C22 16.6716 21.3284 16 20.5 16C19.6716 16 19 16.6716 19 17.5C19 18.3284 19.6716 19 20.5 19Z" fill="currentColor" />
              <path d="M18 22L16 24L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M19 5.99994L25.975 4.26244C26.1065 4.22934 26.2433 4.22332 26.3772 4.24475C26.5111 4.26618 26.6392 4.31461 26.7538 4.3871C26.8684 4.45959 26.967 4.55462 27.0437 4.66642C27.1204 4.77822 27.1736 4.90445 27.2 5.03744L29.25 15.9874C29.4375 17.0124 28.125 17.6124 27.475 16.7874L19 5.99994Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M13.0001 5.99994L6.02508 4.26244C5.8936 4.22934 5.75676 4.22332 5.62288 4.24475C5.489 4.26618 5.36087 4.31461 5.24629 4.3871C5.13171 4.45959 5.03307 4.55462 4.95636 4.66642C4.87965 4.77822 4.82648 4.90445 4.80008 5.03744L2.75008 15.9874C2.56258 17.0124 3.87508 17.6124 4.52508 16.7874L13.0001 5.99994Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M13 6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M26 14.9125V23C26 24.0608 25.5786 25.0783 24.8284 25.8284C24.0783 26.5785 23.0609 27 22 27H10C8.93913 27 7.92172 26.5785 7.17157 25.8284C6.42143 25.0783 6 24.0608 6 23V14.9125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            </a>
            <h3 className="text-2xl font-bold mb-2">Cuidados Peludos</h3>
            </div>
          <div className='flex flex-col md:mx-auto'> 
            <h3 className='text-2xl font-bold mb-2'>Contacto</h3>
            <p  className='text-white font-bold  '>Email: contacto@cuidadospeludos.com</p>
            <p  className='text-white font-bold  '>Telefono: +54 9 55555555</p>
          </div>
          
          <div className="mt-6 w-full md:w-1/3 md:mx-auto">
            <button
              onClick={toggleTerms}
              className="bg-white text-main-blue px-4 py-2 rounded hover:bg-blue-100 transition duration-300"
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
        {showTerms && (
          <div className="mt-8 p-4 bg-light-violet rounded">
            <h4 className="text-lg font-semibold mb-2">Términos y Condiciones</h4>
            <p className="text-sm">
              1. Nuestros servicios están sujetos a disponibilidad.<br />
              2. Los precios pueden cambiar sin previo aviso.<br />
              3. Se requiere reserva previa para todos los servicios.<br />
              4. Nos reservamos el derecho de rechazar el servicio a cualquier cliente.<br />
              5. Los clientes son responsables de proporcionar información precisa sobre la salud y el comportamiento de sus mascotas.<br />
              6. No nos hacemos responsables por lesiones o enfermedades que ocurran durante el cuidado, a menos que se demuestre negligencia por nuestra parte.<br />
              7. El pago completo se requiere al momento de la reserva o al dejar a la mascota, según el servicio.<br />
              8. Las cancelaciones deben hacerse con al menos 24 horas de anticipación para recibir un reembolso completo.<br />
              9. Al utilizar nuestros servicios, usted acepta estos términos y condicioneAS.
            </p>
          </div>
        )}
        <div className="mt-8 text-center text-sm">
          © 2024 Cuidado Peludo. Todos los derechos reservados a No Country.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
