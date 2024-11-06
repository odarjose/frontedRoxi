import axios from "axios";
import type { Equipos, ListEquipos } from "../types/InterfaceEquipos";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getEquipos() {
    const response = await axios.get<ListEquipos[]>(`${baseURL}/eq/on`);
    return response.data;
  },
  async addEquipos(equipos: Equipos) {
    const response = await axios.post(`${baseURL}/eq/in`, equipos);
    return response.data;
  },

  async updateEquipos(equipos: Equipos) {
    const response = await axios.put(`${baseURL}/eq/up/${equipos.id}`, equipos);
    return response.data;
  },
};
