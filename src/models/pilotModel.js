const { createModel } = require('./baseModel');

const base = createModel('pilots.json', 'id');

const findByLicencia = async (licencia) => {
  const r = await base.findWhere((p) => p.licencia === licencia);
  return r[0] || null;
};

module.exports = { ...base, findByLicencia };
