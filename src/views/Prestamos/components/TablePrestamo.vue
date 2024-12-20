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
                        EQUIPO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        DOCENTE
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        FECHA DE RETIRO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        FECHA DE DEVOLUCION
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        ESTADO DE RETIRO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        ESTADO DE DEVOLUCION
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-4 font-bold text-gray-900"
                    ></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                <tr
                    v-for="prestamo in prestamosPaginados"
                    :key="prestamo.id"
                    :data-id-docente="prestamo.docente_id"
                    :data-id-equipo="prestamo.equipo_id"
                    class="hover:bg-gray-50"
                >
                    <td class="px-6 py-4">{{ prestamo.equipo }}</td>
                    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">
                                {{ prestamo.nombre }}
                            </div>
                            <div class="text-gray-400">
                                {{ prestamo.apellido }}
                            </div>
                        </div>
                    </th>
                    <td class="px-6 py-4">{{ prestamo.fecha_retiro }}</td>
                    <td class="px-6 py-4">{{ prestamo.fecha_devolucion }}</td>
                    <td class="px-6 py-4">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                        >
                            <span
                                class="h-1.5 w-1.5 rounded-full bg-green-600"
                            ></span>
                            {{ prestamo.estado_retiro }}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                        >
                            <span
                                class="h-1.5 w-1.5 rounded-full bg-green-600"
                            ></span>
                            {{ prestamo.estado_devolucion }}
                        </span>
                    </td>

                    <td class="px-6 py-4">
                        <div class="flex justify-end gap-4">
                            <button
                                x-data="{ tooltip: 'Edite' }"
                                @click="editarPrestamo(prestamo)"
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
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { usePrestamoStore } from "../../../store/prestamosStore";
import type { ListPrestamos } from "../../../types/InterfaceEquipos";

export default {
    emits: ["editar-prestamo"],
    setup(props, { emit }) {
        const prestamoStore = usePrestamoStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const aulasPerPage = ref(5);

        onMounted(async () => {
            await prestamoStore.ListarPrestamos();
        });

        const filteredaula = computed(() => {
            return prestamoStore.prestamo.filter((aula) => {
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

        const prestamosPaginados = computed(() => {
            const start = (currentPage.value - 1) * aulasPerPage.value;

            const end = start + aulasPerPage.value;

            return filteredaula.value.slice(start, end);
        });

        const editarPrestamo = (prestamo: ListPrestamos) => {
            // Emitir un evento con los datos del programa a editar
            emit("editar-prestamo", prestamo);
        };

        return {
            prestamoStore,
            searchQuery,
            filteredaula,
            editarPrestamo,
            prestamosPaginados,
            totalPages,
            currentPage,
            aulasPerPage,
        };
    },
};
</script>
