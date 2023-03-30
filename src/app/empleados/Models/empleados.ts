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

