export interface Aulas {
  id: number;
  nombre: String;
  edificio: String;
  edificio_id: number;
  piso: number;
  capacidad: number;
  tipo: String;
}
export interface Secciones {
  id: number;
  aula_id: number;
  aula: String;
  seccion: String;
  grado: number;
  periodo_academico: number;
}

export interface Edificios {
  id: number;
  nombre: String;
  direccion: String;
}

export interface ListRecursos {
  id: number;
  aula_id: number;
  aula: String;
  recurso: String;
  cantidad: number;
}
export interface Recursos {
  id: number;
  aula_id: number;
  nombre: String;
  cantidad: number;
}
