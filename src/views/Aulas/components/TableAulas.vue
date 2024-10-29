<template>
    <!-- component -->
    <div class="p-6 overflow-scroll px-8">
        <table class="mt-2 w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    <th
                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                        <p
                            class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                            NOMBRE
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                class="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                ></path>
                            </svg>
                        </p>
                    </th>
                    <th
                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                        <p
                            class="antialiased font-sans text-sm text-white flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                            EDIFICIO
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                class="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                ></path>
                            </svg>
                        </p>
                    </th>

                    <th
                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                        <p
                            class="antialiased font-sans text-sm text-white flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                            ESTADO
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                class="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                ></path>
                            </svg>
                        </p>
                    </th>
                    <th
                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                        <p
                            class="antialiased font-sans text-sm text-white flex items-center justify-between gap-2 font-bold leading-none opacity-70"
                        >
                            PISO
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                class="h-4 w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                ></path>
                            </svg>
                        </p>
                    </th>
                    <th
                        class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                        <p
                            class="antialiased font-bold text-sm text-white flex items-center justify-between gap-2 leading-none opacity-70"
                        >
                            ACCIONES
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="aula in aulasPaginados"
                    :key="aula.id"
                    :data-id-edificio="aula.edificio_id"
                >
                    <td class="p-4 border-b border-blue-gray-50">
                        <div class="flex items-center gap-3">
                            <div class="flex flex-col">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                    {{ aula.nombre }}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                        <div class="flex items-center gap-3">
                            <!--<img
                                src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                alt="John Michael"
                                class="inline-block relative object-cover object-center !rounded-full w-9 h-9"
                            />-->
                            <div class="flex flex-col">
                                <p
                                    class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                                >
                                    {{ aula.edificio }}
                                </p>
                            </div>
                        </div>
                    </td>

                    <td class="p-4 border-b border-blue-gray-50">
                        <div class="w-max">
                            <div
                                class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-yellow-300 text-green-600 py-1 px-2 text-xs rounded-md"
                                style="opacity: 1"
                            >
                                <span class="">{{ aula.tipo }}</span>
                            </div>
                        </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                        <p
                            class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                        >
                            {{ aula.piso }}
                        </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                        <button
                            class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                            type="button"
                            @click="editarAula(aula)"
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
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAulaStore } from "../../../store/aulaStore";
import type { Aulas } from "../../../types/InterfaceAulas";

export default {
    emits: ["editar-aula"],
    setup(props, { emit }) {
        const aulaStore = useAulaStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const aulasPerPage = ref(5);

        onMounted(async () => {
            await aulaStore.ListarAulas();
        });

        const filteredaula = computed(() => {
            return aulaStore.aula.filter((aula) => {
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

        const aulasPaginados = computed(() => {
            const start = (currentPage.value - 1) * aulasPerPage.value;

            const end = start + aulasPerPage.value;

            return filteredaula.value.slice(start, end);
        });

        const editarAula = (aula: Aulas) => {
            // Emitir un evento con los datos del programa a editar
            emit("editar-aula", aula);
        };

        return {
            aulaStore,
            searchQuery,
            filteredaula,
            editarAula,
            aulasPaginados,
            totalPages,
            currentPage,
            aulasPerPage,
        };
    },
};
</script>
