import { Container, Form, Row, Col, Button } from 'react-bootstrap';

function Registro() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Registro de usuario</h2>
      <Form>
        <h4>Datos personales</h4>
        <Row className="g-3 mb-4">
          <Col md={6}>
            <Form.Label>Nombres</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={6}>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control type="text" />
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
            <Form.Control type="text" />
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
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={6}></Col>
          <Col md={6}>
            <Form.Label>Contrasena</Form.Label>
            <Form.Control type="password" />
          </Col>
          <Col md={6}>
            <Form.Label>Confirmar contrasena</Form.Label>
            <Form.Control type="password" />
          </Col>
          <Col md={12}>
            <Form.Check type="checkbox" label="Acepto los terminos y condiciones" id="terminos" />
          </Col>
        </Row>

        <Button variant="primary" type="submit">Crear cuenta</Button>
      </Form>
    </Container>
  );
}

export default Registro;