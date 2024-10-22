import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function AdminGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (userRole !== 'ADMINISTRADOR') {
        navigate('/no-autorizado');
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      navigate('/no-autorizado');
    }
  }, [navigate]); // El array de dependencias asegura que useEffect solo se ejecute cuando 'navigate' cambie.

  return children;
}