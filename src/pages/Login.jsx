import { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import API_URL from '../config.js';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();

  async function iniciarSesion(e) {
    e.preventDefault();

    if (!correo || !contrasena) {
      dispatch({ type: 'SET_ERROR', mensaje: 'Todos los campos son obligatorios.' });
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: correo, password: contrasena }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        dispatch({ type: 'SET_ERROR', mensaje: datos.error });
        return;
      }

      dispatch({ type: 'LOGIN', datos: datos });
      navigate('/perfil');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', mensaje: 'No se pudo conectar con el servidor.' });
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

      <p><Link to="/registro">Crear una cuenta</Link></p>
    </Container>
  );
}

export default Login;