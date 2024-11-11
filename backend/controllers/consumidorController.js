const fabricService = require('../services/fabricService');

exports.validateMedication = async (req, res) => {
    try {
        const result = await fabricService.invokeChaincode(req.body, 'Consumidor', 'ValidateMedication');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Añadir otros métodos si es necesario
