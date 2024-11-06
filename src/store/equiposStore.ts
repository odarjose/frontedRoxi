import { defineStore } from "pinia";
import { ref } from "vue";

import type { Equipos, ListEquipos } from "../types/InterfaceEquipos";
import equipoService from "../service/equipoService";

/* store */
export const useEquipoStore = defineStore("equipo", () => {
  const equipo = ref<ListEquipos[]>([]);

  // listar examenes
  const ListarEquipos = async () => {
    equipo.value = await equipoService.getEquipos();
  };

  // insert examen
  const AddEquipos = async (nuevoequipo: Equipos) => {
    await equipoService.addEquipos(nuevoequipo);
    await ListarEquipos();
  };

  const UpdatEquipos = async (actualizarequipo: Equipos) => {
    await equipoService.updateEquipos(actualizarequipo);
    await ListarEquipos();
  };

  return {
    equipo,
    ListarEquipos,
    AddEquipos,
    UpdatEquipos,
  };
});
