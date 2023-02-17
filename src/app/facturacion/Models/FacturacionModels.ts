

export class CargaFile {
  B64Xml: string;
}

export class ResponseXML{
  rfcEmisor: string;
  rfcReceptor: string;
  fechaEmision: string;
  total: string;
  conceptos: String;
  tipoFactura: string;
  noFactura: string;
  facturaNombre: string;
  almacenada: string;
  error: string;
}

export class InfoProyecto{
  nombre: string;
  numProyecto: number;
  rfcBaseEmisor: string;
  rfcBaseReceptor: string;
}

export class InfoProyectoFacturas{
  NumProyecto: number;
  rfcEmisor: string;
  rfcReceptor: string;
  LstFacturas: Array<any> = new Array<any>();
}

export class LstFacturas{
  NombreFactura: string;
  FacturaB64: string;
}
