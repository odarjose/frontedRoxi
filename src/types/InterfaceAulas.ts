export interface Aulas {
  id: number;
  nombre: String;
  edificio: String;
  edificio_id: number;
  piso: number;
  capacidad: number;
  tipo: String;
}

export interface Edificios {
  id: number;
  nombre: String;
  direccion: String;
}
