import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../js/globalApi";
import imagenRegister from "../assets/imagenRegister.svg";

export default function Register() {
  const lastClickTimeRef = useRef(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [role, setRole] = useState(null); // El rol se selecciona entre "cliente" o "prestador"
  const [showForm, setShowForm] = useState(false); // Controla si se muestra el formulario

  const navigate = useNavigate(); // Redirigir luego de exitoso registro

  const [errorMessage, setErrorMessage] = useState("");
  const [mostrarError, setMostrarError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [camposVacios, setCamposVacios] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordReg, setPasswordReg] = useState(false);
  const [nameUserValid, setNameUserValid] = useState(false);

  const removeWhiteSpace = (value) => value.replace(/^\s+/g, "");

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setShowForm(true); // Mostrar el formulario después de seleccionar un rol
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      password.trim() === "" ||
      repeatPassword.trim() === ""
    ) {
      setCamposVacios(true);
      setTimeout(() => {
        setCamposVacios(false);
      }, 2000);
      return;
    }

    const nameUserRegex = /^[\s\S]{1,13}$/;
    if (!nameUserRegex.test(username)) {
      setNameUserValid(true);
      setTimeout(() => {
        setNameUserValid(false);
      }, 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidEmail(true);
      setTimeout(() => {
        setValidEmail(false);
      }, 2000);
      return;
    }

    const phoneRegex = /^[1-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setValidPhone(true);
      setTimeout(() => {
        setValidPhone(false);
      }, 2000);
      return;
    }

    const passwordRegex = /^.{4,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordReg(true);
      setTimeout(() => {
        setPasswordReg(false);
      }, 3000);
      return;
    }

    if (password !== repeatPassword) {
      setPasswordValid(true);
      setTimeout(() => {
        setPasswordValid(false);
      }, 3000);
      return;
    }

    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastClickTimeRef.current;
    const minTimeBetweenClicks = 5000;

    if (timeDifference < minTimeBetweenClicks) {
      console.log("Por favor, espera al menos 5 segundos entre clics.");
      return;
    }

    lastClickTimeRef.current = currentTime;
    setIsSubmitting(true);

    const endpoint = role === "prestador" ? "prestador" : "cliente";

    try {
      const response = await axios.post(
        `${apiUrl}api/auth/${endpoint}`,
        {
          username: username,
          email: email,
          phone: phone,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "Error") {
        setErrorMessage(response.data.response);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        localStorage.setItem("email", email);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 4500);
        navigate("/verify");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.response || "Error al procesar la solicitud."
        );
        setMostrarError(true);
        setTimeout(() => {
          setMostrarError(false);
          setErrorMessage("");
        }, 5000);
      } else {
        setErrorMessage("Error al procesar la solicitud.");
        setMostrarError(true);
        setTimeout(() => {
          setErrorMessage("");
          setMostrarError(false);
        }, 5000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {!showForm ? (
     <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 ">
     <img src={imagenRegister} alt="Mascota" className="w-32 h-32" />
     <div className="text-center  max-w-md mx-auto p-6 bg-gray-100 ">
       <h1 className="text-3xl font-bold text-gray-800">
         ¿Qué tipo de usuario eres?
       </h1>
       <p className="text-gray-600">
         Selecciona tu rol para continuar
       </p>
       <div className="flex justify-around mt-4 space-x-4">
         <button
           onClick={() => handleRoleSelection("cliente")}
           className={`py-3 px-8 text-lg rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-600 hover:text-white ${
             role === "cliente" ? "bg-blue-500 text-white" : "bg-main-blue text-gray-900"
           }`}
         >
           Dueño de Mascota
         </button>
         <button
           onClick={() => handleRoleSelection("prestador")}
           className={`py-3 px-8 text-lg rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-600 hover:text-white ${
             role === "prestador" ? "bg-blue-500 text-white" : "bg-main-blue text-gray-900"
           }`}
         >
           Prestador de Servicios
         </button>
       </div>
     </div>
   </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-700 text-center">
              Registro de {role === "prestador" ? "Prestador de Servicios" : "Dueño de Mascota"}
            </h1>

            {/* Campos de registro */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  id="nameUser"
                  type="string"
                  placeholder="Nombre de Usuario"
                  value={username}
                  onChange={(e) =>
                    setUsername(removeWhiteSpace(e.target.value))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(removeWhiteSpace(e.target.value))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) =>
                    setPhone(removeWhiteSpace(e.target.value))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <input
                  id="login-pass"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) =>
                    setPassword(removeWhiteSpace(e.target.value))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <input
                  id="login-pass2"
                  type="password"
                  placeholder="Repite la Contraseña"
                  value={repeatPassword}
                  onChange={(e) =>
                    setRepeatPassword(removeWhiteSpace(e.target.value))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 bg-main-blue text-white rounded-md hover:bg-primary-dark transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Enviando..." : "Registrarse"}
            </button>

            <p className="text-center text-gray-600">
              ¿Tienes una cuenta?{" "}
              <Link to="/signin" className="text-primary hover:underline">
                Inicia Sesión
              </Link>
            </p>

            {camposVacios && (
              <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
                Ningún campo puede permanecer vacío.
              </div>
            )}

            {validEmail && (
              <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
                El formato del email es inválido, verifique y vuelva a intentarlo.
              </div>
            )}

            {nameUserValid && (
              <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
                El campo nombre de usuario admite un máximo de 13 caracteres.
              </div>
            )}

            {validPhone && (
              <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
                El número telefónico debe tener 10 caracteres y no comenzar con el número 0.
              </div>
            )}

            {passwordValid && (
              <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
                Las contraseñas ingresadas deben ser idénticas.
              </div>
            )}

            {passwordReg && (
              <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
                La contraseña debe contener al menos 4 caracteres.
              </div>
            )}
          </form>
        )}

        {/* Mensajes de éxito y error */}
        {isSubmitted && (
          <div className="mt-4 p-4 text-green-700 bg-green-100 rounded-md">
            Se registró exitosamente {username}, ahora inicia sesión con tu
            nombre de usuario y contraseña.
          </div>
        )}

        {mostrarError && (
          <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

