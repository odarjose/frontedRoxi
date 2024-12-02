import { defineStore } from "pinia";
import { ref } from "vue";

import type { ReportDocentes } from "../types/InterfaceDocentes";
import reportDocenteService from "../service/reportDocenteService";

/* store */
export const useReporteDocenteStore = defineStore("reportedocente", () => {
  const reportedocente = ref<ReportDocentes[]>([]);

  // listar examenes
  const ListarReportDocente = async () => {
    reportedocente.value = await reportDocenteService.getReportDocentes();
  };

  return {
    reportedocente,
    ListarReportDocente,
  };
});
