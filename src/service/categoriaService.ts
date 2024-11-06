import axios from "axios";
import type { Categorias } from "../types/InterfaceEquipos";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getCategorias() {
    const response = await axios.get<Categorias[]>(`${baseURL}/ca/on`);
    return response.data;
  },
  async addCategorias(aulas: Categorias) {
    const response = await axios.post(`${baseURL}/ca/in`, aulas);
    return response.data;
  },

  async updateCategorias(aulas: Categorias) {
    const response = await axios.put(`${baseURL}/ca/up/${aulas.id}`, aulas);
    return response.data;
  },
};
