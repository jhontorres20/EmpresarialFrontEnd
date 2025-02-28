/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormData {
  razonSocial: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
  municipio: any;
  estado: string;
  city?: string;
  departamento?: string;
}

export interface LoginData {
  email: string;
  password: string;
  terms: boolean;
}