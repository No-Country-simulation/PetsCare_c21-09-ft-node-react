import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";


const ResponsiveMenu = ({ open }) => {
  return (
    <AnimatePresence mode="wait" >
        {
            open && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-20 left-0 w-full h-screen z-20"
                >
                    <div className="text-xl font-semibold uppercase bg-secondary text-white py-10 m-6 rounded-3xl">
                        <ul className="flex flex-col justify-center items-center gap-10">
                            <li className=" hover:scale-125 transition duration-300 ease-in-out">Home</li>
                            <li className=" hover:scale-125 transition duration-300 ease-in-out">Guarderias</li>
                            <li className=" hover:scale-125 transition duration-300 ease-in-out">Veterinarias</li>
                            <li className=" hover:scale-125 transition duration-300 ease-in-out">Paseadores</li>
                            <li className=" hover:scale-125 transition duration-300 ease-in-out">Cuidados</li>
                        </ul>
                    </div>
                </motion.div>
            )
        }
    </AnimatePresence>
  )
}

ResponsiveMenu.propTypes = {
    open: PropTypes.bool.isRequired,
  };

export default ResponsiveMenu;