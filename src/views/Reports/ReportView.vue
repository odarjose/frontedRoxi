<template>
    <div class="flex justify-between w-full space-x-4">
        <div class="w-1/2">
            <ChartComponent
                chartId="chart1"
                chartType="line"
                :data="chartData"
                :labels="labels"
                label="Equipos"
                :backgroundColor="backgroundColors"
                :borderColor="borderColors"
            />
        </div>
        <div class="w-1/2">
            <ChartComponent
                chartId="chart2"
                chartType="bar"
                :data="chartData1"
                :labels="labels1"
                label="Asignaciones"
                :backgroundColor="backgroundColors1"
                :borderColor="borderColors1"
            />
        </div>
    </div>
</template>

<script>
import { useReporteStore } from "../../store/reportEquiposStore";
import { useReporteDocenteStore } from "../../store/reportDocenteStore";
import { onMounted, computed } from "vue";
import ChartComponent from "./components/ReportCharts.vue"; // Asegúrate de importar el componente de la gráfica

export default {
    components: {
        ChartComponent,
    },
    setup() {
        const reporteStore = useReporteStore();
        const asignacionStore = useReporteDocenteStore();

        onMounted(() => {
            reporteStore.ListarReportEquipo();
            asignacionStore.ListarReportDocente();
        });

        const meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        const estados = ["activo", "en_reparacion", "dado_de_baja"];

        const chartData = computed(() => {
            const data = reporteStore.reporte;
            const chartData = estados.map((estado) => {
                return meses.map((mes, index) => {
                    const mesNumero = index + 1;
                    const dato = data.find(
                        (d) => d.mes === mesNumero && d.estado === estado,
                    );
                    return dato ? dato.cantidad : 0;
                });
            });
            return chartData.flat(); // Aplanar el array para que sea compatible con Chart.js
        });

        const chartData1 = computed(() => {
            const data = asignacionStore.reportedocente;
            const chartData1 = {};

            data.forEach((item) => {
                const key = `${item.seccion} - ${item.turno} - ${item.periodo_academico}`;
                chartData1[key] = item.cantidad;
            });

            return Object.values(chartData1);
        });

        const labels = computed(() => {
            return meses;
        });

        const labels1 = computed(() => {
            const data = asignacionStore.reportedocente;
            return data.map(
                (item) =>
                    `${item.seccion} - ${item.turno} - ${item.periodo_academico}`,
            );
        });

        const backgroundColors = computed(() => {
            return estados.map(() => "rgba(75, 192, 192, 0.2)");
        });

        const borderColors = computed(() => {
            return estados.map(() => "rgba(75, 192, 192, 1)");
        });

        const backgroundColors1 = computed(() => {
            return labels1.value.map(() => "rgba(75, 192, 192, 0.2)");
        });

        const borderColors1 = computed(() => {
            return labels1.value.map(() => "rgba(75, 192, 192, 1)");
        });

        return {
            chartData,
            labels,
            backgroundColors,
            borderColors,
            chartData1,
            labels1,
            backgroundColors1,
            borderColors1,
        };
    },
};
</script>
