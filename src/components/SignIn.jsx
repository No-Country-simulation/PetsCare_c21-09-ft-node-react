import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { apiUrl} from "../js/globalApi";

export default function SignIn() {
  const navigate = useNavigate();
  const { login, logout } = useContext(AuthContext);

  const [mostrarError, setMostrarError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Bloquear el botón de enviar
  
    try {
      const response = await axios.post(apiUrl + "api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("email", email);
      const tokenOrMessage = response.data.jwt;
  
      if (response.status === 200) {
        localStorage.setItem("token", tokenOrMessage);
        const decodedToken = jwtDecode(tokenOrMessage);
        const usuarioFromToken = decodedToken.sub;
        localStorage.setItem("username", usuarioFromToken);
        login(usuarioFromToken);
  
        const timeUntilExpiration = decodedToken.exp * 1000 - Date.now();
  
        setTimeout(() => {
          logout(); // Cierra la sesión automáticamente cuando el token expire
        }, timeUntilExpiration);
  
        navigate("/"); // Redirige al home
      } else if (response.status === 401 && tokenOrMessage === "Usuario no verificado. Se ha enviado un nuevo código de verificación.") {
        setErrorMessage("Tu cuenta no está verificada. Revisa tu correo electrónico, se ha enviado un nuevo código de verificación.");
        setMostrarError(true);
  
        setTimeout(() => {
          setMostrarError(false);
        }, 3000);
        navigate("/verify");
        return;
      } else if (response.status === 401) {
        setErrorMessage(tokenOrMessage);
        setMostrarError(true);
      }
    } catch (error) {
      setIsSubmitted(false);
      if (error.response) {
        const { status, data } = error.response;
        console.error("Error en el servidor:", data);
        if (status === 423) {
          setErrorMessage("Tu cuenta está bloqueada debido a múltiples intentos fallidos. Comunícate con soporte.");
          setMostrarError(true);
          setTimeout(() => {
            setMostrarError(false);
          }, 7000);
        } else if (status === 401 && data.jwt === "Usuario no verificado. Se ha enviado un nuevo código de verificación.") {
          setErrorMessage("Tu cuenta no está verificada. Revisa tu correo electrónico.");
          setMostrarError(true);
  
          setTimeout(() => {
            setMostrarError(false);
            navigate("/verify");
          }, 3000);
          return;
        } else if (status === 401) {
          setErrorMessage(data.jwt);
        } else {
          setErrorMessage("Ha ocurrido un error al iniciar sesión.");
        }
      } else {
        console.error("Error de red:", error.message);
        setErrorMessage("Error de conexión. Verifica tu conexión a Internet.");
      }
  
      setMostrarError(true);
      setTimeout(() => {
        setMostrarError(false);
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsSubmitted(false); 
    }
  };
  
  const removeWhiteSpace = (value) => value.replace(/^\s+/g, "");

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("login-pass");
    const eyeIcon = document.getElementById("login-eye");

    if (passwordInput && eyeIcon) {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("ri-eye-off-line");
        eyeIcon.classList.add("ri-eye-line");
      } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("ri-eye-line");
        eyeIcon.classList.add("ri-eye-off-line");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-700 text-center">
            Ingresa a tu Cuenta
          </h1>

          <div className="space-y-4">
            <div className="relative">
              <i className="ri-mail-line absolute left-3 top-3 text-gray-500"></i>
              <input
                type="email"
                name="email"
                required
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(removeWhiteSpace(e.target.value))}
              />
            </div>

            <div className="relative">
              <i className="ri-lock-line absolute left-3 top-3 text-gray-500"></i>
              <input
                type="password"
                name="password"
                required
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Contraseña"
                id="login-pass"
                value={password}
                onChange={(e) => setPassword(removeWhiteSpace(e.target.value))}
              />
              <i
                className="ri-eye-off-line absolute right-3 top-3 cursor-pointer text-gray-500"
                id="login-eye"
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>

          <button
            className={`w-full py-2 bg-main-blue text-white rounded-md hover:bg-primary-dark transition ${
              isSubmitted ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isSubmitted}
          >
            {isSubmitted ? "Procesando..." : "Iniciar Sesión"}
          </button>

          <p className="text-center text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Regístrate
            </Link>
          </p>
          <p className="text-center text-gray-600">
            <Link to="/forgot-password" className="text-primary hover:underline">
              Olvidé mi contraseña
            </Link>
          </p>
        </form>

        {mostrarError && (
          <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        {isSubmitted && (
          <div className="mt-4 p-4 text-green-700 bg-green-100 rounded-md text-center">
            Procesando su solicitud
          </div>
        )}
      </div>
    </div>
  );
}
