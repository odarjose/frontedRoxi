import axios from "axios";
import type { Reservas, ListReservas } from "../types/InterfaceDocentes";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getReservas() {
    const response = await axios.get<ListReservas[]>(`${baseURL}/rea/on`);
    return response.data;
  },
  async addReservas(aulas: Reservas) {
    const response = await axios.post(`${baseURL}/rea/in`, aulas);
    return response.data;
  },

  async updateReservas(aulas: Reservas) {
    const response = await axios.put(`${baseURL}/rea/up/${aulas.id}`, aulas);
    return response.data;
  },
};
