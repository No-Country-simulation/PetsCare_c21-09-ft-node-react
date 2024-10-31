import { useState } from "react";
import Dog from "../assets/dog.png";

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <footer className="bg-secondary w-full h-auto relative text-white py-8 flex flex-col z-50">
      <div className="w-full px-4">
        <div className="flex flex-col md:flex-row md:justify-between p-1">
          <div className="flex items-center w-full md:w-1/3 mb-6 md:mb-0">
            <img src={Dog} alt="Dog Logo" className="w-8 h-8 mr-4" />
            <h3 className="text-2xl font-bold">Cuidados Peludos</h3>
          </div>

          <div className="flex flex-col text-center md:text-left md:mx-auto mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Contacto</h3>
            <p className="font-bold">Email: contacto@cuidadospeludos.com</p>
            <p className="font-bold">Teléfono: +54 9 55555555</p>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <button
              onClick={toggleTerms}
              className="bg-white p-2 font-bold text-secondary rounded-xl mt-6 md:mt--10 hover:bg-secondary transition duration-300 ease-in-out hover:text-white hover:border-white border-4 hover:scale-105"
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
        {showTerms && (
          <div className="mt-8 p-4 bg-primary rounded w-full md:w-2/3 mx-auto break-words">
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


