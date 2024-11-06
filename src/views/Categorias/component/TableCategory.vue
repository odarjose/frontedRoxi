<template>
    <!-- component -->
    <div class="max-w-[1420px] mx-auto">
        <div
            class="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border"
        >
            <div
                class="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold text-slate-800">
                            Lista de Categorias
                        </h3>
                    </div>
                </div>
            </div>
            <div class="p-0 overflow-scroll">
                <table class="w-full mt-4 text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th
                                class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
                            >
                                <p
                                    class="flex items-center justify-between gap-2 font-sans text-sm font-bold leading-none text-slate-500"
                                >
                                    NOMBRE
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        class="w-4 h-4"
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
                                class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
                            >
                                <p
                                    class="flex items-center justify-between gap-2 font-sans text-sm font-bold-none text-slate-500"
                                >
                                    DESCRIPCION
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        class="w-4 h-4"
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
                                class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"
                            >
                                <p
                                    class="flex items-center justify-between gap-2 font-sans text-sm font-bold leading-none text-slate-500"
                                >
                                    EDITAR
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="categoria in catagoriasPaginados"
                            :key="categoria.id"
                        >
                            <td class="p-4 border-b border-slate-200">
                                <div class="flex items-center gap-3">
                                    <div class="flex flex-col">
                                        <p
                                            class="text-sm font-semibold text-slate-700"
                                        >
                                            {{ categoria.nombre }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <div class="flex flex-col">
                                    <p
                                        class="text-sm font-semibold text-slate-700"
                                    >
                                        {{ categoria.descripcion }}
                                    </p>
                                </div>
                            </td>

                            <td class="p-4 border-b border-slate-200">
                                <button
                                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    @click="editarCategoria(categoria)"
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
            <div class="flex items-center justify-between p-3">
                <p class="block text-sm text-slate-500">Page 1 of 10</p>
                <div class="flex gap-1">
                    <button
                        class="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Previous
                    </button>
                    <button
                        class="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCategoriaStore } from "../../../store/categoriaStore";
import type { Categorias } from "../../../types/InterfaceEquipos";

export default {
    emits: ["editar-categoria"],
    setup(props, { emit }) {
        const categoriaStore = useCategoriaStore();
        const searchQuery = ref("");
        const currentPage = ref(1);
        const aulasPerPage = ref(5);

        onMounted(async () => {
            await categoriaStore.ListarCategorias();
        });

        const filteredaula = computed(() => {
            return categoriaStore.categoria.filter((aula) => {
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

        const catagoriasPaginados = computed(() => {
            const start = (currentPage.value - 1) * aulasPerPage.value;

            const end = start + aulasPerPage.value;

            return filteredaula.value.slice(start, end);
        });

        const editarCategoria = (aula: Categorias) => {
            // Emitir un evento con los datos del programa a editar
            emit("editar-categoria", aula);
        };

        return {
            categoriaStore,
            searchQuery,
            filteredaula,
            editarCategoria,
            catagoriasPaginados,
            totalPages,
            currentPage,
            aulasPerPage,
        };
    },
};
</script>
