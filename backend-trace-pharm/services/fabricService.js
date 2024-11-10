const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

async function connectToNetwork(userName) {
  const ccpPath = path.resolve(__dirname, "../connection-profile.json");
  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  // Ruta al directorio de certificados
  const credPath = path.resolve(__dirname, "..", "wallet", userName, "msp");

  // Leer el certificado
  const certPath = path.join(credPath, "signcerts", "cert.pem");
  const certificate = fs.readFileSync(certPath).toString();

  // Buscar el archivo de clave privada en el directorio 'keystore'
  const keyDir = path.join(credPath, "keystore");
  const keyFiles = fs.readdirSync(keyDir);
  const privateKeyPath = path.join(keyDir, keyFiles[0]); // Asumimos que solo hay un archivo en 'keystore'
  const privateKey = fs.readFileSync(privateKeyPath).toString();

  // Crear una nueva identidad y agregarla a la billetera
  const identityLabel = userName;
  const identity = {
    credentials: {
      certificate: certificate,
      privateKey: privateKey,
    },
    mspId: "Org1MSP",
    type: "X.509",
  };
  await wallet.put(identityLabel, identity);

  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: userName,
    discovery: { enabled: false, asLocalhost: true },
  });

  const network = await gateway.getNetwork("default");
  const contract = network.getContract("chaincode-trace-pharm");

  return { contract, gateway };
}

module.exports = { connectToNetwork };
