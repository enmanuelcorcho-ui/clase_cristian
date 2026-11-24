const airplaneModel = require('../models/airplaneModel');
const assignmentModel = require('../models/assignmentModel');
const { badRequest, notFound, conflict } = require('../utils/errors');

const validate = (data, { partial = false } = {}) => {
  const req = (campo) => !partial || data[campo] !== undefined;
  const texto = (v) => typeof v === 'string' && v.trim();

  if (req('modelo') && !texto(data.modelo)) throw badRequest('El modelo es obligatorio');
  if (req('matricula') && !texto(data.matricula)) throw badRequest('La matrícula es obligatoria');
  if (req('fabricante') && !texto(data.fabricante)) throw badRequest('El fabricante es obligatorio');
  if (req('capacidadMaxima') && (!Number.isInteger(data.capacidadMaxima) || data.capacidadMaxima <= 0))
    throw badRequest('capacidadMaxima debe ser un entero mayor a 0');
};

const pick = (d) => ({
  modelo: d.modelo?.trim(),
  matricula: d.matricula?.trim(),
  capacidadMaxima: d.capacidadMaxima,
  fabricante: d.fabricante?.trim(),
});

const getAllAirplanes = () => airplaneModel.findAll();

const getAirplaneById = async (id) => {
  const avion = await airplaneModel.findById(id);
  if (!avion) throw notFound(`No existe el avión con id ${id}`);
  return avion;
};

const registerAirplane = async (data) => {
  validate(data);
  const datos = pick(data);
  if (await airplaneModel.findByMatricula(datos.matricula))
    throw conflict(`Ya existe un avión con la matrícula ${datos.matricula}`);
  return airplaneModel.save(datos);
};

const updateAirplane = async (id, data) => {
  await getAirplaneById(id);
  validate(data, { partial: true });
  const datos = Object.fromEntries(
    Object.entries(pick(data)).filter(([, v]) => v !== undefined)
  );
  if (datos.matricula) {
    const otro = await airplaneModel.findByMatricula(datos.matricula);
    if (otro && otro.id !== Number(id))
      throw conflict(`Ya existe un avión con la matrícula ${datos.matricula}`);
  }
  return airplaneModel.update(id, datos);
};

const deleteAirplane = async (id) => {
  await getAirplaneById(id);
  const asignaciones = await assignmentModel.findByAvion(id);
  if (asignaciones.length)
    throw conflict('No se puede eliminar: el avión tiene asignaciones registradas');
  return airplaneModel.remove(id);
};

module.exports = { getAllAirplanes, getAirplaneById, registerAirplane, updateAirplane, deleteAirplane };
