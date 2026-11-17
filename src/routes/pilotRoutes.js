const router = require('express').Router();
const pilotController = require('../controllers/pilotController');

router.get('/pilotos', pilotController.getPilots);
router.get('/pilotos/:id', pilotController.getPilot);
router.post('/pilotos', pilotController.createPilot);
router.put('/pilotos/:id', pilotController.updatePilot);
router.delete('/pilotos/:id', pilotController.deletePilot);

module.exports = router;
