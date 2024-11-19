import axios from "axios";
import type { Secciones } from "../types/InterfaceAulas";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getSecciones() {
    try {
      const response = await axios.get<Secciones[]>(`${baseURL}/sc/on`);
      return Array.isArray(response.data) ? response.data : []; // Asegura que sea un arreglo
    } catch (error) {
      console.error("Error al obtener las secciones:", error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  },

  async addSecciones(seccion: Secciones) {
    try {
      const response = await axios.post(`${baseURL}/sc/in`, seccion);
      return response.data;
    } catch (error) {
      console.error("Error al agregar la sección:", error);
      throw error; // Lanza el error para manejo en el nivel superior si es necesario
    }
  },

  async updateSecciones(seccion: Secciones) {
    try {
      const response = await axios.put(
        `${baseURL}/sc/up/${seccion.id}`,
        seccion,
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la sección:", error);
      throw error; // Lanza el error para manejo en el nivel superior si es necesario
    }
  },
};
