<template>
    <div class="bg-white p-8 rounded-md w-full">
        <div class="flex items-center justify-between pb-6">
            <div>
                <h2 class="text-gray-600 font-semibold">RECURSOS</h2>
                <span class="text-xs">Todas los recursos</span>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex bg-gray-50 items-center p-2 rounded-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <input
                        class="bg-gray-50 outline-none ml-1 block"
                        type="text"
                        name=""
                        id=""
                        placeholder="search..."
                    />
                </div>
            </div>
        </div>
        <div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div
                    class="inline-block min-w-full shadow rounded-lg overflow-hidden"
                >
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    NOMBRE DEL AULA
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    RECURSO
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    CANTIDAD
                                </th>
                                <th
                                    scope="col"
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    EDITAR
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="recursos in recursosPaginados"
                                :key="recursos.id"
                                :data-id-aula="recursos.aula_id"
                            >
                                <td
                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                    <div class="flex items-center">
                                        <div class="ml-3">
                                            <p
                                                class="text-gray-900 whitespace-no-wrap"
                                            >
                                                {{ recursos.aula }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td
                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ recursos.recurso }}
                                    </p>
                                </td>

                                <td
                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ recursos.cantidad }}
                                    </p>
                                </td>
                                <td class="px-4 py-4">
                                    <div class="flex justify-center gap-4">
                                        <button
                                            x-data="{ tooltip: 'Edite' }"
                                            @click="editarRecursos(recursos)"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="h-6 w-6"
                                                x-tooltip="tooltip"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                />
                                            </svg>
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
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";

import { useRecursosStore } from "../../../store/recursosStore";

import type { ListRecursos } from "../../../types/InterfaceAulas";

export default {
    emits: ["editar-recursos"],
    setup(props, { emit }) {
        const recursoStore = useRecursosStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const recursosPerPage = ref(5);

        onMounted(async () => {
            await recursoStore.ListarRecursos();
        });

        const filteredrecursos = computed(() => {
            return recursoStore.recursos.filter((aula) => {
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
            return Math.ceil(
                filteredrecursos.value.length / recursosPerPage.value,
            );
        });

        const recursosPaginados = computed(() => {
            const start = (currentPage.value - 1) * recursosPerPage.value;

            const end = start + recursosPerPage.value;

            return filteredrecursos.value.slice(start, end);
        });

        const editarRecursos = (aula: ListRecursos) => {
            // Emitir un evento con los datos del programa a editar
            emit("editar-recursos", aula);
        };
        return {
            recursoStore,
            searchQuery,
            filteredrecursos,
            editarRecursos,
            recursosPaginados,
            totalPages,
            currentPage,
            recursosPerPage,
        };
    },
};
</script>
