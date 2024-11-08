<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="AGREGAR RECURSOS"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>

    <FormModalRecursos
        v-if="showModal"
        :key="modalKey"
        :recurso-editar="recursoEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />

    <div class="pt-4">
        <TableRecursos @editar-recursos="editarRecurso" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TableRecursos from "./components/TableRecursos.vue";
import Button from "../../components/Button/ButtonComponnet.vue";
import FormModalRecursos from "./components/FormModalRecursos.vue";
import { useRecursosStore } from "../../store/recursosStore";
import type { Recursos } from "../../types/InterfaceAulas";

export default defineComponent({
    name: "ReportesView",
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        TableRecursos,
        FormModalRecursos,
    },
    setup() {
        const recursosStore = useRecursosStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const recursoEditar = ref<Recursos | null>(null);

        const openModal = () => {
            recursoEditar.value = null;
            showModal.value = true;
            modalKey.value++; // Forzar re-render del modal
        };
        const closeModal = () => {
            showModal.value = false;
            recursoEditar.value = null;
        };
        const editarRecurso = (recurso: Recursos) => {
            recursoEditar.value = JSON.parse(JSON.stringify(recurso));
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (recurso: Recursos) => {
            try {
                if (recurso.id) {
                    await recursosStore.UpdatRecursos(recurso);
                } else {
                    await recursosStore.AddRecursos(recurso);
                }
                closeModal();
                await recursosStore.ListarRecursos();
            } catch (error) {
                console.error("Error al guardar el recurso: ", error);
            }
        };
        onMounted(async () => {
            try {
                await recursosStore.ListarRecursos();
            } catch (error) {
                console.error("Error al cargar los recursos");
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            recursoEditar,
            openModal,
            editarRecurso,
            onGuardar,
        };
    },
});
</script>
