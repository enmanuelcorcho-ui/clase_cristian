const express = require('express');
const pilotRoutes = require('./routes/pilotRoutes');
const airplaneRoutes = require('./routes/airplaneRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();
app.use(express.json());

app.use('/api/pilotos', pilotRoutes);
app.use('/api/aviones', airplaneRoutes);
app.use('/api/asignaciones', assignmentRoutes);

// JSON mal formado, rutas inexistentes
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed')
    return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
  return res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}/api`));
}

module.exports = app;
