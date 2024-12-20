<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="AGREGAR RESERVAS"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>

    <FormModalReservas
        v-if="showModal"
        :key="modalKey"
        :reservas-editar="reservaEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />

    <div class="pt-4">
        <TableReservas @editar-reserva="editarReserva" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TableReservas from "./components/TableReservas.vue";
import Button from "../../components/Button/ButtonComponnet.vue";

import FormModalReservas from "./components/FormModalReservas.vue";

import { useReservasStore } from "../../store/reservasStore";

import type { Reservas } from "../../types/InterfaceDocentes";

export default defineComponent({
    name: "ReservasViews",
    components: {
        TableReservas,
        Button,
        FormModalReservas,
    },
    setup() {
        const reservaStore = useReservasStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const reservaEditar = ref<Reservas | null>(null);

        const openModal = () => {
            reservaEditar.value = null;
            showModal.value = true;
            modalKey.value++;
        };
        const closeModal = () => {
            showModal.value = false;
            reservaEditar.value = null;
        };
        const editarReserva = (reserva: Reservas) => {
            reservaEditar.value = JSON.parse(JSON.stringify(reserva));
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (reserva: Reservas) => {
            try {
                if (reserva.id) {
                    await reservaStore.UpdatReservas(reserva);
                } else {
                    await reservaStore.AddReservas(reserva);
                }
                closeModal();
                await reservaStore.ListarReservas();
            } catch (error) {
                console.error("Error al registrar la reserva: ", error);
            }
        };

        onMounted(async () => {
            try {
                await reservaStore.ListarReservas();
            } catch (error) {
                console.error("Error al cargar las reservas");
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            reservaEditar,
            openModal,
            editarReserva,
            onGuardar,
        };
    },
});
</script>
