<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="AGREGAR DOCENTES"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>
    <FormModalDocente
        v-if="showModal"
        :key="modalKey"
        :docente-editar="docenteEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />
    <TableDocente @editar-docente="editarDocente" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TableDocente from "./components/TableDocente.vue";
import Button from "../../components/Button/ButtonComponnet.vue";

import FormModalDocente from "./components/FormModalDocente.vue";

import { useDocenteStore } from "../../store/docenteStore";
import type { Docentes } from "../../types/InterfaceDocentes";

export default defineComponent({
    name: "DocentesViews",
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        TableDocente,
        FormModalDocente,
    },

    setup() {
        const docentesStore = useDocenteStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const docenteEditar = ref<Docentes | null>(null);

        const openModal = () => {
            docenteEditar.value = null;
            showModal.value = true;
            modalKey.value++; // Forzar re-render del modal
        };
        const closeModal = () => {
            showModal.value = false;
            docenteEditar.value = null;
        };

        const editarDocente = (examen: Docentes) => {
            docenteEditar.value = JSON.parse(JSON.stringify(examen));
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (docente: Docentes) => {
            try {
                if (docente.id) {
                    await docentesStore.UpdateDocentes(docente);
                } else {
                    await docentesStore.AddDocentes(docente);
                }
                closeModal();
                await docentesStore.ListarDocentes();
            } catch (error) {
                console.error("Error al guardar el aula: ", error);
            }
        };
        onMounted(async () => {
            try {
                await docentesStore.ListarDocentes();
            } catch (error) {
                console.error("Error al cargar los docentes");
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            docenteEditar,
            openModal,
            editarDocente,
            onGuardar,
        };
    },
});
</script>
