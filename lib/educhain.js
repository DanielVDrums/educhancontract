const { Contract } = require("fabric-contract-api");
const { v4: uuidv4 } = require("uuid");

class EduChain extends Contract {

  // Emitir un certificado único por estudiante, pero con ID único para cada certificado.
  async emitirCertificado(
    ctx,
    nombreEstudiante,
    dni,
    programa,
    fechaEmision,
    grado,
    tituloOtorgado,
    institucion
  ) {
    // Crear un ID único para este certificado
    const certificadoId = uuidv4(); // Generamos un UUID único para el certificado.

    const certificado = {
      certificadoId,  // ID único del certificado
      nombreEstudiante,
      dni,
      programa,
      fechaEmision,
      grado,
      tituloOtorgado,
      institucion,
      estado: "activo",
    };

    // Guardar el certificado en la blockchain con el ID único como clave
    await ctx.stub.putState(certificadoId, Buffer.from(JSON.stringify(certificado)));

    // Devolver el certificado con su ID único
    return certificado;
  }

  // Verificar un certificado usando su ID único
  async verificarCertificado(ctx, certificadoId) {
    const certificadoAsBytes = await ctx.stub.getState(certificadoId);
    if (!certificadoAsBytes || certificadoAsBytes.length === 0) {
      throw new Error(`Certificado con ID ${certificadoId} no encontrado.`);
    }
    const certificado = JSON.parse(certificadoAsBytes.toString());
    if (certificado.estado === "revocado") {
      throw new Error(`El certificado con ID ${certificadoId} ha sido revocado.`);
    }
    return certificado;
  }

  // Obtener todos los certificados asociados a un estudiante por su DNI
  async obtenerCertificadosPorEstudiante(ctx, dni) {
    const certificados = [];
    const iterator = await ctx.stub.getStateByRange('', ''); // Recorremos todo el espacio de claves

    while (true) {
      const res = await iterator.next();
      if (res.done) {
        break;
      }

      const certificado = JSON.parse(res.value.value.toString());
      if (certificado.dni === dni) {
        certificados.push(certificado);
      }
    }
    await iterator.close();
    
    if (certificados.length === 0) {
      throw new Error(`No se encontraron certificados para el estudiante con DNI ${dni}.`);
    }

    return certificados;
  }

  // Revocar un certificado utilizando su ID único
  async revocarCertificado(ctx, certificadoId, motivo) {
    const certificadoAsBytes = await ctx.stub.getState(certificadoId);
    if (!certificadoAsBytes || certificadoAsBytes.length === 0) {
      throw new Error(`Certificado con ID ${certificadoId} no encontrado.`);
    }
    const certificado = JSON.parse(certificadoAsBytes.toString());
    if (certificado.estado === "revocado") {
      throw new Error(`El certificado ya ha sido revocado.`);
    }
    certificado.estado = "revocado";
    certificado.motivoRevocacion = motivo;

    await ctx.stub.putState(certificadoId, Buffer.from(JSON.stringify(certificado)));
    return certificado;
  }

  // Crear una solicitud de verificación
  async crearSolicitudVerificacion(
    ctx,
    dni,
    nombreEmpleador,
    fechaSolicitud
  ) {
    const solicitudId = `SOL-${Date.now()}`;
    const solicitud = {
      dni,
      nombreEmpleador,
      fechaSolicitud,
      solicitudId,
      resultado: null,
    };

    // Verificar si existe un certificado activo para el DNI
    const certificados = await this.obtenerCertificadosPorEstudiante(ctx, dni);
    const certificadoActivo = certificados.find(cert => cert.estado === "activo");

    solicitud.resultado = certificadoActivo ? "válido" : "inválido";

    await ctx.stub.putState(solicitudId, Buffer.from(JSON.stringify(solicitud)));
    return solicitud;
  }
}

module.exports = EduChain;
