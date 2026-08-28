import { Container, Form, Row, Col, Button, Table } from 'react-bootstrap';

const sucursales = [
  { nombre: "Zona 10", direccion: "6a. Avenida 12-45", telefono: "2200-1010", horario: "9:00 a 19:00" },
  { nombre: "Zona 1", direccion: "8a. Calle 3-20", telefono: "2200-1020", horario: "8:30 a 18:00" },
  { nombre: "Mixco", direccion: "Calzada Roosevelt km 14.5", telefono: "2200-1030", horario: "10:00 a 20:00" },
];

function Contacto() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Contacto</h2>
      <Form className="mb-5">
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={6}>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={6}>
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="text" />
          </Col>
          <Col md={6}>
            <Form.Label>Asunto</Form.Label>
            <Form.Select>
              <option>Pedido</option>
              <option>Producto</option>
              <option>Garantia</option>
              <option>Facturacion</option>
              <option>Otro</option>
            </Form.Select>
          </Col>
          <Col md={12}>
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={4} />
          </Col>
          <Col md={12}>
            <Form.Label className="d-block">Medio de respuesta</Form.Label>
            <Form.Check inline type="radio" name="medio" label="Correo" id="medioCorreo" />
            <Form.Check inline type="radio" name="medio" label="Telefono" id="medioTelefono" />
          </Col>
        </Row>
        <Button variant="primary" type="submit">Enviar</Button>
      </Form>

      <h2 className="mb-3">Sucursales</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Sucursal</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
          {sucursales.map((s) => (
            <tr key={s.nombre}>
              <td>{s.nombre}</td>
              <td>{s.direccion}</td>
              <td>{s.telefono}</td>
              <td>{s.horario}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Contacto;