<template>
    <div class="flex justify-end pt-4">
        <Button
            label="Importar"
            customClass="btn-info"
            color=""
            text-color="text-black"
            icon="fa-solid fa-file-import"
            :size="{ base: 'sm', sm: 'md', md: 'lg', lg: 'md' }"
        />
        <Button
            label="Agregar Aulas"
            customClass="btn-success"
            color="bg-green-500"
            text-color="text-black"
            :size="{ base: 'sm', sm: 'md', md: 'lg', lg: 'md' }"
            @open-modal="openModal"
        />
    </div>

    <ModalFormAula
        v-if="showModal"
        :key="modalKey"
        :aula-editar="aulaEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />

    <TableAulas @editar-aula="editarAula" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TableAulas from "./components/TableAulas.vue";
import Button from "../../components/Button/ButtonComponnet.vue";
import ModalFormAula from "./components/ModalFormAula.vue";

import { useAulaStore } from "../../store/aulaStore";
import type { Aulas } from "../../types/InterfaceAulas";

export default defineComponent({
    name: "ExamenesView",
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        TableAulas,
        ModalFormAula,
    },
    setup() {
        const aulaStore = useAulaStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const aulaEditar = ref<Aulas | null>(null);

        const openModal = () => {
            aulaEditar.value = null;
            showModal.value = true;
            modalKey.value++; // Forzar re-render del modal
        };

        const closeModal = () => {
            showModal.value = false;
            aulaEditar.value = null;
        };

        const editarAula = (examen: Aulas) => {
            aulaEditar.value = JSON.parse(JSON.stringify(examen));
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (examen: Aulas) => {
            try {
                if (examen.id) {
                    await aulaStore.UpdatAulas(examen);
                } else {
                    await aulaStore.AddAulas(examen);
                }
                closeModal();
                await aulaStore.ListarAulas();
            } catch (error) {
                console.error("Error al guardar el aula: ", error);
            }
        };

        onMounted(async () => {
            try {
                await aulaStore.ListarAulas();
            } catch (error) {
                console.error("Error al cargar los examenes");
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            aulaEditar,
            openModal,
            editarAula,
            onGuardar,
        };
    },
});
</script>
