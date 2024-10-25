import { createRouter, createWebHistory } from "vue-router";

import Layout from "@/views/Layout/LayoutView.vue";
import Report from "@/views/Reports/ReportView.vue";
import Docentes from "@/views/Docentes/DocentesView.vue";
import Equipos from "@/views/Equipos/EquiposView.vue";
import Aulas from "@/views/Aulas/AulasView.vue";
import Reservas from "@/views/Reservas/ReservaView.vue";
import Asignaciones from "@/views/Asignaciones/AsignacionesView.vue";
import Prestamos from "@/views/Prestamos/PrestamosView.vue";
import Usuarios from "@/views/Usuarios/UsuariosView.vue";

/* inicio del manejador de rutas */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          name: "report",
          component: Report,
        },
        {
          path: "/docentes",
          name: "docentes",
          component: Docentes,
        },
        {
          path: "/equipos",
          name: "equipos",
          component: Equipos,
        },
        {
          path: "/aulas",
          name: "aulas",
          component: Aulas,
        },
        {
          path: "/reservas",
          name: "reservas",
          component: Reservas,
        },
        {
          path: "/asignaciones",
          name: "asignaciones",
          component: Asignaciones,
        },
        {
          path: "/prestamos",
          name: "prestamos",
          component: Prestamos,
        },
        {
          path: "/usuarios",
          name: "usuarios",
          component: Usuarios,
        },
      ],
    },
  ],
});
export default router;
