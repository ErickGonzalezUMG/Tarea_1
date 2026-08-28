import { useState } from 'react';
import { Container, Form, Table, Badge, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productos from '../data/productos.js';

function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todas');

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === 'todas' || producto.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });

  function limpiarFiltros() {
    setBusqueda('');
    setCategoria('todas');
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Buscar</h2>

      <Form className="mb-4">
        <Row className="g-3 align-items-end">
          <Col md={5}>
            <Form.Label htmlFor="busqueda">Producto</Form.Label>
            <Form.Control
              id="busqueda"
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre..."
            />
          </Col>
          <Col md={4}>
            <Form.Label htmlFor="categoria">Categoria</Form.Label>
            <Form.Select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="Portatiles">Computadoras portatiles</option>
              <option value="Accesorios">Accesorios de escritorio</option>
              <option value="Audio">Audio y sonido</option>
              <option value="Almacenamiento">Almacenamiento</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button variant="secondary" onClick={limpiarFiltros} className="w-100">
              Limpiar
            </Button>
          </Col>
        </Row>
      </Form>

      <h2 className="mb-3">Lista de productos</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Categoria</th>
            <th>Precio Q</th>
            <th>Existencia</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.codigo}>
              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>{producto.precio.toFixed(2)}</td>
              <td>
                {producto.existencia === 0 ? (
                  <Badge bg="danger">Agotado</Badge>
                ) : (
                  <Badge bg="success">{producto.existencia} disponibles</Badge>
                )}
              </td>
              <td>
                <Button as={Link} to={`/productos/${producto.codigo}`} size="sm" variant="outline-primary">
                  Ver
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Productos;