const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productoController');

router.post('/', ctrl.crearProducto);
router.get('/', ctrl.obtenerProductos);
router.get('/categoria/:cat', ctrl.filtrarPorCategoria);
router.get('/:id', ctrl.obtenerProductoPorId);
router.put('/:id', ctrl.actualizarProducto);
router.delete('/:id', ctrl.eliminarProducto);

module.exports = router;