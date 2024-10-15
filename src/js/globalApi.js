export const apiUrl = import.meta.env.MODE === 'development'
  ? 'http://localhost:8080/'
  : '';

// export const urlImage = import.meta.env.MODE === 'development'
//   ? 'http://localhost:5000/'
//   : '/var/www/helvecia-mas/filesImg';

// para iniciar el servidor de las imagenes debo ejecutar a la altura de storage 
//     en        la carpera raiz del proyecto, instalando serve para desarrollo
//                  serve -s storage -l 5000
