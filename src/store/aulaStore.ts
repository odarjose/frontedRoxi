import { defineStore } from "pinia";
import { ref } from "vue";

import type { Aulas } from "../types/InterfaceAulas";
import aulaService from "../service/aulaService";

/* store */
export const useAulaStore = defineStore("aula", () => {
  const aula = ref<Aulas[]>([]);

  // listar examenes
  const ListarAulas = async () => {
    aula.value = await aulaService.getAulas();
  };

  // insert examen
  const AddAulas = async (nuevaaula: Aulas) => {
    await aulaService.addAulas(nuevaaula);
    await ListarAulas();
  };

  const UpdatAulas = async (actualizaraula: Aulas) => {
    await aulaService.updateAulas(actualizaraula);
    await ListarAulas();
  };

  return {
    aula,
    ListarAulas,
    AddAulas,
    UpdatAulas,
  };
});
