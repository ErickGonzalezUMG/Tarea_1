const jwt = require('jsonwebtoken');

function validarToken(request, response, next) {
  const cabecera = request.headers.authorization;

  if (!cabecera) {
    response.status(401).json({ error: 'No se proporcionó un token' });
    return;
  }

  const token = cabecera.split(' ')[1];
  if (!token) {
    response.status(401).json({ error: 'No se proporcionó un token' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        response.status(401).json({
          error: 'token_expired',
          message: 'La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.',
        });
        return;
      }
      response.status(401).json({ error: 'Token inválido' });
      return;
    }

    request.usuario = decoded;
    next();
  });
}

module.exports = validarToken;