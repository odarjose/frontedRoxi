export interface Equipos {
  id: number;
  nombre: String;
  marca: String;
  modelo: String;
  numero_serie: String;
  anio_adquisicion: number;
  estado: String;
  categoria_id: number;
  asignado_a: number;
  ubicacion: String;
}
export interface ListEquipos {
  id: number;
  nombre: String;
  marca: String;
  modelo: String;
  numero_serie: String;
  anio_adquisicion: number;
  estado: String;
  categoria: String;
  docente: String;
  categoria_id: number;
  asignado_a: number;
  ubicacion: String;
}
export interface Categorias {
  id: number;
  nombre: String;
  descripcion: String;
}

export interface HistorialMantenimineto {
  id_historialmantenimiento: number;
  persona_id: number;
  equipo_id: number;
  fecha: Date;
  detalles: String;
}

export interface Prestamos {
  id: number;
  equipo_id: number;
  docente_id: number;
  fecha_retiro: Date;
  fecha_devolucion: Date;
  estado_retiro: String;
  estado_devolucion: String;
  observaciones: String;
}

export interface ListPrestamos {
  id: number;
  equipo_id: number;
  docente_id: number;
  nombre: String;
  apellido: String;
  equipo: String;
  fecha_retiro: Date;
  fecha_devolucion: Date;
  estado_retiro: String;
  estado_devolucion: String;
  observaciones: String;
}

export interface MantenimientoEquipos {
  id: number;
  equipo_id: number;
  fecha_mantenimiento: Date;
  nombre_tecnico: string;
  telefono_tecnico: string;
  tipo_mantenimiento: String;
  detalles: String;
  costo: number;
}
export interface ListMatemientoEquipos {
  id: number;
  equipo_id: number;
  nombre_tecnico: string;
  telefono_tecnico: string;
  equipo: String;
  fecha_mantenimiento: Date;
  tipo_mantenimiento: String;
  detalles: String;
  costo: number;
}
