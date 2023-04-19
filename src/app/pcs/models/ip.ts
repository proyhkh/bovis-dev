export interface ICatalogo{
  id: string;
  descripcion: string;
  activo: boolean;
}

export interface ICatalogoCombos {
  name: string;
  value: string;
}

export interface ICatalogoCliente{
  idCliente: string;
  rfc: string;
  cliente: boolean;
}
