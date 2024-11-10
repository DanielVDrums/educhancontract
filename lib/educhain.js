const { Contract } = require("fabric-contract-api");

class EduChain extends Contract {
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
    const certificado = {
      nombreEstudiante,
      dni,
      programa,
      fechaEmision,
      grado,
      tituloOtorgado,
      institucion,
      estado: "activo",
    };
    // Guardamos el certificado en la blockchain usando el DNI como clave
    await ctx.stub.putState(
      dni,
      Buffer.from(JSON.stringify(certificado))
    );
    return certificado;
  }

  async verificarCertificado(ctx, dni) {
    const certificadoAsBytes = await ctx.stub.getState(dni);
    if (!certificadoAsBytes || certificadoAsBytes.length === 0) {
      throw new Error(`Certificado con DNI ${dni} no encontrado.`);
    }
    const certificado = JSON.parse(certificadoAsBytes.toString());
    if (certificado.estado === "revocado") {
      throw new Error(`El certificado con DNI ${dni} ha sido revocado.`);
    }
    return certificado;
  }

  async obtenerCertificadosPorEstudiante(ctx, dni) {
    const certificadoAsBytes = await ctx.stub.getState(dni);
    if (!certificadoAsBytes || certificadoAsBytes.length === 0) {
      throw new Error(`No se encontraron certificados para el estudiante con DNI ${dni}.`);
    }
    const certificado = JSON.parse(certificadoAsBytes.toString());
    return [certificado];
  }

  async revocarCertificado(ctx, dni, motivo) {
    const certificadoAsBytes = await ctx.stub.getState(dni);
    if (!certificadoAsBytes || certificadoAsBytes.length === 0) {
      throw new Error(`Certificado con DNI ${dni} no encontrado.`);
    }
    const certificado = JSON.parse(certificadoAsBytes.toString());
    if (certificado.estado === "revocado") {
      throw new Error(`El certificado ya ha sido revocado.`);
    }
    certificado.estado = "revocado";
    certificado.motivoRevocacion = motivo;
    await ctx.stub.putState(
      dni,
      Buffer.from(JSON.stringify(certificado))
    );
    return certificado;
  }

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
    const certificado = await this.verificarCertificado(ctx, dni);
    solicitud.resultado =
      certificado.estado === "activo" ? "válido" : "inválido";
    await ctx.stub.putState(
      solicitudId,
      Buffer.from(JSON.stringify(solicitud))
    );
    return solicitud;
  }
}

module.exports = EduChain;
