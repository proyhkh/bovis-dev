

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
  noFactura: string = null;
}

export class BusquedaCancelacion{
  [key: string]: any;
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
  [key: string]: any;
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
  [key: string]: any;
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

export const encabezados = Object.freeze([
  {id: 'id', label: 'Id'},
  {id: 'uuid', label: 'Uuid'},
  {id: 'numProyecto', label: 'No. Proyecto'},
  {id: 'idTipoFactura', label: 'Id Tipo Factura'},
  {id: 'idMoneda', label: 'Id Moneda'},
  {id: 'importe', label: 'Importe'},
  {id: 'iva', label: 'IVA'},
  {id: 'ivaRet', label: 'IVA Retenido'},
  {id: 'total', label: 'Total'},
  {id: 'concepto', label: 'Concepto'},
  {id: 'mes', label: 'Mes'},
  {id: 'anio', label: 'Año'},
  {id: 'fechaEmision', label: 'Fecha Emisión'},
  {id: 'fechaPago', label: 'Fecha Pago'},
  {id: 'fechaCancelacion', label: 'Fecha Cancelación'},
  {id: 'noFactura', label: 'No. Factura'},
  {id: 'tipoCambio', label: 'Tipo Cambio'},
  {id: 'motivoCancelacion', label: 'Motivo Cancelación'},
  // {id: 'notas', label: 'Notas'},
  // {id: 'cobranzas', label: 'Cobranzas'},
  {id: 'totalNotasCredito', label: 'Total Notas Crédito'},
  {id: 'totalCobranzas', label: 'Total Cobranzas'}
])

export const equivalenteFacturaNota = Object.freeze([
  {padre: 'uuid', hijo: 'nC_UuidNotaCredito'},
  {padre: 'idMoneda', hijo: 'nC_IdMoneda'},
  {padre: '', hijo: 'nC_IdTipoRelacion'},
  {padre: '', hijo: 'nC_NotaCredito'},
  {padre: 'importe', hijo: 'nC_Importe'},
  {padre: 'iva', hijo: 'nC_Iva'},
  {padre: 'total', hijo: 'nC_Total'},
  {padre: 'concepto', hijo: 'nC_Concepto'},
  {padre: 'mes', hijo: 'nC_Mes'},
  {padre: 'anio', hijo: 'nC_Anio'},
  {padre: 'tipoCambio', hijo: 'nC_TipoCambio'},
  {padre: 'fechaEmision', hijo: 'nC_FechaNotaCredito'}
])

export const equivalenteFacturaCobranza = Object.freeze([
  {padre: 'uuid', hijo: 'c_UuidCobranza'},
  {padre: 'idMoneda', hijo: 'c_IdMonedaP'},
  // {padre: 'importe', hijo: 'c_ImportePagado'},
  {padre: '', hijo: 'c_ImpSaldoAnt'},
  {padre: '', hijo: 'c_ImporteSaldoInsoluto'},
  {padre: 'iva', hijo: 'c_IvaP'},
  {padre: 'total', hijo: 'c_ImportePagado'},
  {padre: 'tipoCambio', hijo: 'c_TipoCambioP'},
  {padre: 'fechaPago', hijo: 'c_FechaPago'}
])