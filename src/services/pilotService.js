const pilotModel = require('../models/pilotModel');
const assignmentModel = require('../models/assignmentModel');
const { badRequest, notFound, conflict } = require('../utils/errors');

const ESTADOS = ['activo', 'inactivo', 'suspendido'];

const validate = (data, { partial = false } = {}) => {
  const req = (campo) => !partial || data[campo] !== undefined;

  if (req('nombre') && (typeof data.nombre !== 'string' || !data.nombre.trim()))
    throw badRequest('El nombre es obligatorio');
  if (req('licencia') && (typeof data.licencia !== 'string' || !data.licencia.trim()))
    throw badRequest('La licencia es obligatoria');
  if (req('horasVuelo') && (typeof data.horasVuelo !== 'number' || data.horasVuelo < 0))
    throw badRequest('horasVuelo debe ser un número mayor o igual a 0');
  if (req('estado') && !ESTADOS.includes(data.estado))
    throw badRequest(`El estado debe ser uno de: ${ESTADOS.join(', ')}`);
};

const pick = (d) => ({
  nombre: d.nombre?.trim(),
  licencia: d.licencia?.trim(),
  horasVuelo: d.horasVuelo,
  estado: d.estado,
});

const getAllPilots = () => pilotModel.findAll();

const getPilotById = async (id) => {
  const piloto = await pilotModel.findById(id);
  if (!piloto) throw notFound(`No existe el piloto con id ${id}`);
  return piloto;
};

const registerPilot = async (pilotData) => {
  validate(pilotData);
  const datos = pick(pilotData);
  if (await pilotModel.findByLicencia(datos.licencia))
    throw conflict(`Ya existe un piloto con la licencia ${datos.licencia}`);
  return pilotModel.save(datos);
};

const updatePilot = async (id, pilotData) => {
  await getPilotById(id);
  validate(pilotData, { partial: true });
  const datos = Object.fromEntries(
    Object.entries(pick(pilotData)).filter(([, v]) => v !== undefined)
  );
  if (datos.licencia) {
    const otro = await pilotModel.findByLicencia(datos.licencia);
    if (otro && otro.id !== Number(id))
      throw conflict(`Ya existe un piloto con la licencia ${datos.licencia}`);
  }
  return pilotModel.update(id, datos);
};

const deletePilot = async (id) => {
  await getPilotById(id);
  const asignaciones = await assignmentModel.findByPiloto(id);
  if (asignaciones.length)
    throw conflict('No se puede eliminar: el piloto tiene asignaciones registradas');
  return pilotModel.remove(id);
};

module.exports = { getAllPilots, getPilotById, registerPilot, updatePilot, deletePilot };
