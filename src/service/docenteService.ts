import axios from "axios";
import type { Docentes, ListDocente } from "../types/InterfaceDocentes";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getDocentes() {
    const response = await axios.get<ListDocente[]>(`${baseURL}/do/on`);
    return response.data;
  },
  async addDocentes(docentes: Docentes) {
    const response = await axios.post(`${baseURL}/do/in`, docentes);
    return response.data;
  },

  async updateDocentes(docentes: Docentes) {
    const response = await axios.put(
      `${baseURL}/do/up/${docentes.id}`,
      docentes,
    );
    return response.data;
  },
};
