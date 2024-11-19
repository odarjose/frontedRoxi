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
import Categorias from "@/views/Categorias/CategoriasViews.vue";
import Recursos from "../views/Recursos/RecursosView.vue";
import Secciones from "../views/Secciones/SeccionesViews.vue";
import Edificios from "../views/Edificios/EdificiosView.vue";
import Mantenimiento from "../views/Mantenimiento/MantenimientoView.vue";

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
          path: "/mantenimiento",
          name: "mantenimiento",
          component: Mantenimiento,
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
        {
          path: "/categorias",
          name: "categorias",
          component: Categorias,
        },
        {
          path: "/recursos",
          name: "recursos",
          component: Recursos,
        },
        {
          path: "/secciones",
          name: "secciones",
          component: Secciones,
        },
        {
          path: "/edificios",
          name: "edificios",
          component: Edificios,
        },
      ],
    },
  ],
});
export default router;
