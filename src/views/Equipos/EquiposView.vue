<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="AGREGAR EQUIPOS"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>
    <FormModalEquipos
        v-if="showModal"
        :key="modalKey"
        :equipos-editar="equiposEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />
    <TableEquipos @editar-equipos="editarEquipos" />
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, onMounted } from "vue";
import TableEquipos from "./components/TableEquipos.vue";

import Button from "../../components/Button/ButtonComponnet.vue";
import FormModalEquipos from "./components/FormModalEquipos.vue";

import { useEquipoStore } from "../../store/equiposStore";
import { Equipos, ListEquipos } from "../../types/InterfaceEquipos";

export default defineComponent({
    name: "EquiposView",
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        TableEquipos,
        FormModalEquipos,
    },
    setup() {
        const equipoStore = useEquipoStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const equiposEditar = ref<ListEquipos | null>(null);

        const openModal = () => {
            equiposEditar.value = null;
            showModal.value = true;
            modalKey.value++; // Forzar re-render del modal
        };

        const closeModal = () => {
            showModal.value = false;
            equiposEditar.value = null;
        };

        const editarEquipos = async (equipos: ListEquipos) => {
            equiposEditar.value = JSON.parse(JSON.stringify(equipos));
            await nextTick();
            showModal.value = true;
            modalKey.value++; // Forzar re-render del modal si es necesario
        };

        const onGuardar = async (equipos: ListEquipos) => {
            try {
                if (equipos.id) {
                    await equipoStore.UpdatEquipos(equipos);
                } else {
                    await equipoStore.AddEquipos(equipos);
                }
                closeModal();
                await equipoStore.ListarEquipos();
            } catch (error) {
                console.error("Error al guardar el aula: ", error);
            }
        };

        onMounted(async () => {
            try {
                await equipoStore.ListarEquipos();
            } catch (error) {
                console.error("Error al cargar las categorias");
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            equiposEditar,
            openModal,
            editarEquipos,
            onGuardar,
        };
    },
});
</script>
