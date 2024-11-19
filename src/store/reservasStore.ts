import { defineStore } from "pinia";
import { ref } from "vue";

import type { Reservas, ListReservas } from "../types/InterfaceDocentes";
import reservasService from "../service/reservasService";

/* store */
export const useReservasStore = defineStore("reservas", () => {
  const reservas = ref<ListReservas[]>([]);

  // listar examenes
  const ListarReservas = async () => {
    reservas.value = await reservasService.getReservas();
  };

  // insert examen
  const AddReservas = async (nuevoreservas: Reservas) => {
    await reservasService.addReservas(nuevoreservas);
    await ListarReservas();
  };

  const UpdatReservas = async (actualizarrecurso: Reservas) => {
    await reservasService.updateReservas(actualizarrecurso);
    await ListarReservas();
  };

  return {
    reservas,
    ListarReservas,
    AddReservas,
    UpdatReservas,
  };
});
