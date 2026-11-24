const Producto = require('../models/Producto');

// 1. POST /api/productos
exports.crearProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    const guardado = await producto.save();
    res.status(201).json({ ok: true, data: guardado });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

// 2. GET /api/productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ fechaCreacion: -1 });
    res.json({ ok: true, total: productos.length, data: productos });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// 3. GET /api/productos/:id
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    }
    res.json({ ok: true, data: producto });
  } catch (error) {
    res.status(400).json({ ok: false, error: 'ID inválido o error en consulta' });
  }
};

// 4. PUT /api/productos/:id
exports.actualizarProducto = async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado) {
      return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    }
    res.json({ ok: true, data: actualizado });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

// 5. DELETE /api/productos/:id
exports.eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
    }
    res.json({ ok: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

// 6. GET /api/productos/categoria/:cat
exports.filtrarPorCategoria = async (req, res) => {
  try {
    const productos = await Producto.find({ categoria: req.params.cat });
    res.json({ ok: true, categoria: req.params.cat, total: productos.length, data: productos });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};