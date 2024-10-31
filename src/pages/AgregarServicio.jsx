import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { apiUrl } from "../js/globalApi";
import { jwtDecode } from "jwt-decode";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function AgregarServicio() {
  const navigate = useNavigate();

  const [nombreServicio, setNombreServicio] = useState("");
  const [nombreComercio, setNombreComercio] = useState("");
  const [observacion, setObservacion] = useState("");
  const [lugarFisico, setLugarFisico] = useState(false);
  const [voyAlLugar, setVoyAlLugar] = useState(false);
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [estadoDepartamento, setEstadoDepartamento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [priceHour, setPriceHour] = useState("");
  const [latitud, setLatitud] = useState(-34.6037);
  const [longitud, setLongitud] = useState(-58.3816);
  const [imagenServicio, setImagenServicio] = useState(null);

  const [mensaje, setMensaje] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [esError, setEsError] = useState(false);

  const handleLocationSelect = (location) => {
    setLatitud(location.lat);
    setLongitud(location.lng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombreServicio", nombreServicio);
    formData.append("nombreComercio", nombreComercio);
    formData.append("observacion", observacion);
    formData.append("lugarFisico", lugarFisico);
    formData.append("voyAlLugar", voyAlLugar);
    formData.append("pais", pais);
    formData.append("provincia", provincia);
    formData.append("estadoDepartamento", estadoDepartamento);
    formData.append("direccion", direccion);
    formData.append("priceHour", priceHour);
    formData.append("latitud", latitud);
    formData.append("longitud", longitud);
    formData.append("imagenServicio", imagenServicio);

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idUsuario = decodedToken.idUser;

    formData.append("idUsuario", idUsuario);

    try {
      const response = await axios.post(
        `${apiUrl}api/servicios/crearservicio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setEsError(false);
      setMensaje("Servicio agregado exitosamente");
      setMostrarMensaje(true);

      // Redirigir a /mis-servicios después de 3 segundos
      setTimeout(() => {
        setMostrarMensaje(false);
        navigate("/admin-servicios");
      }, 3000);
    } catch (error) {
      // Mostrar mensaje de error si hay conflicto
      if (error.response && error.response.status === 409) {
        setEsError(true);
        setMensaje(error.response.data); //m enviado desde el backend
        setTimeout(() => {
          setEsError(false);
          navigate("/mis-servicios");
        }, 3000);
      } else {
        console.error("Error al agregar el servicio:", error);
        setEsError(true);
        setMensaje(
          "Error al agregar el servicio. Por favor, inténtalo de nuevo."
        );

        setTimeout(() => {
          setEsError(false);
          navigate("/mis-servicios");
        }, 3000);
      }
      setMostrarMensaje(true);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        handleLocationSelect(e.latlng);
      },
    });

    return latitud === null ? null : <Marker position={[latitud, longitud]} />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Agregar Nuevo Servicio
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="tipoServicio" className="text-gray-700">
            Tipo de Servicio
          </label>
          <select
            id="tipoServicio"
            className="p-2 border border-gray-300 rounded"
            value={nombreServicio} // Aquí estás usando el mismo estado de `nombreServicio` para simplificar
            onChange={(e) => setNombreServicio(e.target.value)}
            required
          >
            <option value="">Selecciona un tipo de servicio</option>
            <option value="VETERINARIA">Veterinaria</option>
            <option value="PASEO_DE_MASCOTAS">Paseo de Mascotas</option>
            <option value="CUIDADO_DE_MASCOTAS">Cuidado de Mascotas</option>
            <option value="TRANSPORTE_DE_MASCOTAS">
              Transporte de Mascotas
            </option>
            <option value="PELUQUERIA">Peluqueria</option>
          </select>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="nombreComercio" className="text-gray-700">
              Nombre del Comercio
            </label>
            <input
              type="text"
              id="nombreComercio"
              className="p-2 border border-gray-300 rounded"
              value={nombreComercio}
              onChange={(e) => setNombreComercio(e.target.value)}
              required
            />
          </div>

          <label htmlFor="observacion" className="text-gray-700">
            Observaciones
          </label>
          <textarea
            id="observacion"
            className="p-2 border border-gray-300 rounded"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-row space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lugarFisico"
              checked={lugarFisico}
              onChange={(e) => setLugarFisico(e.target.checked)}
            />
            <label htmlFor="lugarFisico" className="ml-2 text-gray-700">
              ¿Tiene lugar físico?
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="voyAlLugar"
              checked={voyAlLugar}
              onChange={(e) => setVoyAlLugar(e.target.checked)}
            />
            <label htmlFor="voyAlLugar" className="ml-2 text-gray-700">
              ¿Voy al lugar?
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="pais" className="text-gray-700">
              País
            </label>
            <input
              type="text"
              id="pais"
              className="p-2 border border-gray-300 rounded"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="provincia" className="text-gray-700">
              Provincia
            </label>
            <input
              type="text"
              id="provincia"
              className="p-2 border border-gray-300 rounded"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="estadoDepartamento" className="text-gray-700">
              Partido/Departamento
            </label>
            <input
              type="text"
              id="estadoDepartamento"
              className="p-2 border border-gray-300 rounded"
              value={estadoDepartamento}
              onChange={(e) => setEstadoDepartamento(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="direccion" className="text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              className="p-2 border border-gray-300 rounded"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="priceHour" className="text-gray-700">
            Precio por Hora en $
          </label>
          <input
            type="text"
            id="priceHour"
            className="p-2 border border-gray-300 rounded"
            value={priceHour}
            onChange={(e) => setPriceHour(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="imagenServicio" className="text-gray-700">
            Imagen del Servicio
          </label>
          <input
            type="file"
            id="imagenServicio"
            className="p-2 border border-gray-300 rounded"
            onChange={(e) => setImagenServicio(e.target.files[0])}
            required
          />
        </div>

        <div className="h-64 mt-4">
          <MapContainer
            center={[-34.6037, -58.3816]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>

        <button
          type="submit"
          className="w-full bg-main-blue text-white py-2 px-4 rounded-md"
        >
          Agregar Servicio
        </button>
      </form>

      {mostrarMensaje && (
        <div
          className={`mt-4 p-4 rounded-md text-center ${
            esError ? "text-red-700 bg-red-100" : "text-green-700 bg-green-100"
          }`}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
}
