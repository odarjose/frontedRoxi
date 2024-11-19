<template>
    <div>
        <FormModal
            ref="wizardModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion
                    ? 'Editar Asignacion'
                    : 'Registrar un nueva asignacion'
            "
            @save="guardarsAsignacion"
        >
            <!-- Un solo template para el contenido -->
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información de la Asignacion
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            v-model="asignacionLocal.docente_id"
                            class="select select-bordered w-full"
                            :disabled="!docentes.length"
                        >
                            <option value="" disabled>
                                {{
                                    docentes.length
                                        ? "Seleccione Docente"
                                        : "Cargando docentes..."
                                }}
                            </option>
                            <option
                                v-for="docente in docentes"
                                :key="docente.id"
                                :value="docente.id"
                            >
                                {{ docente.nombre }}
                            </option>
                        </select>

                        <select
                            v-model="asignacionLocal.seccion_id"
                            class="select select-bordered w-full"
                            :disabled="!seccion.length"
                        >
                            <option value="" disabled>
                                {{
                                    seccion.length
                                        ? "Seleccione Secciones"
                                        : "Cargando secciones..."
                                }}
                            </option>
                            <option
                                v-for="secciones in seccion"
                                :key="secciones.id"
                                :value="secciones.id"
                            >
                                {{ secciones.seccion }}
                            </option>
                        </select>

                        <input
                            v-model="asignacionLocal.periodo_academico"
                            placeholder="periodo academico"
                            type="number"
                            class="input input-bordered input-success w-full"
                        />

                        <select
                            v-model="asignacionLocal.turno"
                            class="select select-bordered w-full"
                        >
                            <option value="" disabled selected>Turno</option>
                            <option>mañana</option>
                            <option>tarde</option>
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

import type {
    AsignacionDocentes,
    ListAsignacionDocentes,
} from "../../../types/InterfaceDocentes";
import { useDocenteStore } from "../../../store/docenteStore";
import { useSeccionesStore } from "../../../store/seccionStore";

export default defineComponent({
    name: "ModalFormAsignacion",
    components: {
        FormModal,
    },
    props: {
        asignacionEditar: {
            type: Object as () => AsignacionDocentes | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { asignacionEditar, showModal } = toRefs(props);
        const wizardModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const asignacionLocal = ref<AsignacionDocentes>({
            id: 0,
            docente_id: 0,
            seccion_id: 0,
            periodo_academico: 0,
            turno: "",
        });

        const modoEdicion = computed(() => !!asignacionEditar.value);
        const docentes = computed(() => docente_store.docente);
        const seccion = computed(() => seccion_store.seccion);

        const resetForm = () => {
            asignacionLocal.value = {
                id: 0,
                docente_id: 0,
                seccion_id: 0,
                periodo_academico: 0,
                turno: "",
            };
        };

        /* listar el id y nombre de admision */
        const docente_store = useDocenteStore();

        /* listar id e imagen */
        const seccion_store = useSeccionesStore();

        const updateAsignacionLocal = () => {
            try {
                if (asignacionEditar.value) {
                    const equipos = JSON.parse(
                        JSON.stringify(asignacionEditar.value),
                    );

                    asignacionLocal.value = equipos;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar el equipo: ", error);
            }
        };

        watch(() => asignacionEditar.value, updateAsignacionLocal, {
            immediate: true,
            deep: true,
        });

        const guardarsAsignacion = () => {
            try {
                const equipos = JSON.parse(
                    JSON.stringify(asignacionLocal.value),
                );

                emit("guardar", equipos);
                resetForm();
                // Mostrar mensaje de éxito
            } catch (error) {
                console.error("Error al guardar:", error);
            }
        };
        // Observar cambios en showModal para cargar datos cuando se abre
        watch(
            () => showModal.value,
            async (newValue) => {
                if (newValue) {
                    await cargarDatos();
                    await nextTick(); // Asegura que el DOM esté listo antes de actualizar equipoLocal
                    updateAsignacionLocal(); // Copia los datos al formulario después de cargar
                }
            },
        );
        // Función para cargar datos
        const cargarDatos = async () => {
            try {
                await docente_store.ListarDocentes();
                await seccion_store.ListarSecciones();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await docente_store.ListarDocentes();
                await seccion_store.ListarSecciones();
                dataCargada.value = true;
            }
            (wizardModal.value as any).openModal();
        };

        const cerrarModal = () => {
            if (wizardModal.value) {
                (wizardModal.value as any).closedModal();
            }
            resetForm();
        };
        onMounted(async () => {
            docente_store.ListarDocentes();
            seccion_store.ListarSecciones();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,
            docentes,
            seccion,

            cargarDatos,
            modoEdicion,
            updateAsignacionLocal,

            guardarsAsignacion,
            wizardModal,
            isReady,
            asignacionLocal,
        };
    },
});
</script>
