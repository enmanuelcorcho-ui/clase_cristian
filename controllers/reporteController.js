const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

// 10. GET /api/reportes/estadisticas
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const totalProductos = await Producto.countDocuments();
    const totalUsuarios = await Usuario.countDocuments();
    const porCategoria = await Producto.aggregate([
      {
        $group: {
          _id: '$categoria',
          cantidadProductos: { $sum: 1 },
          stockTotal: { $sum: '$stock' },
          precioPromedio: { $avg: '$precio' }
        }
      }
    ]);

    res.json({
      ok: true,
      resumen: {
        totalProductos,
        totalUsuarios,
        porCategoria
      }
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};