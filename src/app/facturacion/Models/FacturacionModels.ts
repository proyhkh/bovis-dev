

export class CargaFile {
  B64Xml: string;
}

export class ResponseXML{
  conceptos: Array<String> = [];
  fecha: string;
  folio: string;
  moneda: string;
  rfcEmisor: string;
  rfcReceptor: string;
  serie: string;
  subTotal: string;
  tipoDeComprobante: string;
  total: string;
  totalImpuestosTrasladados: string;
  uuid: string;
}
