import axios from "axios";
import type {
  MantenimientoEquipos,
  ListMatemientoEquipos,
} from "../types/InterfaceEquipos";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getMatemientoEquipos() {
    const response = await axios.get<ListMatemientoEquipos[]>(
      `${baseURL}/me/on`,
    );
    return response.data;
  },
  async addMatemientoEquipos(equipos: MantenimientoEquipos) {
    const response = await axios.post(`${baseURL}/me/in`, equipos);
    return response.data;
  },

  async updateMatemientoEquipos(equipos: MantenimientoEquipos) {
    const response = await axios.put(`${baseURL}/me/up/${equipos.id}`, equipos);
    return response.data;
  },
};
