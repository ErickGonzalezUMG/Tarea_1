import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function VigilanteSesion() {
  const { estado } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (estado.sesionExpirada) {
      navigate('/login');
    }
  }, [estado.sesionExpirada]);

  return null;
}

export default VigilanteSesion;