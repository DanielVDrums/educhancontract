const { Contract } = require("fabric-contract-api");

class EduChain extends Contract {
  async initLedger(ctx) {
    console.info("============= START : Initialize Ledger ===========");
    const certificados = [];
    for (let i = 0; i < certificados.length; i++) {
      certificados[i].docType = "certificado";
      await ctx.stub.putState(
        "CERT" + i,
        Buffer.from(JSON.stringify(certificados[i]))
      );
      console.info("Added <--> ", certificados[i]);
    }
    console.info("============= END : Initialize Ledger ===========");
  }

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
    // Generar un identificador único para el certificado con marca de tiempo
    const fechaActual = new Date();
    const certificadoId = `CERT${fechaActual.getFullYear()}${(
      fechaActual.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${fechaActual
      .getDate()
      .toString()
      .padStart(2, "0")}${fechaActual
      .getHours()
      .toString()
      .padStart(2, "0")}${fechaActual
      .getMinutes()
      .toString()
      .padStart(2, "0")}${fechaActual
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    const certificado = {
      docType: "certificado",
      certificadoId,
      nombreEstudiante,
      dni,
      programa,
      fechaEmision,
      grado,
      tituloOtorgado,
      institucion,
      estado: "activo",
    };

    // Guardamos el certificado en la blockchain usando el certificadoId como clave
    await ctx.stub.putState(
      certificadoId,
      Buffer.from(JSON.stringify(certificado))
    );
    return certificado;
  }

  async verificarCertificado(ctx, certificadoId) {
    const certificadoAsBytes = await ctx.stub.getState(certificadoId);
    if (!certificadoAsBytes || certificadoAsBytes.length === 0) {
      throw new Error(`Certificado con ID ${certificadoId} no encontrado.`);
    }
    const certificado = JSON.parse(certificadoAsBytes.toString());
    if (certificado.estado === "revocado") {
      throw new Error(
        `El certificado con ID ${certificadoId} ha sido revocado.`
      );
    }
    return certificado;
  }

  async obtenerCertificadosPorEstudiante(ctx, dni) {
    const allResults = [];
    const iterator = await ctx.stub.getStateByRange("", "");
    for await (const res of iterator) {
      const value = JSON.parse(res.value.toString("utf8"));
      if (value.dni === dni) {
        allResults.push(value);
      }
    }
    if (allResults.length === 0) {
      throw new Error(
        `No se encontraron certificados para el estudiante con DNI ${dni}.`
      );
    }
    return allResults;
  }

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
    await ctx.stub.putState(
      certificadoId,
      Buffer.from(JSON.stringify(certificado))
    );
    return certificado;
  }

  async crearSolicitudVerificacion(
    ctx,
    certificadoId,
    nombreEmpleador,
    fechaSolicitud
  ) {
    const solicitudId = `SOL-${Date.now()}`;
    const solicitud = {
      certificadoId,
      nombreEmpleador,
      fechaSolicitud,
      solicitudId,
      resultado: null,
    };
    const certificado = await this.verificarCertificado(ctx, certificadoId);
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
