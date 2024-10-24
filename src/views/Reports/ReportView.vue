<template>
    <div class="grid-container">
        <!-- Gráfico de líneas -->
        <ChartComponent
            chartId="chart1"
            chartType="line"
            :data="[10, 20, 30, 40, 50, 60]"
            :labels="['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']"
            label="Líneas Dataset"
        />

        <!-- Gráfico de barras -->
        <ChartComponent
            chartId="chart2"
            chartType="bar"
            :data="[5, 15, 25, 35, 45, 55]"
            :labels="['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']"
            label="Barras Dataset"
            :backgroundColor="['rgba(54, 162, 235, 0.2)']"
            :borderColor="['rgba(54, 162, 235, 1)']"
        />

        <!-- Gráfico de torta -->
        <ChartComponent
            chartId="chart3"
            chartType="pie"
            :data="[30, 70]"
            :labels="['Aprobado', 'Desaprobado']"
            label="Torta Dataset"
            :backgroundColor="[
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ]"
            :borderColor="['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)']"
        />

        <!-- Gráfico de radar -->
        <ChartComponent
            chartId="chart4"
            chartType="line"
            :data="[65, 59, 90, 81, 56, 55, 40]"
            :labels="[
                'Velocidad',
                'Fuerza',
                'Aguante',
                'Agilidad',
                'Inteligencia',
                'Reflejos',
            ]"
            label="Radar Dataset"
            :backgroundColor="['rgba(255, 159, 64, 0.2)']"
            :borderColor="['rgba(255, 159, 64, 1)']"
        />
    </div>
</template>

<script>
import ChartComponent from "./components/ReportCharts.vue";

export default {
    components: {
        ChartComponent,
    },
};
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Dos columnas */
    gap: 20px; /* Espacio entre gráficos */
    padding: 20px;
}
</style>
