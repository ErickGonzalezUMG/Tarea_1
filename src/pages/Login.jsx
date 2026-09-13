import { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();

  function iniciarSesion(e) {
    e.preventDefault();

    if (!correo || !contrasena) {
      dispatch({ type: 'SET_ERROR', mensaje: 'Todos los campos son obligatorios.' });
      return;
    }

    if (correo === 'admin@tecnostore.com' && contrasena === '1234') {
      dispatch({
        type: 'LOGIN',
        datos: {
          nombre: 'Erick González',
          correo: 'admin@tecnostore.com',
          rol: 'Administrador',
          fechaAcceso: new Date().toLocaleString()
        }
      });
      navigate('/perfil');
    } else {
      dispatch({ type: 'SET_ERROR', mensaje: 'Correo o contraseña incorrectos.' });
    }
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Iniciar sesión</h2>

      {estado.error && <Alert variant="danger">{estado.error}</Alert>}

      <Form onSubmit={iniciarSesion} className="mb-5">
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="text"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </Col>
        </Row>
        <Button variant="primary" type="submit">Entrar</Button>
      </Form>

      <p className="text-muted mb-2">Credenciales de prueba: admin@tecnostore.com / 1234</p>
      <p><Link to="/registro">Crear una cuenta</Link></p>
    </Container>
  );
}

export default Login;