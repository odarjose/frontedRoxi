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
                        MARCA
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        MODELO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        AÑO DE ADQUISICION
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        CATEGORIA
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        DOCENTE ASIGNADO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        EDITAR
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                <tr
                    v-for="equipo in equiposPaginados"
                    :key="equipo.id"
                    :data-id-categoria="equipo.categoria_id"
                    :data-id-docente="equipo.asignado_a"
                    class="hover:bg-gray-50"
                >
                    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">
                                {{ equipo.nombre }}
                            </div>
                        </div>
                    </th>

                    <td class="px-6 py-4">{{ equipo.marca }}</td>
                    <td class="px-6 py-4">
                        <div class="flex gap-2">
                            <span
                                class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                            >
                                {{ equipo.modelo }}
                            </span>
                        </div>
                    </td>
                    <td class="px-6 py-4">{{ equipo.anio_adquisicion }}</td>
                    <td class="px-6 py-4">{{ equipo.categoria }}</td>
                    <td class="px-6 py-4">{{ equipo.docente }}</td>
                    <td class="px-6 py-4">
                        <div class="flex text-justify gap-4">
                            <button
                                class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                                type="button"
                                @click="editarEquipos(equipo)"
                            >
                                <span
                                    class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        class="h-4 w-4"
                                    >
                                        <path
                                            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                                        ></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useEquipoStore } from "../../../store/equiposStore";
import type { ListEquipos, Equipos } from "../../../types/InterfaceEquipos";

export default {
    emits: ["editar-equipos"],
    setup(props, { emit }) {
        const equipoStore = useEquipoStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const aulasPerPage = ref(5);

        onMounted(async () => {
            await equipoStore.ListarEquipos();
        });

        const filtereequipo = computed(() => {
            return equipoStore.equipo.filter((equipo) => {
                // Convertir el contenido de búsqueda a minúsculas para hacer la búsqueda insensible a mayúsculas y minúsculas
                const query = searchQuery.value.toLowerCase();

                // Verificar si alguna propiedad del cliente incluye la consulta
                return Object.values(equipo).some((value) => {
                    if (typeof value === "string") {
                        return value.toLowerCase().includes(query);
                    }
                    return false;
                });
            });
        });

        const totalPages = computed(() => {
            return Math.ceil(filtereequipo.value.length / aulasPerPage.value);
        });

        const equiposPaginados = computed(() => {
            const start = (currentPage.value - 1) * aulasPerPage.value;

            const end = start + aulasPerPage.value;

            return filtereequipo.value.slice(start, end);
        });

        const editarEquipos = (equipos: Equipos) => {
            // Emitir un evento con los datos del programa a editar|

            emit("editar-equipos", equipos);
        };

        return {
            equipoStore,
            searchQuery,
            filtereequipo,
            editarEquipos,
            equiposPaginados,
            totalPages,
            currentPage,
            aulasPerPage,
        };
    },
};
</script>
