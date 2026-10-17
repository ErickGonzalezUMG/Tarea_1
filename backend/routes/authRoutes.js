const express = require('express');
const router = express.Router();
const { register, login, perfil } = require('../controllers/authController');
const validarToken = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/perfil/:id', validarToken, perfil);

module.exports = router;