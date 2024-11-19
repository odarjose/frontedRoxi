<template>
    <div>
        <FormModal
            ref="wizarModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion ? 'Editar Edificio' : 'Registrar un nuevo edificio'
            "
            @save="guardarEdificio"
        >
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Edificio
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            v-model="edificioLocal.nombre"
                            placeholder="nombre"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="edificioLocal.direccion"
                            placeholder="direccion"
                            class="input input-bordered input-success w-full"
                        />
                    </div>
                </div>
            </template>
        </FormModal>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    watch,
    computed,
    toRefs,
    onMounted,
    nextTick,
} from "vue";
import FormModal from "../../../components/Form/FormModal.vue";

import type { Edificios } from "../../../types/InterfaceAulas";
import { useEdificioStore } from "../../../store/edificioStore";

export default defineComponent({
    name: "ModalFormEdificios",
    components: {
        FormModal,
    },
    props: {
        edificioEditar: {
            type: Object as () => Edificios | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { edificioEditar, showModal } = toRefs(props);
        const wizarModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const edificioLocal = ref<Edificios>({
            id: 0,
            nombre: "",
            direccion: "",
        });

        const edificio_store = useEdificioStore();

        const modoEdicion = computed(() => !!edificioEditar.value);
        const edificios = computed(() => edificio_store.edificio);

        const resetForm = () => {
            edificioLocal.value = {
                id: 0,
                nombre: "",
                direccion: "",
            };
        };

        const updateEdificioLocal = () => {
            try {
                if (edificioEditar.value) {
                    const examen = JSON.parse(
                        JSON.stringify(edificioEditar.value),
                    );

                    edificioLocal.value = examen;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar el examen: ", error);
            }
        };

        watch(() => edificioEditar.value, updateEdificioLocal, {
            immediate: true,
            deep: true,
        });

        const guardarEdificio = () => {
            try {
                const edificio = JSON.parse(
                    JSON.stringify(edificioLocal.value),
                );
                emit("guardar", edificio);
                resetForm();
            } catch (error) {
                console.error("Error al guardar:", error);
            }
        };
        watch(
            () => showModal.value,
            async (newValue) => {
                if (newValue) {
                    await cargarDatos();
                }
            },
        );

        // Función para cargar datos
        const cargarDatos = async () => {
            try {
                await edificio_store.ListarEdificios();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await edificio_store.ListarEdificios();

                dataCargada.value = true;
            }
            (wizarModal.value as any).openModal();
        };

        const cerrarModal = () => {
            if (wizarModal.value) {
                (wizarModal.value as any).closedModal();
            }
            resetForm();
        };
        onMounted(async () => {
            edificio_store.ListarEdificios();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,
            edificios,
            modoEdicion,
            updateEdificioLocal,
            guardarEdificio,
            wizarModal,
            edificio_store,
            isReady,
            edificioLocal,
        };
    },
});
</script>
