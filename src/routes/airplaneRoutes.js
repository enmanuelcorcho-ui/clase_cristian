const router = require('express').Router();
const airplaneController = require('../controllers/airplaneController');

router.get('/aviones', airplaneController.getAirplanes);
router.get('/aviones/:id', airplaneController.getAirplane);
router.post('/aviones', airplaneController.createAirplane);
router.put('/aviones/:id', airplaneController.updateAirplane);
router.delete('/aviones/:id', airplaneController.deleteAirplane);

module.exports = router;
