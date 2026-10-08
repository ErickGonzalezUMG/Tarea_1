const express = require('express');
const router = express.Router();
const { register, login, perfil } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/perfil/:id', perfil);

module.exports = router;