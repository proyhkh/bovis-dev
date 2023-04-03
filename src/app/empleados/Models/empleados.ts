// import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct";

export class Empleado {

  id: number;
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  datosContacto: string = '';
  fechaNacimiento: Date;
  edad: number;
  sexo: string = 'Masculino';
  direccion: string = '';
  clave_id_fed: string = '';
  email: string = '';
  telefono: string = '';
  kfc: string = '';
  curp: string = '';
  nss: string = '';
  porcentajeCaptura: number = 35;

}
export class Catalogo{
  id: string = '';
  descripcion: string = '';
  activo: boolean;
}

export class Persona{

  IdEdoCivil: number = 0;
  IdTipoSangre: number = 0;
  Nombre: string = '';
  ApPaterno: string = '';
  ApMaterno: string = '';
  Sexo: number = 0;
  Rfc: string = '';
  FechaNacimiento: string = '';
  Email: string = '';
  Telefono: string = '';
  Celular: string = '';
  Curp: string = '';
  TipoPersona: number = 0;
}

export class CatPersona{

  idPersona: number = 0;
  idEdoCivil: number = 0;
  idTipoSangre: number = 0;
  nombre: string = '';
  id: string = '';
  apPaterno: string = '';
  apMaterno: string = '';
  Sexo: number = 0;
  sexo: string = '';
  rfc: string = '';
  fechaNacimiento: string = '';
  email: string = '';
  telefono: string = '';
  celular: string = '';
  curp: string = '';
  activo: boolean = true;
  tipoPersona: number = 0;

}

export class CatEmpleado {

  numEmpleadoRrHh: number = 0;
  idPersona: number = 0;
  idTipoEmpleado: number = 0;
  idCategoria: number = 0;
  idTipoContrato: number = 0;
  cvePuesto: number = 0;
  idEmpresa: number = 0;
  idCiudad: number = 0;
  idNivelEstudios: number = 0;
  idFormaPago: number = 0;
  idJornada: number = 0;
  idDepartamento: number = 0;
  idClasificacion: number = 0;
  idJefeDirecto: number = 0;
  idUnidadNegocio: number = 0;
  idTipoContratoSat: number = 0;
  numEmpleado: number = 0;
  fechaIngreso: string = '';
  fechaSalida: null;
  fechaUltimoReingreso: null;
  nss: null;
  emailBovis: string = '';
  experiencias: null;
  habilidades: null;
  urlRepositorio: null;
  salario: string = '';
  profesion: string = '';
  antiguedad: number = 0;
  turno: string = '';
  unidadMedica: number = 0;
  registroPatronal: string = '';
  cotizacion: null;
  duracion: number = 0;
  activo: boolean = false;
  descuentoPension: boolean = false;
  porcentajePension: null;
  fondoFijo: null;
  creditoInfonavit: null;
  tipoDescuento: null;
  valorDescuento: null;
  empleadoNoi: number = 0;

}

