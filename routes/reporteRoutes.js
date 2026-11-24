const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reporteController');

router.get('/estadisticas', ctrl.obtenerEstadisticas);

module.exports = router;