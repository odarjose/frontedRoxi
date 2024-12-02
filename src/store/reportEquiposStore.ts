import { defineStore } from "pinia";
import { ref } from "vue";

import type { ReportesEquipos } from "../types/InterfaceEquipos";
import reportEquipoService from "../service/reportEquipoService";

/* store */
export const useReporteStore = defineStore("reporte", () => {
  const reporte = ref<ReportesEquipos[]>([]);

  // listar examenes
  const ListarReportEquipo = async () => {
    reporte.value = await reportEquipoService.getReportEquipos();
  };

  return {
    reporte,
    ListarReportEquipo,
  };
});
