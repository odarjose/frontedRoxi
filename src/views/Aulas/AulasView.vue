<template>
    <div class="flex justify-between w-full pt-4">
        <div class="flex">
            <Button
                text="IMPORTAR"
                color="border border-slate-300 text-slate-600"
                size="py-2.5 px-3 mr-3 rounded-full px-4 text-xs font-bold"
            />
        </div>

        <div class="flex">
            <Button
                text="SECCIONES"
                color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
                size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
                icon="fas fa-user-plus"
                class="mr-2"
                @click="openModal"
            />
            <Button
                text="EDIFICIOS"
                color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
                size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
                icon="fas fa-user-plus"
                class="mr-2"
                @click="openModal"
            />
            <Button
                text="RECURSOS"
                color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
                size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
                icon="fas fa-user-plus"
                class="mr-2"
                @click="navigateToRecursos"
            />
            <Button
                text="AGREGAR AULAS"
                color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
                size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
                icon="fas fa-user-plus"
                @click="openModal"
            />
        </div>
    </div>
    <FormModalRecursos
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
import { useRouter } from "vue-router";
import { defineComponent, ref, onMounted } from "vue";
import TableAulas from "./components/TableAulas.vue";
import Button from "../../components/Button/ButtonComponnet.vue";
import FormModalRecursos from "../Recursos/components/FormModalRecursos.vue";

import { useAulaStore } from "../../store/aulaStore";
import type { Aulas } from "../../types/InterfaceAulas";

export default defineComponent({
    name: "ExamenesView",
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        TableAulas,
        FormModalRecursos,
    },
    setup() {
        const aulaStore = useAulaStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const aulaEditar = ref<Aulas | null>(null);

        const router = useRouter();
        const navigateToRecursos = () => {
            router.push({ name: "recursos" }); // Redirige a la ruta 'home'
        };

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
            navigateToRecursos,
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
