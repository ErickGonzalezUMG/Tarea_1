import { useState } from 'react';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API_URL from '../config.js';

function Registro() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  async function crearCuenta(e) {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!nombres || !apellidos || !correo || !contrasena) {
      setError('Nombres, apellidos, correo y contraseña son obligatorios.');
      return;
    }

    if (contrasena !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: `${nombres} ${apellidos}`,
          correo: correo,
          password: contrasena,
        }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error);
        return;
      }

      setMensaje('Cuenta creada exitosamente. Ya puedes iniciar sesión.');
      setNombres('');
      setApellidos('');
      setCorreo('');
      setContrasena('');
      setConfirmar('');
    } catch (error) {
      setError('No se pudo conectar con el servidor.');
    }
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Registro de usuario</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && (
        <Alert variant="success">
          {mensaje} <Link to="/login">Ir a iniciar sesión</Link>
        </Alert>
      )}

      <Form onSubmit={crearCuenta}>
        <h4>Datos personales</h4>
        <Row className="g-3 mb-4">
          <Col md={6}>
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>DPI</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={6}>
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={12}>
            <Form.Label className="d-block">Genero</Form.Label>
            <Form.Check inline type="radio" name="genero" label="Femenino" id="femenino" />
            <Form.Check inline type="radio" name="genero" label="Masculino" id="masculino" />
          </Col>
        </Row>

        <h4>Contacto</h4>
        <Row className="g-3 mb-4">
          <Col md={6}>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="text"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={12}>
            <Form.Label>Direccion</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Col>
        </Row>

        <h4>Cuenta</h4>
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Label>Contrasena</Form.Label>
            <Form.Control
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Confirmar contrasena</Form.Label>
            <Form.Control
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
            />
          </Col>
        </Row>

        <Button variant="primary" type="submit">Crear cuenta</Button>
      </Form>
    </Container>
  );
}

export default Registro;