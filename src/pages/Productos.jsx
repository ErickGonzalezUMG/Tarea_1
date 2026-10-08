import { useState, useEffect } from 'react';
import { Container, Form, Table, Badge, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API_URL from '../config.js';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todas');

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(`${API_URL}/api/recursos`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
          setError(datos.error);
          return;
        }

        setProductos(datos);
      } catch (error) {
        setError('No se pudo conectar con el servidor.');
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

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

      {cargando && (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando productos...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!cargando && !error && (
        <>
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
                <tr key={producto._id}>
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
                    <Button as={Link} to={`/productos/${producto._id}`} size="sm" variant="outline-primary">
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {productosFiltrados.length === 0 && <p>No se encontraron productos.</p>}
        </>
      )}
    </Container>
  );
}

export default Productos;