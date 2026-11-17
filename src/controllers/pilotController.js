const pilotService = require('../services/pilotService');

const handleError = (res, error) =>
  res.status(error.status || 500).json({ error: error.message });

const getPilots = async (req, res) => {
  try {
    return res.status(200).json(await pilotService.getAllPilots());
  } catch (error) { return handleError(res, error); }
};

const getPilot = async (req, res) => {
  try {
    return res.status(200).json(await pilotService.getPilotById(req.params.id));
  } catch (error) { return handleError(res, error); }
};

const createPilot = async (req, res) => {
  try {
    const newPilot = await pilotService.registerPilot(req.body);
    return res.status(201).json(newPilot);
  } catch (error) { return handleError(res, error); }
};

const updatePilot = async (req, res) => {
  try {
    return res.status(200).json(await pilotService.updatePilot(req.params.id, req.body));
  } catch (error) { return handleError(res, error); }
};

const deletePilot = async (req, res) => {
  try {
    const eliminado = await pilotService.deletePilot(req.params.id);
    return res.status(200).json({ mensaje: 'Piloto eliminado', piloto: eliminado });
  } catch (error) { return handleError(res, error); }
};

module.exports = { getPilots, getPilot, createPilot, updatePilot, deletePilot };
