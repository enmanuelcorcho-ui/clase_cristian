const assignmentService = require('../services/assignmentService');

const handleError = (res, error) =>
  res.status(error.status || 500).json({ error: error.message });

const getAssignments = async (req, res) => {
  try {
    return res.status(200).json(await assignmentService.getAllAssignments());
  } catch (error) { return handleError(res, error); }
};

const getAssignment = async (req, res) => {
  try {
    return res.status(200).json(await assignmentService.getAssignmentById(req.params.id));
  } catch (error) { return handleError(res, error); }
};

const createAssignment = async (req, res) => {
  try {
    return res.status(201).json(await assignmentService.createAssignment(req.body));
  } catch (error) { return handleError(res, error); }
};

const updateAssignment = async (req, res) => {
  try {
    return res.status(200).json(await assignmentService.updateAssignment(req.params.id, req.body));
  } catch (error) { return handleError(res, error); }
};

const deleteAssignment = async (req, res) => {
  try {
    const eliminada = await assignmentService.deleteAssignment(req.params.id);
    return res.status(200).json({ mensaje: 'Asignación eliminada', asignacion: eliminada });
  } catch (error) { return handleError(res, error); }
};

module.exports = { getAssignments, getAssignment, createAssignment, updateAssignment, deleteAssignment };
