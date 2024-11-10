const { Contract } = require("fabric-contract-api");
const crypto = require("crypto");

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
    const certificadoId = generarCertificadoId(
      nombreEstudiante,
      dni,
      programa,
      fechaEmision,
      grado,
      tituloOtorgado,
      institucion
    );
    const certificado = {
      nombreEstudiante,
      dni,
      programa,
      fechaEmision,
      grado,
      tituloOtorgado,
      institucion,
      certificadoId,
      estado: "activo",
    };
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
      throw new Error(`El certificado ${certificadoId} ha sido revocado.`);
    }
    return certificado;
  }

  async obtenerCertificadosPorEstudiante(ctx, dni) {
    const query = { selector: { dni } };
    const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
    const resultados = [];
    while (true) {
      const res = await iterator.next();
      if (res.value) {
        resultados.push(JSON.parse(res.value.value.toString("utf8")));
      }
      if (res.done) break;
    }
    return resultados;
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
    const solicitudId = generarSolicitudId(
      certificadoId,
      nombreEmpleador,
      fechaSolicitud
    );
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

function generarCertificadoId(
  nombreEstudiante,
  dni,
  programa,
  fechaEmision,
  grado,
  tituloOtorgado,
  institucion
) {
  const data = `${nombreEstudiante}|${dni}|${programa}|${fechaEmision}|${grado}|${tituloOtorgado}|${institucion}|${Date.now()}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}

function generarSolicitudId(certificadoId, nombreEmpleador, fechaSolicitud) {
  const data = `${certificadoId}|${nombreEmpleador}|${fechaSolicitud}|${Date.now()}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}

module.exports = EduChain;
