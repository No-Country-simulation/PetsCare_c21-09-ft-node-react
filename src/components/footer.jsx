import { useState } from "react";
import Dog from "../assets/dog.png"

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <footer className="bg-secondary text-white py-8  flex flex-col">
      <div className="w-full px-4">
        <div className="flex md:flex-row md:justify-between p-10 ">
          <div className="flex flex-wrap w-full md:w-1/3 mb-6 md:mb-0">
            <img src={Dog} alt="" srcset="" className="size-32 "/>
            <h3 className="text-2xl font-bold mb-2 m-10">Cuidados Peludos</h3>
          </div>

          <div className='flex flex-col md:mx-auto'> 
            <h3 className='text-2xl font-bold mb-2'>Contacto</h3>
            <p  className='text-white font-bold  '>Email: contacto@cuidadospeludos.com</p>
            <p  className='text-white font-bold  '>Telefono: +54 9 55555555</p>
          </div>
          
          <div className="mt-6 w-full md:w-1/3 md:mx-auto">
            <button
              onClick={toggleTerms}
              className="bg-white p-2 font-bold text-secondary rounded-xl mt-6 hover:bg-secondary transition duration-300 ease-in-out hover:text-white hover:border-white border-4 hover:scale-105 ml-20"
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
        {showTerms && (
          <div className="mt-8 p-4 bg-primary rounded">
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
              9. Al utilizar nuestros servicios, usted acepta estos términos y condiciones.
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
