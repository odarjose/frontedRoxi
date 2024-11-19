import axios from "axios";
import type { ListPrestamos, Prestamos } from "../types/InterfaceEquipos";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getPrestamos() {
    const response = await axios.get<ListPrestamos[]>(`${baseURL}/pre/on`);
    return response.data;
  },
  async addPrestamos(aulas: Prestamos) {
    const response = await axios.post(`${baseURL}/pre/in`, aulas);
    return response.data;
  },

  async updatePrestamos(aulas: Prestamos) {
    const response = await axios.put(`${baseURL}/pre/up/${aulas.id}`, aulas);
    return response.data;
  },
};
