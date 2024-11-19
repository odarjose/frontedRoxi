import { defineStore } from "pinia";
import { ref } from "vue";

import type { Secciones } from "../types/InterfaceAulas";
import seccionesService from "../service/seccionesService";
/* store */
export const useSeccionesStore = defineStore("seccion", () => {
  const seccion = ref<Secciones[]>([]);

  // listar examenes
  const ListarSecciones = async () => {
    const result = await seccionesService.getSecciones();
    seccion.value = Array.isArray(result) ? result : []; // Asegura que seccion.value sea siempre un arreglo
  };

  // insert examen
  const AddSecciones = async (nuevaaula: Secciones) => {
    await seccionesService.addSecciones(nuevaaula);
    await ListarSecciones();
  };

  const UpdatSecciones = async (actualizaraula: Secciones) => {
    await seccionesService.updateSecciones(actualizaraula);
    await ListarSecciones();
  };

  return {
    seccion,
    ListarSecciones,
    AddSecciones,
    UpdatSecciones,
  };
});
