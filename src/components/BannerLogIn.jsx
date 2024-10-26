import React from 'react';
import dogImage from "../assets/DogCatNight.png";
import servicesWork from "../assets/servicesWork.png";

const BannerLogIn = () => {
  return (
    <div className="flex justify-center space-x-4 py-4 mt-28">
        <div className="card bg-secondary shadow-md rounded-md flex font-semibold p-4">
            <div className="flex flex-col mt-7">
                <h2 className="text-white">¿Queres empezar a ser parte de nuestra comunidad?</h2>
                <button className="bg-white text-secondary rounded-xl mt-6 hover:bg-secondary transition duration-300 ease-in-out hover:text-white hover:border-white border-4 hover:scale-105">Agregar mascota</button>
            </div>
            <div className="mt-4">
                <img src={dogImage} alt="dog" />
            </div>
            
        </div>
        <div className="card bg-secondary shadow-md rounded-md flex font-semibold p-4">
            <div className="flex flex-col mt-7">
                <h2 className="text-white">¿Queres empezar a ser parte de nuestra comunidad?</h2>
                <button className="bg-white text-secondary rounded-xl mt-6 hover:bg-secondary transition duration-300 ease-in-out hover:text-white hover:border-white border-4 hover:scale-105">Agregar servicio</button>
            </div>
            <div className="mt-4">
                <img src={servicesWork} alt="working" />
            </div>
            
        </div>
    </div>
  );
};

export default BannerLogIn;