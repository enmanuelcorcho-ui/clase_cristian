const Usuario = require('../models/Usuario');

// 7. POST /api/usuarios/registro
exports.registrarUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const guardado = await usuario.save();
    res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      data: { id: guardado._id, nombre: guardado.nombre, email: guardado.email }
    });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

// 8. POST /api/usuarios/login
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });
    }
    res.json({
      ok: true,
      message: 'Inicio de sesión exitoso',
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// 9. GET /api/usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json({ ok: true, total: usuarios.length, data: usuarios });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};