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
                        FECHA DE MANTENIMIENTO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        NOMBRE DEL TECNICO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        TELEFONO DEL TECNICO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        TIPO DE MANTENIMIENTO
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        DETALLES
                    </th>
                    <th scope="col" class="px-6 py-4 font-bold text-gray-900">
                        COSTO (S/.)
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-4 font-bold text-gray-900"
                    ></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                <tr
                    v-for="mantenimiento in mantenimientoPaginados"
                    :key="mantenimiento.id"
                    :data-id-equipo="mantenimiento.equipo_id"
                    class="hover:bg-gray-50"
                >
                    <td class="px-6 py-4">{{ mantenimiento.equipo }}</td>
                    <th class="px-6 py-4">
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">
                                {{ mantenimiento.fecha_mantenimiento }}
                            </div>
                        </div>
                    </th>
                    <td class="px-6 py-4">
                        {{ mantenimiento.nombre_tecnico }}
                    </td>
                    <td class="px-6 py-4">
                        {{ mantenimiento.telefono_tecnico }}
                    </td>
                    <td class="px-6 py-4">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                        >
                            <span
                                class="h-1.5 w-1.5 rounded-full bg-green-600"
                            ></span>
                            {{ mantenimiento.tipo_mantenimiento }}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                        >
                            <span
                                class="h-1.5 w-1.5 rounded-full bg-green-600"
                            ></span>
                            {{ mantenimiento.detalles }}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        {{ mantenimiento.costo }}
                    </td>

                    <td class="px-6 py-4">
                        <div class="flex justify-end gap-4">
                            <button
                                x-data="{ tooltip: 'Edite' }"
                                @click="editarMantenimiento(mantenimiento)"
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
import { useMantenimientoEquipoStore } from "../../../store/mantenimientoStore";
import type { ListMatemientoEquipos } from "../../../types/InterfaceEquipos";

export default {
    emits: ["editar-mantenimiento"],
    setup(props, { emit }) {
        const mantenimientoStore = useMantenimientoEquipoStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const aulasPerPage = ref(5);

        onMounted(async () => {
            await mantenimientoStore.ListarMatemientoEquipos();
        });

        const filteredaula = computed(() => {
            return mantenimientoStore.mantenimiento.filter((aula) => {
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

        const mantenimientoPaginados = computed(() => {
            const start = (currentPage.value - 1) * aulasPerPage.value;

            const end = start + aulasPerPage.value;

            return filteredaula.value.slice(start, end);
        });

        const editarMantenimiento = (mantenimiento: ListMatemientoEquipos) => {
            // Emitir un evento con los datos del programa a editar
            emit("editar-mantenimiento", mantenimiento);
        };

        return {
            mantenimientoStore,
            searchQuery,
            filteredaula,
            editarMantenimiento,
            mantenimientoPaginados,
            totalPages,
            currentPage,
            aulasPerPage,
        };
    },
};
</script>
