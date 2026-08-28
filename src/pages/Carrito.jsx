import { Container, Table, Form, Row, Col, Button } from 'react-bootstrap';

const itemsCarrito = [
  { nombre: "Laptop UltraBook 14", precio: 7499.00, cantidad: 1 },
  { nombre: "Audifonos Inalambricos Pro", precio: 899.00, cantidad: 2 },
  { nombre: "Teclado Mecanico RGB", precio: 549.00, cantidad: 1 },
];

function Carrito() {
  const subtotal = itemsCarrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  const envio = 50.00;
  const total = subtotal + envio;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Carrito de compras</h2>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Q</th>
            <th>Cantidad</th>
            <th>Subtotal Q</th>
          </tr>
        </thead>
        <tbody>
          {itemsCarrito.map((item) => (
            <tr key={item.nombre}>
              <td>{item.nombre}</td>
              <td>{item.precio.toFixed(2)}</td>
              <td>{item.cantidad}</td>
              <td>{(item.precio * item.cantidad).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}><strong>Subtotal</strong></td>
            <td>{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3}><strong>Envio</strong></td>
            <td>{envio.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3}><strong>Total</strong></td>
            <td><strong>{total.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </Table>

      <h3 className="mt-4 mb-3">Datos de envio</h3>
      <Form>
        <Row className="g-3">
          <Col md={6}>
            <Form.Label>Nombre</Form.Label>
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
          <Col md={6}>
            <Form.Label>Departamento</Form.Label>
            <Form.Select>
              <option>Guatemala</option>
              <option>Sacatepequez</option>
              <option>Quetzaltenango</option>
              <option>Escuintla</option>
              <option>Peten</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Label>Forma de pago</Form.Label>
            <Form.Select>
              <option>Tarjeta</option>
              <option>Transferencia</option>
              <option>Contra entrega</option>
            </Form.Select>
          </Col>
          <Col md={12}>
            <Form.Label className="d-block">Entrega</Form.Label>
            <Form.Check inline type="radio" name="entrega" label="Estandar" id="estandar" />
            <Form.Check inline type="radio" name="entrega" label="Express" id="express" />
            <Form.Check inline type="radio" name="entrega" label="Recoger en tienda" id="recoger" />
          </Col>
          <Col md={12}>
            <Form.Check type="checkbox" label="Requiere factura" id="factura" />
          </Col>
          <Col md={6}>
            <Form.Label>NIT</Form.Label>
            <Form.Control type="text" />
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-4">Confirmar pedido</Button>
      </Form>
    </Container>
  );
}

export default Carrito;