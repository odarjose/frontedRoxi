<template>
    <div>
        <FormModal
            ref="wizarModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="modoEdicion ? 'Editar Aula' : 'Registrar un nueva Aula'"
            @save="guardarAula"
        >
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Aula
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            v-model="aulaLocal.nombre"
                            placeholder="nombre"
                            class="input input-bordered input-success w-full"
                        />
                        <select
                            v-model="aulaLocal.edificio_id"
                            class="select select-bordered w-full"
                            :disabled="!edificios.length"
                        >
                            <option value="" disabled>
                                {{
                                    edificios.length
                                        ? "Seleccione Edificio"
                                        : "Cargando edificios..."
                                }}
                            </option>
                            <option
                                v-for="admision in edificios"
                                :key="admision.id"
                                :value="admision.id"
                            >
                                {{ admision.nombre }}
                            </option>
                        </select>

                        <input
                            v-model="aulaLocal.piso"
                            placeholder="piso"
                            type="number"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="aulaLocal.capacidad"
                            placeholder="capacidad"
                            type="number"
                            class="input input-bordered input-success w-full"
                        />
                        <select
                            v-model="aulaLocal.tipo"
                            class="select select-bordered w-full"
                        >
                            <option value="" disabled selected>Estado</option>
                            <option>regular</option>
                            <option>innovacion_tecnologica</option>
                        </select>
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

import type { Aulas } from "../../../types/InterfaceAulas";
import { useEdificioStore } from "../../../store/edificioStore";

export default defineComponent({
    name: "ModalFormAulas",
    components: {
        FormModal,
    },
    props: {
        aulaEditar: {
            type: Object as () => Aulas | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { aulaEditar, showModal } = toRefs(props);
        const wizarModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const aulaLocal = ref<Aulas>({
            id: 0,
            capacidad: 0,
            edificio: "",
            edificio_id: 0,
            nombre: "",
            piso: 0,
            tipo: "",
        });

        const edificio_store = useEdificioStore();

        const modoEdicion = computed(() => !!aulaEditar.value);
        const edificios = computed(() => edificio_store.edificio);

        const resetForm = () => {
            aulaLocal.value = {
                id: 0,
                capacidad: 0,
                edificio: "",
                edificio_id: 0,
                nombre: "",
                piso: 0,
                tipo: "",
            };
        };

        const updateAulaLocal = () => {
            try {
                if (aulaEditar.value) {
                    const examen = JSON.parse(JSON.stringify(aulaEditar.value));

                    aulaLocal.value = examen;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar el examen: ", error);
            }
        };

        watch(() => aulaEditar.value, updateAulaLocal, {
            immediate: true,
            deep: true,
        });

        const guardarAula = () => {
            try {
                const examen = JSON.parse(JSON.stringify(aulaLocal.value));
                emit("guardar", examen);
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
            updateAulaLocal,
            guardarAula,
            wizarModal,
            edificio_store,
            isReady,
            aulaLocal,
        };
    },
});
</script>
