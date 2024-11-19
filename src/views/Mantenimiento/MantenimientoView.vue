<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="REGISTRAR PRESTAMOS"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>
    <FormModalMantenimiento
        v-if="showModal"
        :key="modalKey"
        :mantenimiento-editar="mantenimientoEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />

    <TableMantenimiento @editar-mantenimiento="editarMantenimiento" />
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TableMantenimiento from "./components/TableMantenimiento.vue";
import Button from "../../components/Button/ButtonComponnet.vue";

import FormModalMantenimiento from "../Mantenimiento/components/FormModalMantenimiento.vue";

import { useMantenimientoEquipoStore } from "../../store/mantenimientoStore";
import type {
    ListMatemientoEquipos,
    MantenimientoEquipos,
} from "../../types/InterfaceEquipos";

export default defineComponent({
    name: "ReservasViews",
    components: {
        TableMantenimiento,
        Button,
        FormModalMantenimiento,
    },
    setup() {
        const mantenimientoStore = useMantenimientoEquipoStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const mantenimientoEditar = ref<MantenimientoEquipos | null>(null);

        const openModal = () => {
            mantenimientoEditar.value = null;
            showModal.value = true;
            modalKey.value++;
        };
        const closeModal = () => {
            showModal.value = false;
            mantenimientoEditar.value = null;
        };
        const editarMantenimiento = (mantenimiento: MantenimientoEquipos) => {
            mantenimientoEditar.value = JSON.parse(
                JSON.stringify(mantenimiento),
            );
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (mantenimiento: MantenimientoEquipos) => {
            try {
                if (mantenimiento.id) {
                    await mantenimientoStore.UpdatMatemientoEquipos(
                        mantenimiento,
                    );
                } else {
                    await mantenimientoStore.AddMatemientoEquipos(
                        mantenimiento,
                    );
                }
                closeModal();
                await mantenimientoStore.ListarMatemientoEquipos();
            } catch (error) {
                console.error(
                    "Error en el registro del mantenimiento: ",
                    error,
                );
            }
        };

        onMounted(async () => {
            try {
                await mantenimientoStore.ListarMatemientoEquipos();
            } catch (error) {
                console.error(
                    "Error al cargar el listado de los registros del mantenimiento",
                );
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            mantenimientoEditar,
            openModal,
            editarMantenimiento,
            onGuardar,
        };
    },
});
</script>
