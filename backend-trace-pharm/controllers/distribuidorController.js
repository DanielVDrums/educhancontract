const { connectToNetwork } = require('../services/fabricService');

exports.initiateShipment = async (req, res) => {
  try {
    const { contract, gateway } = await connectToNetwork("Distribuidor");
    await contract.submitTransaction('InitiateShipment', req.body.batchID, req.body.carrier);
    await gateway.disconnect();
    res.status(200).send('Shipment initiated successfully');
  } catch (error) {
    res.status(500).send(`Failed to initiate shipment: ${error}`);
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { contract, gateway } = await connectToNetwork("Distribuidor");
    await contract.submitTransaction('UpdateEvent', req.body.batchID, req.body.location, req.body.temperature, req.body.humidity, req.body.timestamp);
    await gateway.disconnect();
    res.status(200).send('Event updated successfully');
  } catch (error) {
    res.status(500).send(`Failed to update event: ${error}`);
  }
};
