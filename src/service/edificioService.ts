import axios from "axios";
import type { Edificios } from "../types/InterfaceAulas";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getEdificios() {
    const response = await axios.get<Edificios[]>(`${baseURL}/ed/on`);
    return response.data;
  },
  async addEdificios(aulas: Edificios) {
    const response = await axios.post(`${baseURL}/ed/in`, aulas);
    return response.data;
  },

  async updateEdificios(aulas: Edificios) {
    const response = await axios.put(`${baseURL}/ed/up/${aulas.id}`, aulas);
    return response.data;
  },
};
