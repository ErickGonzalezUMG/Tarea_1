import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Table, ListGroup, Badge, Form, Button, Alert, Spinner } from 'react-bootstrap';
import API_URL from '../config.js';

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarProducto() {
      try {
        const respuesta = await fetch(`${API_URL}/api/recursos/${id}`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
          setError(datos.error);
          return;
        }

        setProducto(datos);
      } catch (error) {
        setError('No se pudo conectar con el servidor.');
      } finally {
        setCargando(false);
      }
    }

    cargarProducto();
  }, [id]);

  if (cargando) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Cargando producto...</p>
      </Container>
    );
  }

  if (error || !producto) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error || 'Producto no encontrado'}</Alert>
        <Link to="/productos">Volver a productos</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={5} className="text-center mb-4">
          <i className={`bi ${producto.icono}`} style={{ fontSize: '180px' }}></i>
        </Col>
        <Col md={7}>
          <h2>{producto.nombre}</h2>
          <p>Codigo: {producto.codigo}</p>
          <h4>Q {producto.precio.toFixed(2)}</h4>
          {producto.existencia === 0 ? (
            <Badge bg="danger">Agotado</Badge>
          ) : (
            <Badge bg="success">{producto.existencia} disponibles</Badge>
          )}
        </Col>
      </Row>

      <h3 className="mt-4">Especificaciones</h3>
      <Table striped bordered>
        <tbody>
          {Object.entries(producto.specs || {}).map(([clave, valor]) => (
            <tr key={clave}>
              <td>{clave}</td>
              <td>{valor}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="mt-4">Contenido de la caja</h3>
      <ListGroup className="mb-4">
        {(producto.caja || []).map((item) => (
          <ListGroup.Item key={item}>{item}</ListGroup.Item>
        ))}
      </ListGroup>

      <h3>Agregar al carrito</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Select>
            <option value="gris">Gris</option>
            <option value="plata">Plata</option>
            <option value="negro">Negro</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="d-block">Memoria RAM</Form.Label>
          <Form.Check inline label="16 GB" name="ram" type="radio" id="ram16" />
          <Form.Check inline label="32 GB" name="ram" type="radio" id="ram32" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check label="Garantia extendida" type="checkbox" id="garantia" />
        </Form.Group>

        <Form.Group className="mb-3" style={{ maxWidth: '150px' }}>
          <Form.Label>Cantidad</Form.Label>
          <Form.Control type="number" min="1" defaultValue="1" />
        </Form.Group>

        <Button variant="primary" type="submit">Agregar al carrito</Button>
      </Form>
    </Container>
  );
}

export default DetalleProducto;