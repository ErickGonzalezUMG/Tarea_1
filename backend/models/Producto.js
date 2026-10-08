const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    existencia: { type: Number, default: 0, min: 0 },
    icono: { type: String, default: 'bi-box' },
    specs: { type: Object, default: {} },
    caja: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);