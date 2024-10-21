// import React from "react";
// import { NavBarMenu } from "../mockData/data";
// import { CiSearch } from "react-icons/ci";
// import { SiDatadog } from "react-icons/si";
// import { MdMenu } from "react-icons/md";
// import ResponsiveMenu from "./ResponsiveMenu";

// const NavBar = () => {
//   const [open, setOpen] = React.useState( false );
  
//   const manejarClick = () => {
//     console.log("estoy funcionando");
// };

//   return (
//     <>
//         <nav>
//             <div className="container flex justify-between items-center py-8">
//                 {/* Logo section */}
//                 <div className="text-2xl flex items-center gap-2 font-bold py-8 uppercase">
//                      <SiDatadog />
//                      <p>Cuidados</p>
//                      <p className="text-secondary">Peludos</p>
                                       
//                 </div>
//                 {/* Menu section */}
//                 <div className="hidden md:block">
//                   <ul className="flex items-center gap-6 text-primary ">
//                     {
//                       NavBarMenu.map((item) => {
//                         return (
//                           <li key={item.id}>
//                             <a href={item.link} className="inline-block py-1 px-3 transition duration-300 ease-in-out hover:text-secondary hover:scale-125 font-semibold">{item.title}</a>
//                           </li>
//                         );
//                       })
//                     }
//                   </ul>
//                 </div>
//                 {/* Icons section */}
//                 <div className="flex items-center gap-4">
//                   <button className="text-2xl hover:bg-secondary hover:text-white rounded-full p-2 duration-300">
//                     <CiSearch />
//                   </button>
//                   <div className="flex gap-2">
//                     <button  onClick={manejarClick} className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out px-6 py-2 hidden md:block">Registrarse</button>
//                     <button className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out px-6 py-2 hidden md:block">Iniciar Sesion</button>
//                   </div>
//                 </div>
//                 {/* Mobile hamburger Menu section */}
//                 <div className="md:hidden" onClick={() => setOpen(!open)}>
//                     <MdMenu className="text-4xl" />
//                 </div>
//             </div>
//         </nav>
//         {/* Mobile Sidebar section */}
//         <ResponsiveMenu open={open} />
//     </>
    
//   )
// }

// export default NavBar;

// ----------
import React from "react";
import { NavBarMenu } from "../mockData/data";
import { CiSearch } from "react-icons/ci";
import { SiDatadog } from "react-icons/si";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";


const NavBar = ({setShowLogin}) => {
  const [open, setOpen] = React.useState( false );
  
  const manejarClick = () => {
    console.log("estoy funcionando");
};

  return (
    <>
        <nav>
            <div className="container flex justify-between items-center py-8">
                {/* Logo section */}
                <div className="text-2xl flex items-center gap-2 font-bold py-8 uppercase">
                     <SiDatadog />
                     <p>Cuidados</p>
                     <p className="text-secondary">Peludos</p>
                                       
                </div>
                {/* Menu section */}
                <div className="hidden md:block">
                  <ul className="flex items-center gap-6 text-primary ">
                    {
                      NavBarMenu.map((item) => {
                        return (
                          <li key={item.id}>
                            <a href={item.link} className="inline-block py-1 px-3 transition duration-300 ease-in-out hover:text-secondary hover:scale-125 font-semibold">{item.title}</a>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
                {/* Icons section */}
                <div className="flex items-center gap-4">
                  <button className="text-2xl hover:bg-secondary hover:text-white rounded-full p-2 duration-300">
                    <CiSearch />
                  </button>
                  <div className="flex gap-2">
                    <button  onClick={()=>setShowLogin(true)} className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out px-6 py-2 hidden md:block">Iniciar Sesion</button>
                    {/* <button className="hover:bg-secondary text-secondary font-semibold hover:text-white rounded-lg border-2 border-secondary transition duration-300 ease-in-out px-6 py-2 hidden md:block">Iniciar Sesion</button> */}
                  </div>
                </div>
                {/* Mobile hamburger Menu section */}
                <div className="md:hidden" onClick={() => setOpen(!open)}>
                    <MdMenu className="text-4xl" />
                </div>
            </div>
        </nav>
        {/* Mobile Sidebar section */}
        <ResponsiveMenu open={open} />
    </>
    
  )
}

export default NavBar;

