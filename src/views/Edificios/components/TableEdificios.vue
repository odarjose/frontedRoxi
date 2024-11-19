<template>
    <!-- component -->
    <div
        class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5"
    >
        <table
            class="w-full border-collapse bg-white text-left text-sm text-gray-500"
        >
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        NOMBRE
                    </th>

                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        DIRECCION
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-4 font-bold text-gray-900"
                    ></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                <tr
                    v-for="edificio in edificioPaginados"
                    :key="edificio.id"
                    class="hover:bg-gray-50"
                >
                    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">
                                {{ edificio.nombre }}
                            </div>
                        </div>
                    </th>

                    <td class="px-6 py-4">{{ edificio.direccion }}</td>

                    <td class="p-4 border-b border-slate-200">
                        <button
                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            @click="editarEdificio(edificio)"
                        >
                            <span
                                class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    class="w-4 h-4"
                                >
                                    <path
                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
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
import { useEdificioStore } from "../../../store/edificioStore";
import type { Edificios } from "../../../types/InterfaceAulas";

export default {
    emits: ["editar-edificio"],
    setup(props, { emit }) {
        const edificioStore = useEdificioStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const aulasPerPage = ref(5);

        onMounted(async () => {
            await edificioStore.ListarEdificios();
        });

        const filteredaula = computed(() => {
            return edificioStore.edificio.filter((aula) => {
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

        const edificioPaginados = computed(() => {
            const start = (currentPage.value - 1) * aulasPerPage.value;

            const end = start + aulasPerPage.value;

            return filteredaula.value.slice(start, end);
        });

        const editarEdificio = (edificio: Edificios) => {
            // Emitir un evento con los datos del programa a editar
            emit("editar-edificio", edificio);
        };

        return {
            edificioStore,
            searchQuery,
            filteredaula,
            editarEdificio,
            edificioPaginados,
            totalPages,
            currentPage,
            aulasPerPage,
        };
    },
};
</script>
