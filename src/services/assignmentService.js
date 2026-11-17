const assignmentModel = require('../models/assignmentModel');
const pilotModel = require('../models/pilotModel');
const airplaneModel = require('../models/airplaneModel');
const { badRequest, notFound, conflict } = require('../utils/errors');

const validate = (data, { partial = false } = {}) => {
  const req = (campo) => !partial || data[campo] !== undefined;

  if (req('idPiloto') && !Number.isInteger(data.idPiloto)) throw badRequest('idPiloto debe ser un entero');
  if (req('idAvion') && !Number.isInteger(data.idAvion)) throw badRequest('idAvion debe ser un entero');
  if (req('fechaVuelo') && (typeof data.fechaVuelo !== 'string' || Number.isNaN(Date.parse(data.fechaVuelo))))
    throw badRequest('fechaVuelo debe ser una fecha válida (ej: 2026-12-01)');
  if (req('rutaAsignada') && (typeof data.rutaAsignada !== 'string' || !data.rutaAsignada.trim()))
    throw badRequest('rutaAsignada es obligatoria');
};

// Validaciones relacionales: consultan los modelos de pilotos y aviones.
const validateRelations = async (data, ignoreId = null) => {
  const piloto = await pilotModel.findById(data.idPiloto);
  if (!piloto) throw notFound(`No existe el piloto con id ${data.idPiloto}`);
  const avion = await airplaneModel.findById(data.idAvion);
  if (!avion) throw notFound(`No existe el avión con id ${data.idAvion}`);

  if (piloto.estado !== 'activo')
    throw conflict(`El piloto ${piloto.nombre} no está activo (estado: ${piloto.estado})`);

  // Un piloto o un avión no pueden estar en dos vuelos el mismo día
  const mismoDia = await assignmentModel.findWhere(
    (a) => a.fechaVuelo === data.fechaVuelo && a.idAsignacion !== ignoreId
  );
  if (mismoDia.some((a) => a.idPiloto === data.idPiloto))
    throw conflict('El piloto ya tiene un vuelo asignado en esa fecha');
  if (mismoDia.some((a) => a.idAvion === data.idAvion))
    throw conflict('El avión ya tiene un vuelo asignado en esa fecha');
};

const pick = (d) => ({
  idPiloto: d.idPiloto,
  idAvion: d.idAvion,
  fechaVuelo: d.fechaVuelo,
  rutaAsignada: d.rutaAsignada?.trim(),
});

const getAllAssignments = () => assignmentModel.findAll();

const getAssignmentById = async (id) => {
  const a = await assignmentModel.findById(id);
  if (!a) throw notFound(`No existe la asignación con id ${id}`);
  return a;
};

const createAssignment = async (data) => {
  validate(data);
  await validateRelations(data);
  return assignmentModel.save(pick(data));
};

const updateAssignment = async (id, data) => {
  const actual = await getAssignmentById(id);
  validate(data, { partial: true });
  const fusion = {
    ...actual,
    ...Object.fromEntries(Object.entries(pick(data)).filter(([, v]) => v !== undefined)),
  };
  await validateRelations(fusion, actual.idAsignacion);
  return assignmentModel.update(id, pick(fusion));
};

const deleteAssignment = async (id) => {
  await getAssignmentById(id);
  return assignmentModel.remove(id);
};

module.exports = {
  getAllAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment,
};
