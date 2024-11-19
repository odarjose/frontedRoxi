<template>
    <div>
        <FormModal
            ref="wizardModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion ? 'Editar Seccion' : 'Registrar un nueva seccion'
            "
            @save="guardarSeccion"
        >
            <!-- Un solo template para el contenido -->
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información de la Seccion
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            v-model="seccionLocal.aula_id"
                            class="select select-bordered w-full"
                            :disabled="!aulas.length"
                        >
                            <option value="" disabled>
                                {{
                                    aulas.length
                                        ? "Seleccione el aula"
                                        : "Cargando aulas ..."
                                }}
                            </option>
                            <option
                                v-for="aula in aulas"
                                :key="aula.id"
                                :value="aula.id"
                            >
                                {{ aula.nombre }}
                            </option>
                        </select>
                        <input
                            v-model="seccionLocal.seccion"
                            placeholder="seccion"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="seccionLocal.grado"
                            placeholder="grado"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="seccionLocal.periodo_academico"
                            placeholder="periodo academico"
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
import type { Secciones } from "../../../types/InterfaceAulas";

import { useSeccionesStore } from "../../../store/seccionStore";

import { useAulaStore } from "../../../store/aulaStore";

export default defineComponent({
    name: "ModalFormSecciones",
    components: {
        FormModal,
    },
    props: {
        seccionEditar: {
            type: Object as () => Secciones | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { seccionEditar, showModal } = toRefs(props);
        const wizarModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const seccionLocal = ref<Secciones>({
            id: 0,
            aula_id: 0,
            grado: 0,
            periodo_academico: 0,
            seccion: "",
            aula: "",
        });

        const aula_store = useAulaStore();

        const modoEdicion = computed(() => !!seccionEditar.value);
        const aulas = computed(() => aula_store.aula);

        const resetForm = () => {
            seccionLocal.value = {
                id: 0,
                aula_id: 0,
                grado: 0,
                periodo_academico: 0,
                seccion: "",
                aula: "",
            };
        };

        const updateSeccionLocal = () => {
            try {
                if (seccionEditar.value) {
                    const examen = JSON.parse(
                        JSON.stringify(seccionEditar.value),
                    );

                    seccionLocal.value = examen;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar el seccion: ", error);
            }
        };

        watch(() => seccionEditar.value, updateSeccionLocal, {
            immediate: true,
            deep: true,
        });

        const guardarSeccion = () => {
            try {
                const seccion = JSON.parse(JSON.stringify(seccionLocal.value));
                emit("guardar", seccion);
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
                await aula_store.ListarAulas();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await aula_store.ListarAulas();

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
            aula_store.ListarAulas();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,
            aulas,
            modoEdicion,
            updateSeccionLocal,
            guardarSeccion,
            wizarModal,
            aula_store,
            isReady,
            seccionLocal,
        };
    },
});
</script>
