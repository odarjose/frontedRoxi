<template>
    <!-- component -->

    <div class="flex flex-col">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
                class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
            >
                <div
                    class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
                >
                    <table
                        class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    >
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th
                                    scope="col"
                                    class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    <div class="flex items-center gap-x-3">
                                        <button
                                            class="flex items-center gap-x-2"
                                        >
                                            <span>NUMERO</span>
                                        </button>
                                    </div>
                                </th>

                                <th
                                    scope="col"
                                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    FECHA
                                </th>

                                <th
                                    scope="col"
                                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    ESTADO
                                </th>

                                <th
                                    scope="col"
                                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    DOCENTE
                                </th>

                                <th
                                    scope="col"
                                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                    MOTIVO
                                </th>

                                <th scope="col" class="relative py-3.5 px-4">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                        >
                            <tr
                                v-for="reserva in reservasPaginados"
                                :key="reserva.id"
                                :data-aula-id="reserva.aula_id"
                                :data-docente-reserva="reserva.docente_id"
                            >
                                <td
                                    class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
                                >
                                    <div
                                        class="inline-flex items-center gap-x-3"
                                    >
                                        <span>{{ reserva.id }}</span>
                                    </div>
                                </td>
                                <td
                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                                >
                                    {{ reserva.fecha }}
                                </td>
                                <td
                                    class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                                >
                                    <div
                                        class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800"
                                    >
                                        <h2 class="text-sm font-normal">
                                            {{ reserva.estado }}
                                        </h2>
                                    </div>
                                </td>
                                <td
                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                                >
                                    <div class="flex items-center gap-x-2">
                                        <div>
                                            <h2
                                                class="text-sm font-medium text-gray-800 dark:text-white"
                                            >
                                                {{ reserva.nombre }}
                                            </h2>
                                            <p
                                                class="text-xs font-normal text-gray-600 dark:text-gray-400"
                                            >
                                                {{ reserva.apellidos }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td
                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                                >
                                    {{ reserva.motivo }}
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                    <div class="flex items-center gap-x-6">
                                        <button
                                            class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                                            @click="editarReserva(reserva)"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4">
        <button
            @click="currentPage--"
            :disabled="currentPage <= 1"
            class="flex items-center px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
            <span>Anterior</span>
        </button>
        <span class="mx-2">{{ currentPage }} de {{ totalPages }}</span>
        <button
            @click="currentPage++"
            :disabled="currentPage >= totalPages"
            class="flex items-center px-4 py-2 mr-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
            <span>Siguiente</span>
        </button>
    </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useReservasStore } from "../../../store/reservasStore";
import type { ListReservas } from "../../../types/InterfaceDocentes";

export default {
    emits: ["editar-reserva"],
    setup(props, { emit }) {
        const reservaStore = useReservasStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const aulasPerPage = ref(5);

        onMounted(async () => {
            await reservaStore.ListarReservas();
        });

        const filteredaula = computed(() => {
            return reservaStore.reservas.filter((aula) => {
                // Convertir el contenido de búsqueda a minúsculas para hacer la búsqueda insensible a mayúsculas y minúsculas
                const query = searchQuery.value.toLowerCase();

                // Verificar si alguna propiedad del cliente incluye la consulta
                return Object.values(aula).some((value) => {
                    if (typeof value === "string") {
                        return value.toLowerCase().includes(query);
                    }
                    return false;
                });
            });
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredaula.value.length / aulasPerPage.value);
        });

        const reservasPaginados = computed(() => {
            const start = (currentPage.value - 1) * aulasPerPage.value;

            const end = start + aulasPerPage.value;

            return filteredaula.value.slice(start, end);
        });

        const editarReserva = (reserva: ListReservas) => {
            // Emitir un evento con los datos del programa a editar
            emit("editar-reserva", reserva);
        };

        return {
            reservaStore,
            searchQuery,
            filteredaula,
            editarReserva,
            reservasPaginados,
            totalPages,
            currentPage,
            aulasPerPage,
        };
    },
};
</script>
