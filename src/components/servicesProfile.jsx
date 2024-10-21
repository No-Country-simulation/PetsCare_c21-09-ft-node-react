import React from 'react';
import veterinary from "../assets/veterinary.png"

const servicesProfile = () => {
  return (
    <div className="flex justify-center">
        <div className="card w-1/2 bg-white shadow-md rounded-md p-4 flex flex-col items-center">
            <img src={veterinary} alt="Usuario" className="w-24 h-24 rounded-full object-cover"/>
            <h2 className="mt-4 text-lg font-semibold">Nombre del Usuario</h2>
            <div className="mt-4 space-y-2 text-center">
                <a href="URL_PROFILE" className="flex items-center space-x-2">
                    <img src="URL_ICONO_PROFILE" alt="Profile Icon" className="w-6 h-6"/>
                    <span>Profile</span>
                </a>
                <a href="URL_PUBLICATIONS" className="flex items-center space-x-2">
                    <img src="URL_ICONO_PUBLICATIONS" alt="Publications Icon" className="w-6 h-6"/>
                    <span>Publications</span>
                </a>
                <a href="URL_MESSAGES" className="flex items-center space-x-2">
                    <img src="URL_ICONO_MESSAGES" alt="Messages Icon" className="w-6 h-6"/>
                    <span>Messages</span>
                </a>
                <a href="URL_NOTIFICATIONS" className="flex items-center space-x-2">
                    <img src="URL_ICONO_NOTIFICATIONS" alt="Notifications Icon" className="w-6 h-6"/>
                    <span>Notifications</span>
                </a>
                <a href="URL_MY_SERVICES" className="flex items-center space-x-2">
                    <img src="URL_ICONO_MY_SERVICES" alt="My Services Icon" className="w-6 h-6"/>
                    <span>My services</span>
                </a>
                <a href="URL_DELETE_PROFILE" className="flex items-center space-x-2 text-red-500">
                <img src="URL_ICONO_DELETE_PROFILE" alt="Delete Profile Icon" className="w-6 h-6"/>
                <span>Delete profile</span>
                </a>
            </div>
        </div>
    </div>
  );
};

export default servicesProfile;