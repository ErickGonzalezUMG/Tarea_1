import { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';
import API_URL from '../config.js';

// Iconos disponibles: nombre de referencia y clase de Bootstrap Icons
const iconos = [
  { valor: 'bi-laptop', nombre: 'Laptop' },
  { valor: 'bi-phone', nombre: 'Teléfono' },
  { valor: 'bi-headphones', nombre: 'Audífonos' },
  { valor: 'bi-mouse', nombre: 'Mouse' },
  { valor: 'bi-keyboard', nombre: 'Teclado' },
  { valor: 'bi-display', nombre: 'Monitor' },
  { valor: 'bi-camera', nombre: 'Cámara' },
  { valor: 'bi-printer', nombre: 'Impresora' },
  { valor: 'bi-box', nombre: 'Genérico' },
];

// Busca el número más alto y devuelve el siguiente correlativo (P-007)
function siguienteCodigo(lista) {
  let mayor = 0;
  lista.forEach(function (p) {
    const numero = parseInt(p.codigo.replace('P-', ''));
    if (numero > mayor) mayor = numero;
  });
  const siguiente = mayor + 1;
  if (siguiente < 10) return 'P-00' + siguiente;
  if (siguiente < 100) return 'P-0' + siguiente;
  return 'P-' + siguiente;
}

const formularioVacio = {
  codigo: '',
  nombre: '',
  categoria: '',
  precio: '',
  existencia: '',
  icono: 'bi-box',
};

function AdminProductos() {
  const { estado } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [formulario, setFormulario] = useState(formularioVacio);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(function () {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(`${API_URL}/api/recursos`);
        const datos = await respuesta.json();
        if (!respuesta.ok) {
          setError(datos.error || 'Error al cargar productos');
          return;
        }
        setProductos(datos);
      } catch (e) {
        setError('No se pudo conectar con el servidor.');
      } finally {
        setCargando(false);
      }
    }
    cargarProductos();
  }, []);

  if (!estado.isAuthenticated) {
    return (
      <Container className="py-4">
        <Alert variant="warning">Acceso restringido: inicia sesión para administrar productos.</Alert>
      </Container>
    );
  }

  // Categorías que ya existen en los productos, sin repetir
  const categorias = productos.map((p) => p.categoria).filter((c, i, lista) => lista.indexOf(c) === i);

  function cambiarCampo(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setFormulario(formularioVacio);
  }

  function editar(producto) {
    setEditandoId(producto._id);
    setFormulario({
      codigo: producto.codigo,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      existencia: producto.existencia,
      icono: producto.icono,
    });
    setError('');
    setMensaje('');
  }

  async function guardar(e) {
    e.preventDefault();
    setError('');
    setMensaje('');

    const datos = {
      ...formulario,
      codigo: editandoId ? formulario.codigo : siguienteCodigo(productos),
      precio: Number(formulario.precio),
      existencia: Number(formulario.existencia),
    };

    try {
      const url = editandoId
        ? `${API_URL}/api/recursos/${editandoId}`
        : `${API_URL}/api/recursos`;
      const respuesta = await fetch(url, {
        method: editandoId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      const resultado = await respuesta.json();
      if (!respuesta.ok) {
        setError(resultado.error || 'Error al guardar');
        return;
      }
      if (editandoId) {
        setProductos(productos.map((p) => (p._id === editandoId ? resultado : p)));
        setMensaje('Producto actualizado exitosamente');
      } else {
        setProductos([...productos, resultado]);
        setMensaje('Producto creado exitosamente');
      }
      cancelarEdicion();
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    }
  }

  async function eliminar(id) {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    setError('');
    setMensaje('');
    try {
      const respuesta = await fetch(`${API_URL}/api/recursos/${id}`, { method: 'DELETE' });
      const resultado = await respuesta.json();
      if (!respuesta.ok) {
        setError(resultado.error || 'Error al eliminar');
        return;
      }
      setProductos(productos.filter((p) => p._id !== id));
      setMensaje(resultado.message);
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    }
  }

  return (
    <Container className="py-4">
      <h2>Administrar productos</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && <Alert variant="success">{mensaje}</Alert>}

      <Form onSubmit={guardar} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                name="codigo"
                value={editandoId ? formulario.codigo : siguienteCodigo(productos)}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={formulario.nombre} onChange={cambiarCampo} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoria" value={formulario.categoria} onChange={cambiarCampo} required>
                <option value="">Selecciona una categoría</option>
                {categorias.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Precio (Q)</Form.Label>
              <Form.Control type="number" min="0" step="0.01" name="precio" value={formulario.precio} onChange={cambiarCampo} required />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Existencia</Form.Label>
              <Form.Control type="number" min="0" name="existencia" value={formulario.existencia} onChange={cambiarCampo} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Icono</Form.Label>
              <Form.Select name="icono" value={formulario.icono} onChange={cambiarCampo}>
                {iconos.map((i) => (
                  <option key={i.valor} value={i.valor}>{i.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          {editandoId ? 'Actualizar producto' : 'Crear producto'}
        </Button>
        {editandoId && (
          <Button variant="secondary" className="ms-2" onClick={cancelarEdicion}>
            Cancelar
          </Button>
        )}
      </Form>

      {cargando ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Código</th>
              <th>Icono</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Existencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p._id}>
                <td>{p.codigo}</td>
                <td><i className={`bi ${p.icono}`}></i></td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>Q {p.precio.toFixed(2)}</td>
                <td>{p.existencia}</td>
                <td>
                  <Button size="sm" variant="warning" className="me-2" onClick={() => editar(p)}>Editar</Button>
                  <Button size="sm" variant="danger" onClick={() => eliminar(p._id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminProductos;