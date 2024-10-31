import { defineStore } from "pinia";
import { ref } from "vue";

import type { Docentes, ListDocente } from "../types/InterfaceDocentes";
import docenteService from "../service/docenteService";

/* store */
export const useDocenteStore = defineStore("docente", () => {
  const docente = ref<ListDocente[]>([]);

  // listar examenes
  const ListarDocentes = async () => {
    docente.value = await docenteService.getDocentes();
  };

  // insert examen
  const AddDocentes = async (nuevaaula: Docentes) => {
    await docenteService.addDocentes(nuevaaula);
    await ListarDocentes();
  };

  const UpdateDocentes = async (actualizaraula: Docentes) => {
    await docenteService.updateDocentes(actualizaraula);
    await ListarDocentes();
  };

  return {
    docente,
    ListarDocentes,
    AddDocentes,
    UpdateDocentes,
  };
});
