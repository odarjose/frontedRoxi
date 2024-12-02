<template>
    <div class="chart-container">
        <canvas :id="chartId"></canvas>
    </div>
</template>

<script>
import { onMounted, watch } from "vue";
import Chart from "chart.js/auto";

export default {
    props: {
        chartId: {
            type: String,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        labels: {
            type: Array,
            required: true,
        },
        chartType: {
            type: String,
            default: "line", // Tipo de gráfico por defecto
        },
        label: {
            type: String,
            required: true,
        },
        backgroundColor: {
            type: Array,
            default: () => ["rgba(75, 192, 192, 0.2)"],
        },
        borderColor: {
            type: Array,
            default: () => ["rgba(75, 192, 192, 1)"],
        },
    },
    setup(props) {
        let chart = null;

        const createChart = () => {
            const ctx = document.getElementById(props.chartId).getContext("2d");
            chart = new Chart(ctx, {
                type: props.chartType, // Aquí se define el tipo de gráfico
                data: {
                    labels: props.labels,
                    datasets: [
                        {
                            label: props.label,
                            data: props.data,
                            backgroundColor: props.backgroundColor,
                            borderColor: props.borderColor,
                            borderWidth: 2,
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                },
            });
        };

        const updateChart = () => {
            if (chart) {
                chart.data.labels = props.labels;
                chart.data.datasets[0].data = props.data;
                chart.data.datasets[0].backgroundColor = props.backgroundColor;
                chart.data.datasets[0].borderColor = props.borderColor;
                chart.update();
            }
        };

        onMounted(() => {
            createChart();
        });

        watch(() => props.data, updateChart);

        return {};
    },
};
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 300px;
}
canvas {
    width: 100%;
    height: 100%;
}
</style>
