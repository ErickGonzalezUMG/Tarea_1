import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-1">TecnoStore &copy; 2026</p>
            <p className="mb-1">Codificado por: Erick Enrique González Canel</p>
            <p className="mb-0">Carne: 9490-20-2571</p>
            <p className="mb-0 small">
              Proyecto individual — todos los componentes fueron desarrollados por el estudiante.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;