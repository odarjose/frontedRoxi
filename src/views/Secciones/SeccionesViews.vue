<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full px-4 text-xs font-bold"
        />

        <Button
            text="AGREGAR SECCIONES"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>
    <FormModalSecciones
        v-if="showModal"
        :key="modalKey"
        :seccion-editar="seccionEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />
    <div class="pt-4">
        <TableSecciones @editar-secciones="editarSeccion" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import TableSecciones from "./components/TableSecciones.vue";

import Button from "../../components/Button/ButtonComponnet.vue";
import FormModalSecciones from "../Secciones/components/FormModalSecciones.vue";

import { useSeccionesStore } from "../../store/seccionStore";
import type { Secciones } from "../../types/InterfaceAulas";

export default defineComponent({
    name: "SeccionesView",
    components: {
        Button,
        TableSecciones,
        FormModalSecciones,
    },
    setup() {
        const seccionStore = useSeccionesStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const seccionEditar = ref<Secciones | null>(null);

        const openModal = () => {
            showModal.value = false;
            showModal.value = true;
            seccionEditar.value = null;
        };
        const closeModal = () => {
            showModal.value = false;
            seccionEditar.value = null;
        };

        const editarSeccion = (seccion: Secciones) => {
            seccionEditar.value = JSON.parse(JSON.stringify(seccion));
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (seccion: Secciones) => {
            try {
                if (seccion.id) {
                    await seccionStore.UpdatSecciones(seccion);
                } else {
                    await seccionStore.AddSecciones(seccion);
                }
                closeModal();
                await seccionStore.ListarSecciones();
            } catch (error) {
                console.error("Error al guardar la seccion: ", error);
            }
        };

        onMounted(async () => {
            try {
                await seccionStore.ListarSecciones();
            } catch (error) {
                console.error("Error al cargar las secciones");
            }
        });

        return {
            modal,

            showModal,
            modalKey,
            seccionEditar,
            openModal,
            editarSeccion,
            onGuardar,
        };
    },
});
</script>
