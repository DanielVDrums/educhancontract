const express = require('express');
const router = express.Router();
const consumidorController = require('../controllers/consumidorController');

router.post('/validateMedication', consumidorController.validateMedication);

module.exports = router;
