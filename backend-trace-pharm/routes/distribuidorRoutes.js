const express = require('express');
const router = express.Router();
const distribuidorController = require('../controllers/distribuidorController');

router.post('/initiateShipment', distribuidorController.initiateShipment);
router.post('/updateEvent', distribuidorController.updateEvent);

module.exports = router;
