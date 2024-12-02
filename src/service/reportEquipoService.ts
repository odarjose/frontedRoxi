import axios from "axios";
import type { ReportesEquipos } from "../types/InterfaceEquipos";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getReportEquipos() {
    const response = await axios.get<ReportesEquipos[]>(`${baseURL}/re/on`);
    return response.data;
  },
};
