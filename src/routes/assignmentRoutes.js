const router = require('express').Router();
const assignmentController = require('../controllers/assignmentController');

router.get('/asignaciones', assignmentController.getAssignments);
router.get('/asignaciones/:id', assignmentController.getAssignment);
router.post('/asignaciones', assignmentController.createAssignment);
router.put('/asignaciones/:id', assignmentController.updateAssignment);
router.delete('/asignaciones/:id', assignmentController.deleteAssignment);

module.exports = router;
