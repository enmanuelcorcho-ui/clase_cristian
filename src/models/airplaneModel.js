const { createModel } = require('./baseModel');

const base = createModel('airplanes.json', 'id');

const findByMatricula = async (matricula) => {
  const r = await base.findWhere((a) => a.matricula === matricula);
  return r[0] || null;
};

module.exports = { ...base, findByMatricula };
