const express = require('express');
const router = express.Router();
const fabricanteController = require('../controllers/fabricanteController');

router.post('/registerBatch', fabricanteController.registerBatch);

module.exports = router;
