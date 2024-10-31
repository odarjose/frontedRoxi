export interface Docentes {
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
  iddocente: number;
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

export interface Reservas {
  id: number;
  aula_id: number;
  persona_id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  motivo: String;
  evento: String;
  estado: String;
}
