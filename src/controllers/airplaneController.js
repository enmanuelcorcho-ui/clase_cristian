const airplaneService = require('../services/airplaneService');

const handleError = (res, error) =>
  res.status(error.status || 500).json({ error: error.message });

const getAirplanes = async (req, res) => {
  try {
    return res.status(200).json(await airplaneService.getAllAirplanes());
  } catch (error) { return handleError(res, error); }
};

const getAirplane = async (req, res) => {
  try {
    return res.status(200).json(await airplaneService.getAirplaneById(req.params.id));
  } catch (error) { return handleError(res, error); }
};

const createAirplane = async (req, res) => {
  try {
    return res.status(201).json(await airplaneService.registerAirplane(req.body));
  } catch (error) { return handleError(res, error); }
};

const updateAirplane = async (req, res) => {
  try {
    return res.status(200).json(await airplaneService.updateAirplane(req.params.id, req.body));
  } catch (error) { return handleError(res, error); }
};

const deleteAirplane = async (req, res) => {
  try {
    const eliminado = await airplaneService.deleteAirplane(req.params.id);
    return res.status(200).json({ mensaje: 'Avión eliminado', avion: eliminado });
  } catch (error) { return handleError(res, error); }
};

module.exports = { getAirplanes, getAirplane, createAirplane, updateAirplane, deleteAirplane };
