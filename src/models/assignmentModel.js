const { createModel } = require('./baseModel');

const base = createModel('assignments.json', 'idAsignacion');

const findByPiloto = (idPiloto) => base.findWhere((a) => a.idPiloto === Number(idPiloto));
const findByAvion = (idAvion) => base.findWhere((a) => a.idAvion === Number(idAvion));

module.exports = { ...base, findByPiloto, findByAvion };
