import React from "react";
import veterinary from "../assets/veterinary.png";
import { CgProfile } from "react-icons/cg";
import { IoCardSharp } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { IoNotificationsCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const UserSideMenu = () => {
  return (
    <div className="flex justify-start ml-20 mt-10 mb-10 font-semibold">
        <div className="card w-1/5 bg-secondary shadow-md rounded-md p-4 flex flex-col items-start text-white">
            <img src={veterinary} alt="Usuario" className="w-34 h-34 rounded-full object-cover"/>
            <h2 className="mt-4 text-lg font-semibold">User Name</h2>
            <div className="mt-4 space-y-2 text-right">
                <a href="URL_PROFILE" className="flex items-center space-x-2">
                    <CgProfile />
                    
                    <span>Profile</span>
                </a>
                <a href="URL_PUBLICATIONS" className="flex items-center space-x-2">
                    <IoCardSharp/>
                    <span>Publications</span>
                </a>
                <a href="URL_MESSAGES" className="flex items-center space-x-2">
                    <TiMessages/>
                    <span>Messages</span>
                </a>
                <a href="URL_NOTIFICATIONS" className="flex items-center space-x-2">
                    <IoNotificationsCircle/>
                    <span>Notifications</span>
                </a>
                
                <a href="URL_DELETE_PROFILE" className="flex items-center space-x-2">
                <MdDelete/>
                <span>Delete profile</span>
                </a>
            </div>
        </div>
    </div>
  );
};

export default UserSideMenu;