const express = require('express');
const router = express.Router();
const auditorController = require('../controllers/auditorController');

router.post('/validateAuthenticity', auditorController.validateAuthenticity);

module.exports = router;
