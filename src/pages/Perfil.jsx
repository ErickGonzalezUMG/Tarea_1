import { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import API_URL from '../config.js';

function Perfil() {
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!estado.isAuthenticated) return;

    async function cargarPerfil() {
      try {
        const respuesta = await fetch(`${API_URL}/api/auth/perfil/${estado.usuario.id}`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
          setError(datos.error);
          return;
        }

        setPerfil(datos);
      } catch (e) {
        setError('No se pudo conectar con el servidor.');
      }
    }

    cargarPerfil();
  }, [estado.isAuthenticated]);

  function cerrarSesion() {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  }

  if (!estado.isAuthenticated) {
    return (
      <Container className="py-4 text-center">
        <h2>Acceso restringido</h2>
        <p>Debes iniciar sesión para ver tu perfil.</p>
        <Button variant="primary" onClick={() => navigate('/login')}>Ir al Login</Button>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!perfil) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Mi Perfil</h2>
      <Card>
        <Card.Header>
          <h5 className="mb-0">
            {perfil.nombre} <Badge bg="success">{perfil.rol}</Badge>
          </h5>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Correo:</strong> {perfil.correo}</ListGroup.Item>
          <ListGroup.Item><strong>Rol:</strong> {perfil.rol}</ListGroup.Item>
          <ListGroup.Item><strong>Miembro desde:</strong> {perfil.createdAt.slice(0, 10)}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="danger" onClick={cerrarSesion}>Cerrar Sesión</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Perfil;