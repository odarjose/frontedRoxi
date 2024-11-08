import { defineStore } from "pinia";
import { ref } from "vue";

import type { Recursos, ListRecursos } from "../types/InterfaceAulas";
import recursosService from "../service/recursosService";

/* store */
export const useRecursosStore = defineStore("recursos", () => {
  const recursos = ref<ListRecursos[]>([]);

  // listar examenes
  const ListarRecursos = async () => {
    recursos.value = await recursosService.getRecursos();
  };

  // insert examen
  const AddRecursos = async (nuevorecurso: Recursos) => {
    await recursosService.addRecursos(nuevorecurso);
    await ListarRecursos();
  };

  const UpdatRecursos = async (actualizarrecurso: Recursos) => {
    await recursosService.updateRecursos(actualizarrecurso);
    await ListarRecursos();
  };

  return {
    recursos,
    ListarRecursos,
    AddRecursos,
    UpdatRecursos,
  };
});
