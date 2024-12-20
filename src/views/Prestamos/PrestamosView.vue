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

    <FormModalPrestamo
        v-if="showModal"
        :key="modalKey"
        :prestamos-editar="prestamosEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />

    <TablePrestamo @editar-prestamo="editarPrestamo" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TablePrestamo from "./components/TablePrestamo.vue";
import Button from "../../components/Button/ButtonComponnet.vue";

import FormModalPrestamo from "./components/FormModalPrestamo.vue";

import { usePrestamoStore } from "../../store/prestamosStore";
import type { Prestamos, ListPrestamos } from "../../types/InterfaceEquipos";

export default defineComponent({
    name: "ReservasViews",
    components: {
        TablePrestamo,
        Button,
        FormModalPrestamo,
    },
    setup() {
        const prestamoStore = usePrestamoStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const prestamosEditar = ref<Prestamos | null>(null);

        const openModal = () => {
            prestamosEditar.value = null;
            showModal.value = true;
            modalKey.value++;
        };
        const closeModal = () => {
            showModal.value = false;
            prestamosEditar.value = null;
        };
        const editarPrestamo = (prestamo: Prestamos) => {
            prestamosEditar.value = JSON.parse(JSON.stringify(prestamo));
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (prestamo: Prestamos) => {
            try {
                if (prestamo.id) {
                    await prestamoStore.UpdatePrestamo(prestamo);
                } else {
                    await prestamoStore.AddPrestamo(prestamo);
                }
                closeModal();
                await prestamoStore.ListarPrestamos();
            } catch (error) {
                console.error("Error al registrar la reserva: ", error);
            }
        };

        onMounted(async () => {
            try {
                await prestamoStore.ListarPrestamos();
            } catch (error) {
                console.error(
                    "Error al cargar el listado de los prestamos del equipo",
                );
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            prestamosEditar,
            openModal,
            editarPrestamo,
            onGuardar,
        };
    },
});
</script>
