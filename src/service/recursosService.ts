import axios from "axios";
import type { Recursos, ListRecursos } from "../types/InterfaceAulas";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getRecursos() {
    const response = await axios.get<ListRecursos[]>(`${baseURL}/ra/on`);
    return response.data;
  },
  async addRecursos(aulas: ListRecursos) {
    const response = await axios.post(`${baseURL}/ra/in`, aulas);
    return response.data;
  },

  async updateRecursos(aulas: ListRecursos) {
    const response = await axios.put(`${baseURL}/ra/up/${aulas.id}`, aulas);
    return response.data;
  },
};
