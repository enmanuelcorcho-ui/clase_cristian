const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuarioController');

router.post('/registro', ctrl.registrarUsuario);
router.post('/login', ctrl.loginUsuario);
router.get('/', ctrl.listarUsuarios);

module.exports = router;