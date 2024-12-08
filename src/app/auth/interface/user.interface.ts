//SE VA BORRAR
export interface User {
  idUsuario?: string;
  nombres?: string;
  apellidos?: string;
  documento?: string;
  nDocumento?: string;
  nTeleforno?: string;
  correo: string;
  contrasena: string;
  rol?: string;
}

export interface Usuario {
  correo: string;
  contrasena: string;
  rol: string;
  persona: Persona;
}

export interface Persona {
  nombres: string;
  apellidos: string;
  documento: string;
  nDocumento: string;
  telefono: string;
}

export interface UsuarioAuth {
  rol: string;
  nombre: string;
  apellido: string;
  jwt: string;
}
