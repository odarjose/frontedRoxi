import { defineStore } from "pinia";
import { ref } from "vue";

import type { Prestamos, ListPrestamos } from "../types/InterfaceEquipos";
import prestamoService from "../service/prestamosService";

/* store */
export const usePrestamoStore = defineStore("prestamos", () => {
  const prestamo = ref<ListPrestamos[]>([]);

  // listar examenes
  const ListarPrestamos = async () => {
    prestamo.value = await prestamoService.getPrestamos();
  };

  // insert examen
  const AddPrestamo = async (nuevoprestamo: Prestamos) => {
    await prestamoService.addPrestamos(nuevoprestamo);
    await ListarPrestamos();
  };

  const UpdatePrestamo = async (actualizarprestamo: Prestamos) => {
    await prestamoService.updatePrestamos(actualizarprestamo);
    await ListarPrestamos();
  };

  return {
    prestamo,
    ListarPrestamos,
    AddPrestamo,
    UpdatePrestamo,
  };
});
