<template>
    <!-- component -->
    <div class="bg-white p-8 rounded-md w-full">
        <div class="flex items-center justify-between pb-6">
            <div>
                <h2 class="text-gray-600 font-semibold">Secciones</h2>
                <span class="text-xs">Todas las secciones</span>
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
                                    AULA
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    SECCION
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    GRADO
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    PERIODO_ACADEMICO
                                </th>

                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    EDITAR
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="seccion in SeccionesPaginados"
                                :key="seccion.id"
                                :data-id-aula="seccion.aula_id"
                            >
                                <td
                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                    <div class="flex items-center">
                                        <div class="ml-3">
                                            <p
                                                class="text-gray-900 whitespace-no-wrap"
                                            >
                                                {{ seccion.aula }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td
                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ seccion.seccion }}
                                    </p>
                                </td>
                                <td
                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ seccion.grado }}
                                    </p>
                                </td>
                                <td
                                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                >
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ seccion.periodo_academico }}
                                    </p>
                                </td>

                                <td class="p-4 border-b border-slate-200">
                                    <button
                                        class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                        @click="editarSeccion(seccion)"
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
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAulaStore } from "../../../store/aulaStore";
import { useSeccionesStore } from "../../../store/seccionStore";
import type { Secciones } from "../../../types/InterfaceAulas";

export default {
    emits: ["editar-secciones"],
    setup(props, { emit }) {
        const aulaStore = useAulaStore();
        const seccionStore = useSeccionesStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const aulasPerPage = ref(5);

        onMounted(async () => {
            await aulaStore.ListarAulas();
        });

        const filteredseccion = computed(() => {
            // Verificamos si `seccionStore.seccion` es un arreglo
            if (!Array.isArray(seccionStore.seccion)) {
                return []; // Retorna un arreglo vacío si no es un arreglo
            }
            // Filtra las secciones en función de la búsqueda
            return seccionStore.seccion.filter((aula) => {
                const query = searchQuery.value.toLowerCase(); // Convertimos la consulta de búsqueda a minúsculas
                // Busca coincidencias en cada valor de `aula`
                return Object.values(aula).some((value) => {
                    // Verifica que el valor sea una cadena antes de llamar a `toLowerCase`
                    if (typeof value === "string") {
                        return value.toLowerCase().includes(query);
                    }
                    return false;
                });
            });
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredseccion.value.length / aulasPerPage.value);
        });

        const SeccionesPaginados = computed(() => {
            const start = (currentPage.value - 1) * aulasPerPage.value;

            const end = start + aulasPerPage.value;

            return filteredseccion.value.slice(start, end);
        });

        const editarSeccion = (seccion: Secciones) => {
            // Emitir un evento con los datos del programa a editar
            emit("editar-secciones", seccion);
        };

        return {
            aulaStore,
            searchQuery,
            filteredseccion,
            editarSeccion,
            SeccionesPaginados,
            totalPages,
            currentPage,
            aulasPerPage,
        };
    },
};
</script>
