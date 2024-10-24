import React from "react";
import ErrorImage from "../assets/Error404.png"

function Error404(){

    return (
        <div className="">
            <div className="flex flex-col justify-center items-center bg-secondary h-2/3 min-w-full py-4 mt-8 mb-8">
                <h2 className="text-white font-bold lg text-lg px-2 md:text-2xl">Parece que la página que estás buscando no existe</h2>
                <img src={ErrorImage} alt="error" />
                <p className="text-white font-bold text-lg px-2 md:text-xl">Pero no te preocupes, aqui tienes algunas opciones para volver al camino correcto:</p>
            </div>
            <div className="flex flex-row justify-center gap-12 w-full">
                <a href=""><button className="bg-secondary rounded border-2 font-bold border-white text-base  text-white p-3 hover:bg-primary transition duration-500 md:p-5 md:text-lg">Regresa a la página de inicio</button></a>
                <a href=""><button className=" bg-secondary rounded border-2 font-bold border-white text-base  text-white p-3 hover:bg-primary transition duration-500 md:p-5 md:text-lg">Regresa a la página de servicios</button></a>
            </div>
        </div>
        
    )
}

export default Error404;
