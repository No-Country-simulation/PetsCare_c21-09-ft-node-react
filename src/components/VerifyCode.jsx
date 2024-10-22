import { apiUrl } from "../js/globalApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function VerifyCode() {
  const navigate = useNavigate();

  const [codigoVerificacionIngresado, setCodigoVerificacionIngresado] = useState("");
  const [codigoIncorrecto, setCodigoIncorrecto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [cuentaBloqueada, setCuentaBloqueada] = useState(false);

  const manejarVerificacion = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const emailAEnviar = localStorage.getItem("email");

    try {
      const response = await axios.post(apiUrl + "api/auth/verifycode", {
        emailAEnviar, codigoVerificacionIngresado
      });

      const verificado = response.data;

      if (verificado.message === "Error" && verificado.data === "error al verificar el usuario con los datos del email") {
        setCodigoIncorrecto(true);
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error en el servidor:", error.response.data);

      if (error.response && error.response.status === 400) {
        setCodigoIncorrecto(true);
      }

      if (error.response && error.response.status === 409) {
        setCuentaBloqueada(true);
      }

      setTimeout(() => {
        setCodigoIncorrecto(false);
        setCuentaBloqueada(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={manejarVerificacion} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-700 text-center">
            Verificación de Código
          </h1>

          <div className="space-y-4">
            <div className="relative">
              <i className="ri-mail-send-line absolute left-3 top-3 text-gray-500"></i>
              <input
                id="codigoVerificacion"
                type="string"
                placeholder="Ingrese su código"
                value={codigoVerificacionIngresado}
                onChange={(e) => setCodigoVerificacionIngresado(e.target.value)}
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <button
            className={`w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verificando..." : "Verificar"}
          </button>

          {codigoIncorrecto && (
            <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md text-center">
              Por favor revisa el código de verificación y vuelve a ingresarlo.
            </div>
          )}

          {cuentaBloqueada && (
            <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md text-center">
              Tu cuenta ha sido bloqueada por múltiples intentos fallidos. Comunícate con soporte técnico.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
