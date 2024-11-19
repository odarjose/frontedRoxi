export interface Docentes {
  nombre: String;
  apellido: String;
  dni: String;
  fecha_nacimiento: Date;
  email: String;
  telefono: String;
  direccion: String;
  rol: String;
  id: number;
  idpersona: number;
  tipo_docencia: String;
  tipo_contrato: String;
  fecha_inicio_contrato: Date;
  fecha_fin_contrato: Date;
  fecha_ingreso: Date;
  fecha_salida: Date;
  turno: String;
}

export interface ListDocente {
  nombre: String;
  apellido: String;
  dni: String;
  fecha_nacimiento: Date;
  email: String;
  telefono: String;
  direccion: String;
  rol: String;
  id: number;
  idpersona: number;
  tipo_docencia: String;
  tipo_contrato: String;
  fecha_inicio_contrato: Date;
  fecha_fin_contrato: Date;
  fecha_ingreso: Date;
  fecha_salida: Date;
  turno: String;
}
export interface AsignacionDocentes {
  id: number;
  docente_id: number;
  seccion_id: number;
  periodo_academico: number;
  turno: String;
}

export interface ListAsignacionDocentes {
  id: number;
  docente_id: number;
  seccion_id: number;
  docente: String;
  seccion: String;
  periodo_academico: number;
  turno: String;
}

export interface Reservas {
  id: number;
  aula_id: number;
  docente_id: number;
  fecha: Date;
  hora_inicio: String;
  hora_fin: String;
  motivo: String;
  evento: String;
  estado: String;
}

export interface ListReservas {
  id: number;
  aula_id: number;
  docente_id: number;
  aula: String;
  nombre: String;
  apellidos: String;
  dni: String;
  fecha: Date;
  hora_inicio: String;
  hora_fin: String;
  motivo: String;
  evento: String;
  estado: String;
}
