const bcrypt = require('bcryptjs');
const User = require('../models/User');

function datosPublicos(user) {
  return {
    id: user._id,
    nombre: user.nombre,
    correo: user.correo,
    rol: user.rol,
    createdAt: user.createdAt,
  };
}

async function register(request, response) {
  try {
    const usuario = request.body;

    if (!usuario.nombre || !usuario.correo || !usuario.password) {
      response.status(400).json({ error: 'El usuario debe tener nombre, correo y contraseña' });
      return;
    }

    const existe = await User.findOne({ correo: usuario.correo.toLowerCase() });
    if (existe) {
      response.status(400).json({ error: 'El correo ya está registrado' });
      return;
    }

    const passwordEncriptada = await bcrypt.hash(usuario.password, 10);
    const nuevo = await User.create({
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: passwordEncriptada,
    });

    response.status(201).json(datosPublicos(nuevo));
  } catch (error) {
    response.status(500).json({ error: 'Error en el servidor' });
  }
}

async function login(request, response) {
  try {
    const credenciales = request.body;

    if (!credenciales.correo || !credenciales.password) {
      response.status(400).json({ error: 'Debe enviar correo y contraseña' });
      return;
    }

    const usuario = await User.findOne({ correo: credenciales.correo.toLowerCase() });
    if (!usuario) {
      response.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const coincide = await bcrypt.compare(credenciales.password, usuario.password);
    if (!coincide) {
      response.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    response.json(datosPublicos(usuario));
  } catch (error) {
    response.status(500).json({ error: 'Error en el servidor' });
  }
}

async function perfil(request, response) {
  try {
    const usuario = await User.findById(request.params.id);
    if (!usuario) {
      response.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    response.json(datosPublicos(usuario));
  } catch (error) {
    response.status(400).json({ error: 'ID inválido' });
  }
}

module.exports = { register, login, perfil };