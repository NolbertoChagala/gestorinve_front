export interface Credentials {
  correo: string;
  contraseña: string;
}

export interface RegisterCredentials {
  id_usuario?: number;
  nombre: string;
  correo: string;
  contraseña: string;
  rol: string;
}
