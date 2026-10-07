const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, default: '' },
    precio: { type: Number, required: true, min: 0 },
    categoria: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
    imagen: { type: String, default: '' },
    especificaciones: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);