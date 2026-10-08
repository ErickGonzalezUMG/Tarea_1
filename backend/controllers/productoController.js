const Producto = require('../models/Producto');

function manejarError(error, response) {
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
    return;
  }
  if (error.name === 'CastError') {
    response.status(400).json({ error: 'ID inválido' });
    return;
  }
  if (error.code === 11000) {
    response.status(400).json({ error: 'Ya existe un producto con ese código' });
    return;
  }
  response.status(500).json({ error: 'Error en el servidor' });
}

async function listarProductos(request, response) {
  try {
    const filtro = {};

    if (request.query.categoria) {
      filtro.categoria = request.query.categoria;
    }
    if (request.query.buscar) {
      filtro.nombre = { $regex: request.query.buscar, $options: 'i' };
    }

    const productos = await Producto.find(filtro).sort({ codigo: 1 });    response.json(productos);
  } catch (error) {
    manejarError(error, response);
  }
}

async function obtenerProducto(request, response) {
  try {
    const producto = await Producto.findById(request.params.id);
    if (!producto) {
      response.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    response.json(producto);
  } catch (error) {
    manejarError(error, response);
  }
}

async function crearProducto(request, response) {
  try {
    const producto = await Producto.create(request.body);
    response.status(201).json(producto);
  } catch (error) {
    manejarError(error, response);
  }
}

async function actualizarProducto(request, response) {
  try {
    const producto = await Producto.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!producto) {
      response.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    response.json(producto);
  } catch (error) {
    manejarError(error, response);
  }
}

async function eliminarProducto(request, response) {
  try {
    const producto = await Producto.findByIdAndDelete(request.params.id);
    if (!producto) {
      response.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    response.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    manejarError(error, response);
  }
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};