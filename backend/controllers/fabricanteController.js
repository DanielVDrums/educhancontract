const { connectToNetwork } = require("../services/fabricService");

exports.registerBatch = async (req, res) => {
  try {
    const { contract, gateway } = await connectToNetwork("Fabricante");
    const {
      batchID,
      manufacturer,
      productionDate,
      expiryDate,
      transportCond,
      location,
      medicationName,
      medicationsJSON,
    } = req.body;

    await contract.submitTransaction(
      "RegisterBatch",
      batchID,
      manufacturer,
      productionDate,
      expiryDate,
      transportCond,
      location,
      medicationName,
      medicationsJSON
    );
    await gateway.disconnect();
    res.status(200).send("Batch registered successfully");
  } catch (error) {
    res.status(500).send(`Failed to register batch: ${error.message}`);
  }
};
