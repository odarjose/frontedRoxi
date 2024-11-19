import axios from "axios";
import type { Usuario } from "../types/InterfaceUsuarios";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getUsuario() {
    const response = await axios.get<Usuario[]>(`${baseURL}/us/on`);
    return response.data;
  },
  async addUsuario(usuario: Usuario) {
    const response = await axios.post(`${baseURL}/us/in`, usuario);
    return response.data;
  },

  async updateUsuario(usuario: Usuario) {
    const response = await axios.put(`${baseURL}/us/up/${usuario.id}`, usuario);
    return response.data;
  },
};
