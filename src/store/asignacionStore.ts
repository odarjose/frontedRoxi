import { defineStore } from "pinia";
import { ref } from "vue";

import type {
  AsignacionDocentes,
  ListAsignacionDocentes,
} from "../types/InterfaceDocentes";
import asignacionService from "../service/asigancionService";

/* store */
export const useAsignacionStore = defineStore("asignacion", () => {
  const asignacion = ref<ListAsignacionDocentes[]>([]);

  // listar examenes
  const ListarAsignacionesDocentes = async () => {
    asignacion.value = await asignacionService.getAsignacionDocentes();
  };

  // insert examen
  const AddAsignacionesDocentes = async (
    nuevasignacion: AsignacionDocentes,
  ) => {
    await asignacionService.addAsignacionDocentes(nuevasignacion);
    await ListarAsignacionesDocentes();
  };

  const UpdatAsignacionesDocentes = async (
    actualizarasignacion: AsignacionDocentes,
  ) => {
    await asignacionService.updateAsignacionDocentes(actualizarasignacion);
    await ListarAsignacionesDocentes();
  };

  return {
    asignacion,
    ListarAsignacionesDocentes,
    AddAsignacionesDocentes,
    UpdatAsignacionesDocentes,
  };
});
