<template>
    <div>
        <FormModal
            ref="wizardModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion ? 'Editar Prestamo' : 'Registrar una nuevo prestamo'
            "
            @save="guardarPrestamo"
        >
            <!-- Un solo template para el contenido -->
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Prestamo
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            v-model="prestamosLocal.equipo_id"
                            class="select select-bordered w-full"
                            :disabled="!equipos.length"
                        >
                            <option value="" disabled>
                                {{
                                    equipos.length
                                        ? "Seleccione un equipo"
                                        : "Cargando equipos ..."
                                }}
                            </option>
                            <option
                                v-for="equipo in equipos"
                                :key="equipo.id"
                                :value="equipo.id"
                            >
                                {{ equipo.nombre }}
                            </option>
                        </select>

                        <select
                            v-model="prestamosLocal.docente_id"
                            class="select select-bordered w-full"
                            :disabled="!docentes.length"
                        >
                            <option value="" disabled>
                                {{
                                    docentes.length
                                        ? "Seleccione al docente "
                                        : "Cargando docente ..."
                                }}
                            </option>
                            <option
                                v-for="docente in docentes"
                                :key="docente.id"
                                :value="docente.id"
                            >
                                {{ docente.nombre + " " + docente.apellido }}
                            </option>
                        </select>

                        <input
                            v-model="prestamosLocal.fecha_retiro"
                            placeholder="fecha de retiro"
                            type="date"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="prestamosLocal.fecha_devolucion"
                            placeholder="fecha de devolucion"
                            type="date"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="prestamosLocal.estado_retiro"
                            placeholder="estado de retiro"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="prestamosLocal.estado_devolucion"
                            type="text"
                            placeholder="estado de devolucion"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="prestamosLocal.observaciones"
                            type="text"
                            placeholder="observaciones"
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

import type { Prestamos } from "../../../types/InterfaceEquipos";
import { useEquipoStore } from "../../../store/equiposStore";
import { useDocenteStore } from "../../../store/docenteStore";

export default defineComponent({
    name: "ModalFormPrestamos",
    components: {
        FormModal,
    },
    props: {
        prestamosEditar: {
            type: Object as () => Prestamos | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { prestamosEditar, showModal } = toRefs(props);
        const wizardModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const prestamosLocal = ref<Prestamos>({
            id: 0,
            equipo_id: 0,
            docente_id: 0,
            estado_retiro: "",
            fecha_retiro: new Date(),
            estado_devolucion: "",
            fecha_devolucion: new Date(),
            observaciones: "",
        });

        const modoEdicion = computed(() => !!prestamosEditar.value);
        const docentes = computed(() => docente_store.docente);
        const equipos = computed(() => equipo_store.equipo);

        const resetForm = () => {
            prestamosLocal.value = {
                id: 0,
                equipo_id: 0,
                docente_id: 0,
                estado_retiro: "",
                fecha_retiro: new Date(),
                estado_devolucion: "",
                fecha_devolucion: new Date(),
                observaciones: "",
            };
        };

        /* listar el id y nombre de admision */
        const docente_store = useDocenteStore();

        /* listar id e imagen */
        const equipo_store = useEquipoStore();

        const formatDateForInput = (date: Date | string | null | undefined) => {
            if (!date) return ""; // Return an empty string if date is null or undefined
            if (typeof date === "string") return date.replace(/\//g, "-"); // Format to 'YYYY-MM-DD' if string
            return new Date(date).toISOString().split("T")[0]; // Convert Date to 'YYYY-MM-DD'
        };

        const formatDateForBackend = (date: string | Date) => {
            if (typeof date === "string") return date.replace(/-/g, "/"); // Si es string
            return new Date(date)
                .toISOString()
                .split("T")[0]
                .replace(/-/g, "/"); // Convierte Date a 'YYYY/MM/DD'
        };

        const updatePrestamoLocal = () => {
            try {
                if (prestamosEditar.value) {
                    const prestamo = JSON.parse(
                        JSON.stringify(prestamosEditar.value),
                    );
                    // Convert dates only if they are valid
                    prestamo.fecha_retiro = prestamo.fecha_retiro
                        ? formatDateForInput(prestamo.fecha_retiro)
                        : "";

                    prestamo.fecha_devolucion = prestamo.fecha_devolucion
                        ? formatDateForInput(prestamo.fecha_devolucion)
                        : "";

                    prestamosLocal.value = prestamo;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error(
                    "Error al actualizar la data del prestamo: ",
                    error,
                );
            }
        };

        watch(() => prestamosEditar.value, updatePrestamoLocal, {
            immediate: true,
            deep: true,
        });

        const guardarPrestamo = () => {
            try {
                const reserva = JSON.parse(
                    JSON.stringify(prestamosLocal.value),
                );

                reserva.fecha_retiro = formatDateForBackend(
                    reserva.fecha_retiro,
                );

                emit("guardar", reserva);
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
                    updatePrestamoLocal(); // Copia los datos al formulario después de cargar
                }
            },
        );
        // Función para cargar datos
        const cargarDatos = async () => {
            try {
                await docente_store.ListarDocentes();
                await equipo_store.ListarEquipos();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await docente_store.ListarDocentes();
                await equipo_store.ListarEquipos();
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
            equipo_store.ListarEquipos();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,
            docentes,
            equipos,
            cargarDatos,
            modoEdicion,
            updatePrestamoLocal,
            guardarPrestamo,
            wizardModal,
            isReady,
            prestamosLocal,
        };
    },
});
</script>
