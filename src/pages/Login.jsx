import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Iniciar sesion</h2>
      <Form className="mb-5">
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={6}>
            <Form.Label>Contrasena</Form.Label>
            <Form.Control type="password" />
          </Col>
          <Col md={12}>
            <Form.Check type="checkbox" label="Recordar sesion" id="recordar" />
          </Col>
        </Row>
        <Button variant="primary" type="submit">Entrar</Button>
      </Form>

      <h2 className="mb-4">Recuperar contrasena</h2>
      <Form className="mb-4">
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Label>Correo registrado</Form.Label>
            <Form.Control type="text" />
          </Col>
        </Row>
        <Button variant="secondary" type="submit">Enviar</Button>
      </Form>

      <p><Link to="/registro">Crear una cuenta</Link></p>
    </Container>
  );
}

export default Login;