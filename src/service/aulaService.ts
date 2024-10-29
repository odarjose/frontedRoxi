import axios from "axios";
import type { Aulas } from "../types/InterfaceAulas";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getAulas() {
    const response = await axios.get<Aulas[]>(`${baseURL}/au/on`);
    return response.data;
  },
  async addAulas(aulas: Aulas) {
    const response = await axios.post(`${baseURL}/au/in`, aulas);
    return response.data;
  },

  async updateAulas(aulas: Aulas) {
    const response = await axios.put(`${baseURL}/au/up/${aulas.id}`, aulas);
    return response.data;
  },
};
