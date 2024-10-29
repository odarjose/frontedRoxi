import { defineStore } from "pinia";
import { ref } from "vue";

import type { Edificios } from "../types/InterfaceAulas";
import edificioService from "../service/edificioService";

/* store */
export const useEdificioStore = defineStore("edificio", () => {
  const edificio = ref<Edificios[]>([]);

  // listar examenes
  const ListarEdificios = async () => {
    edificio.value = await edificioService.getEdificios();
  };

  // insert examen
  const AddEdificios = async (nuevaedificio: Edificios) => {
    await edificioService.addEdificios(nuevaedificio);
    await ListarEdificios();
  };

  const UpdatEdificios = async (actualizaredificio: Edificios) => {
    await edificioService.updateEdificios(actualizaredificio);
    await ListarEdificios();
  };

  return {
    edificio,
    ListarEdificios,
    AddEdificios,
    UpdatEdificios,
  };
});
