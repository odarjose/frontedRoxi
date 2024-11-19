<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="AGREGAR ASIGNACIONES"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>

    <FormModalAsignaciones
        v-if="showModal"
        :key="modalKey"
        :asignacion-editar="asignacionEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />
    <div class="pt-4"></div>
    <TableAsignaciones @editar-asignacion="editarAsignaciones" />
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, onMounted } from "vue";
import TableAsignaciones from "./components/TableAsignaciones.vue";
import Button from "../../components/Button/ButtonComponnet.vue";
import FormModalAsignaciones from "./components/FormModalAsignaciones.vue";

import { useAsignacionStore } from "../../store/asignacionStore";

import {
    AsignacionDocentes,
    ListAsignacionDocentes,
} from "../../types/InterfaceDocentes";

export default defineComponent({
    name: "AsignacionesViews",
    components: {
        TableAsignaciones,
        FormModalAsignaciones,
        Button,
    },
    setup() {
        const asignacionStore = useAsignacionStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const asignacionEditar = ref<AsignacionDocentes | null>(null);

        const openModal = () => {
            asignacionEditar.value = null;
            showModal.value = true;
            modalKey.value++; // Forzar re-render del modal
        };

        const closeModal = () => {
            showModal.value = false;
            asignacionEditar.value = null;
        };

        const editarAsignaciones = async (equipos: AsignacionDocentes) => {
            asignacionEditar.value = JSON.parse(JSON.stringify(equipos));
            await nextTick();
            showModal.value = true;
            modalKey.value++; // Forzar re-render del modal si es necesario
        };

        const onGuardar = async (equipos: AsignacionDocentes) => {
            try {
                if (equipos.id) {
                    await asignacionStore.UpdatAsignacionesDocentes(equipos);
                } else {
                    await asignacionStore.AddAsignacionesDocentes(equipos);
                }
                closeModal();
                await asignacionStore.ListarAsignacionesDocentes();
            } catch (error) {
                console.error("Error al guardar la asignacion: ", error);
            }
        };

        onMounted(async () => {
            try {
                await asignacionStore.ListarAsignacionesDocentes();
            } catch (error) {
                console.error("Error al cargar las categorias");
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            asignacionEditar,
            openModal,
            editarAsignaciones,
            onGuardar,
        };
    },
});
</script>
