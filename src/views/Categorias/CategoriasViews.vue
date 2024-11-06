<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="AGREGAR CATEGORIAS"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>
    <FormModalCategory
        v-if="showModal"
        :key="modalKey"
        :categoria-editar="categoriaEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />

    <div class="pt-4">
        <TableCategory @editar-categoria="editarCategoria" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TableCategory from "./component/TableCategory.vue";
import Button from "../../components/Button/ButtonComponnet.vue";
import FormModalCategory from "./component/FormModalCategory.vue";

import { useCategoriaStore } from "../../store/categoriaStore";

import type { Categorias } from "../../types/InterfaceEquipos";

export default defineComponent({
    name: "ExamenesView",
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        TableCategory,
        FormModalCategory,
    },
    setup() {
        const categoriaStore = useCategoriaStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const categoriaEditar = ref<Categorias | null>(null);

        const openModal = () => {
            categoriaEditar.value = null;
            showModal.value = true;
            modalKey.value++; // Forzar re-render del modal
        };

        const closeModal = () => {
            showModal.value = false;
            categoriaEditar.value = null;
        };

        const editarCategoria = (examen: Categorias) => {
            categoriaEditar.value = JSON.parse(JSON.stringify(examen));
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (categoria: Categorias) => {
            try {
                if (categoria.id) {
                    await categoriaStore.UpdatCategorias(categoria);
                } else {
                    await categoriaStore.AddCategorias(categoria);
                }
                closeModal();
                await categoriaStore.ListarCategorias();
            } catch (error) {
                console.error("Error al guardar el aula: ", error);
            }
        };

        onMounted(async () => {
            try {
                await categoriaStore.ListarCategorias();
            } catch (error) {
                console.error("Error al cargar las categorias");
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            categoriaEditar,
            openModal,
            editarCategoria,
            onGuardar,
        };
    },
});
</script>
