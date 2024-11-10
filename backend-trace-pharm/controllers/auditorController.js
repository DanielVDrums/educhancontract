const { connectToNetwork } = require("../services/fabricService");

exports.validateAuthenticity = async (req, res) => {
  try {
    const { contract, gateway } = await connectToNetwork("Auditor");
    const { batchID } = req.body;
    console.log("Batch ID:", req.body);

    // Invocar la transacción para validar la autenticidad
    const result = await contract.evaluateTransaction(
      "ValidateAuthenticity",
      batchID
    );

    await gateway.disconnect();
    res.status(200).send(JSON.parse(result.toString()));
  } catch (error) {
    res.status(500).send({ error: `Failed to validate authenticity: ${error.message}` });
  }
};
