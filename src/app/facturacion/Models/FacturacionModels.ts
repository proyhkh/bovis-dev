

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

export class FacrurasNC{
  LstFacturas: Array<any> = new Array<any>();
}

export class Busqueda{
  idProyecto: any = null;
  idCliente: any = null;
  idEmpresa: any = null;
  fechaIni: string = null;
  fechaFin: string = null;
}

export class BusquedaCancelacion{

  id: number;
  uuid: string;
  numProyecto: number;
  idTipoFactura: string;
  idMoneda: string;
  importe: number;
  iva: number;
  ivaRet: number;
  total: number;
  concepto: string;
  mes: number;
  anio: number;
  fechaEmision: string;
  fechaPago: string;
  fechaCancelacion: string;
  noFactura: string;
  tipoCambio: string;
  motivoCancelacion: string;
  nC_UuidNotaCredito: string;
  nC_IdMoneda: string;
  nC_IdTipoRelacion: string;
  nC_NotaCredito: string;
  nC_Importe: string;
  nC_Iva: string;
  nC_Total: string;
  nC_Concepto: string;
  nC_Mes: string;
  nC_Anio: string;
  nC_TipoCambio: string;
  nC_FechaNotaCredito: string;
  c_UuidCobranza: string;
  c_IdMonedaP: string;
  c_ImportePagado: number;
  c_ImpSaldoAnt: number;
  c_ImporteSaldoInsoluto: string;
  c_IvaP: string;
  c_TipoCambioP: string;
  c_FechaPago: string;
  notas: NotaCredito[];
  cobranzas: Cobranza[];
  totalNotasCredito: number;
  totalCobranzas: number;
}

export interface NotaCredito {
  nC_UuidNotaCredito:  string;
  nC_IdMoneda:         string;
  nC_IdTipoRelacion:   string;
  nC_NotaCredito:      string;
  nC_Importe:          number;
  nC_Iva:              number;
  nC_Total:            number;
  nC_Concepto:         string;
  nC_Mes:              number;
  nC_Anio:             number;
  nC_TipoCambio:       string | null;
  nC_FechaNotaCredito: string;
}

export interface Cobranza {
  c_UuidCobranza:         string;
  c_IdMonedaP:            string;
  c_ImportePagado:        number;
  c_ImpSaldoAnt:          number;
  c_ImporteSaldoInsoluto: number;
  c_IvaP:                 number;
  c_TipoCambioP:          number;
  c_FechaPago:            string;
}


export class Proyectos{
  numProyecto: number;
  nombre: string;
  alcance: string;
}

export class Empresas{
  idEmpresa: number;
  empresa: string;
  rfc: string;
}

export class Clientes{
  idCliente: number;
  rfc: string;
  cliente: string;
}

export class facturaCancelacion{
  id: number;
  MotivoCancelacion: string;
  FechaCancelacion: string;
}
