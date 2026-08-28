import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productos from '../data/productos.js';

const categorias = [
  { nombre: "Computadoras portatiles", icono: "bi-laptop" },
  { nombre: "Accesorios de escritorio", icono: "bi-keyboard" },
  { nombre: "Audio y sonido", icono: "bi-headphones" },
  { nombre: "Almacenamiento", icono: "bi-device-hdd" },
];

function Home() {
  const destacados = productos.slice(0, 3);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Bienvenido a TecnoStore</h1>
      <p className="text-center mb-5">
        Tu tienda de tecnologia: laptops, audifonos, teclados y mas.
      </p>

      <Carousel className="mb-5">
        {destacados.map((producto) => (
          <Carousel.Item key={producto.codigo}>
            <div
              className="d-flex align-items-center justify-content-center bg-dark text-white"
              style={{ height: '350px' }}
            >
              <i className={`bi ${producto.icono}`} style={{ fontSize: '140px' }}></i>
            </div>
            <Carousel.Caption>
              <h3>{producto.nombre}</h3>
              <p>Q {producto.precio.toFixed(2)}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <h2 className="mb-3">Productos destacados</h2>
      <Row className="mb-5">
        {destacados.map((producto) => (
          <Col md={4} className="mb-3" key={producto.codigo}>
            <Card className="h-100 text-center">
              <Card.Body>
                <i className={`bi ${producto.icono} d-block mb-3`} style={{ fontSize: '60px' }}></i>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>Q {producto.precio.toFixed(2)}</Card.Text>
                <Button as={Link} to={`/productos/${producto.codigo}`} variant="primary">
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mb-3">Categorias</h2>
      <Row>
        {categorias.map((categoria) => (
          <Col md={3} className="mb-3" key={categoria.nombre}>
            <Card className="text-center h-100">
              <Card.Body>
                <i className={`bi ${categoria.icono} d-block mb-2`} style={{ fontSize: '40px' }}></i>
                <Card.Title style={{ fontSize: '16px' }}>{categoria.nombre}</Card.Title>
                <Button as={Link} to="/productos" variant="outline-primary" size="sm">
                  Ver productos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;