import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function NavbarPrincipal() {
  const { estado, dispatch } = useAuth();
  const navigate = useNavigate();

  function cerrarSesion() {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">TecnoStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">Carrito</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>

            {estado.isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/perfil">
                  <i className="bi bi-person-circle"></i> {estado.usuario.nombre}
                </Nav.Link>
                <Button variant="outline-light" size="sm" className="ms-2" onClick={cerrarSesion}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/registro">Registro</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Iniciar sesión</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPrincipal;