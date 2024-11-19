import axios from "axios";
import type {
  AsignacionDocentes,
  ListAsignacionDocentes,
} from "../types/InterfaceDocentes";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getAsignacionDocentes() {
    const response = await axios.get<ListAsignacionDocentes[]>(
      `${baseURL}/ad/on`,
    );
    return response.data;
  },
  async addAsignacionDocentes(asignacion: AsignacionDocentes) {
    const response = await axios.post(`${baseURL}/ad/in`, asignacion);
    return response.data;
  },

  async updateAsignacionDocentes(asignacion: AsignacionDocentes) {
    const response = await axios.put(
      `${baseURL}/ad/up/${asignacion.id}`,
      asignacion,
    );
    return response.data;
  },
};
