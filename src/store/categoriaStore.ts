import { defineStore } from "pinia";
import { ref } from "vue";

import type { Categorias } from "../types/InterfaceEquipos";
import categoriaService from "../service/categoriaService";

/* store */
export const useCategoriaStore = defineStore("aula", () => {
  const categoria = ref<Categorias[]>([]);

  // listar examenes
  const ListarCategorias = async () => {
    categoria.value = await categoriaService.getCategorias();
  };

  // insert examen
  const AddCategorias = async (nuevacategoria: Categorias) => {
    await categoriaService.addCategorias(nuevacategoria);
    await ListarCategorias();
  };

  const UpdatCategorias = async (actualizarcategoria: Categorias) => {
    await categoriaService.updateCategorias(actualizarcategoria);
    await ListarCategorias();
  };

  return {
    categoria,
    ListarCategorias,
    AddCategorias,
    UpdatCategorias,
  };
});
