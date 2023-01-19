export class Subordinados {

  centrosdeCostos?: string = '';
  nombre?: string = '';
  noEmpleado?: string = '';
  puesto?: string = '';
  direccionEjecutiva?: string = '';
  unidadDeNegocio?: string = '';
  jefeDirecto?: string = '';
  nivel?: string;
  proyecto?: string = '';
}

export class Objetivos {
  id: string = '';
  concepto?: string = '';
  descripcion?: string = '';
  idEmpOb?: string = '';
  meta?: string = '';
  tooltip?: string = '';
  unidadDeNegocio?: string = '';
  isComodin: boolean = false;
}

export class ObjetivosGenerales {
  id: string = '';
  concepto?: string = '';
  descripcion?: string = '';
  meta?: string = '';
  nivel?: string;
  tooltip?: string = '';
  unidadDeNegocio?: string = '';
  valor?: string = '';
}

