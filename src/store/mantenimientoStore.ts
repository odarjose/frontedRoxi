import { defineStore } from "pinia";
import { ref } from "vue";

import type {
  MantenimientoEquipos,
  ListMatemientoEquipos,
} from "../types/InterfaceEquipos";
import mantenimientoService from "../service/mantenimientoService";

/* store */
export const useMantenimientoEquipoStore = defineStore("mantenimiento", () => {
  const mantenimiento = ref<ListMatemientoEquipos[]>([]);

  // listar examenes
  const ListarMatemientoEquipos = async () => {
    mantenimiento.value = await mantenimientoService.getMatemientoEquipos();
  };

  // insert examen
  const AddMatemientoEquipos = async (nuevoequipo: MantenimientoEquipos) => {
    await mantenimientoService.addMatemientoEquipos(nuevoequipo);
    await ListarMatemientoEquipos();
  };

  const UpdatMatemientoEquipos = async (
    actualizarequipo: MantenimientoEquipos,
  ) => {
    await mantenimientoService.updateMatemientoEquipos(actualizarequipo);
    await ListarMatemientoEquipos();
  };

  return {
    mantenimiento,
    ListarMatemientoEquipos,
    AddMatemientoEquipos,
    UpdatMatemientoEquipos,
  };
});
