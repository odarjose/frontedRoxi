<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="AGREGAR EDIFICIOS"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>

    <FormModalEdificios
        v-if="showModal"
        :key="modalKey"
        :edificio-editar="edificioEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />
    <div>
        <TableEdificios @editar-edificio="editarEdificio" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import TableEdificios from "./components/TableEdificios.vue";
import Button from "../../components/Button/ButtonComponnet.vue";
import FormModalEdificios from "./components/FormModalEdificios.vue";

import { useEdificioStore } from "../../store/edificioStore";

import type { Edificios } from "../../types/InterfaceAulas";

export default defineComponent({
    name: "EdificiosViews",
    components: {
        FormModalEdificios,
        Button,
        TableEdificios,
    },
    setup() {
        const edificioStore = useEdificioStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const edificioEditar = ref<Edificios | null>(null);

        const openModal = () => {
            edificioEditar.value = null;
            showModal.value = true;
            modalKey.value++;
        };
        const closeModal = () => {
            showModal.value = false;
            edificioEditar.value = null;
        };
        const editarEdificio = (edificio: Edificios) => {
            edificioEditar.value = JSON.parse(JSON.stringify(edificio));
            showModal.value = true;
            modalKey.value++;
        };
        const onGuardar = async (edifico: Edificios) => {
            try {
                if (edifico.id) {
                    await edificioStore.UpdatEdificios(edifico);
                } else {
                    await edificioStore.AddEdificios(edifico);
                }
                closeModal();
                await edificioStore.ListarEdificios();
            } catch (error) {
                console.error("Error al guardar el aula: ", error);
            }
        };

        onMounted(async () => {
            try {
                await edificioStore.ListarEdificios();
            } catch (error) {
                console.error("Error al cargar las edificios");
            }
        });

        return {
            modal,
            showModal,
            modalKey,
            edificioEditar,
            openModal,
            editarEdificio,
            onGuardar,
        };
    },
});
</script>
