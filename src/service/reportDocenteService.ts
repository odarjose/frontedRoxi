import axios from "axios";
import type { ReportDocentes } from "../types/InterfaceDocentes";
import { baseURL } from "../utils/ApiConfig";

export default {
  async getReportDocentes() {
    const response = await axios.get<ReportDocentes[]>(`${baseURL}/rd/on`);
    return response.data;
  },
};
