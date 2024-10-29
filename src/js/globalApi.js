export const apiUrl = import.meta.env.MODE === 'development'
? 'http://localhost:8080/' // en desarrollo, apunta directamente al back-end local
: '/'; 



export const urlImage = import.meta.env.MODE === 'development'
  ? 'http://localhost:5001/'
  : '/var/www/cuidados-mascotas/filesImg';

// para iniciar el servidor de las imagenes debo ejecutar a la altura de storage 
//     en        la carpera raiz del proyecto, instalando serve para desarrollo
//                  serve -s filesImg -l 5001
