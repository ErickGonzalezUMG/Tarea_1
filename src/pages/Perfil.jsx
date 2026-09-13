import { Container, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Perfil() {
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();

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

  return (
    <Container className="py-4">
      <h2 className="mb-4">Mi Perfil</h2>
      <Card>
        <Card.Header>
          <h5 className="mb-0">
            {estado.usuario.nombre} <Badge bg="success">{estado.usuario.rol}</Badge>
          </h5>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Correo:</strong> {estado.usuario.correo}</ListGroup.Item>
          <ListGroup.Item><strong>Rol:</strong> {estado.usuario.rol}</ListGroup.Item>
          <ListGroup.Item><strong>Fecha de acceso:</strong> {estado.usuario.fechaAcceso}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="danger" onClick={cerrarSesion}>Cerrar Sesión</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Perfil;