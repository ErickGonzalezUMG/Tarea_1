const express = require('express');
const router = express.Router();
const {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productoController');
const validarToken = require('../middlewares/auth');

router.get('/', listarProductos);
router.get('/:id', obtenerProducto);
router.post('/', validarToken, crearProducto);
router.put('/:id', validarToken, actualizarProducto);
router.delete('/:id', validarToken, eliminarProducto);

module.exports = router;