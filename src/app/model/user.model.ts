// Generated by https://quicktype.io

export interface RolesResponse {
  data:          UsuarioInfo;
  success:       boolean;
  message:       null;
  transactionId: null;
}

export interface UsuarioInfo {
  nukidusuario: number;
  chusuario:    string;
  chemail:      string;
  permisos:     Permiso[];
}

export interface Permiso {
  nukidmodulo:        number;
  chmodulo:           string;
  chsub_modulo:       string;
  chmodulo_slug:      string;
  chsub_modulo_slug:  string;
  chpermiso:          string;
  perfiles:           string[];
}

export interface RolPermiso {
  rol:            string,
  administrador:  boolean
}

export interface OpcionSubMenu { 
  label: string; 
  routerLink: string[]; 
  id: string; 
  command: () => void; 
}