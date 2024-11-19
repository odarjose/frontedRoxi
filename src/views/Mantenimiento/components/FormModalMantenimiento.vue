<template>
    <div>
        <FormModal
            ref="wizardModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion
                    ? 'Editar registro de mantenimiento'
                    : 'Registrar un nuevo mantenimiento'
            "
            @save="guardarPrestamo"
        >
            <!-- Un solo template para el contenido -->
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Mantenimiento
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            v-model="mantenimientoLocal.equipo_id"
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

                        <input
                            v-model="mantenimientoLocal.fecha_mantenimiento"
                            placeholder="fecha de mantenimiento"
                            type="date"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="mantenimientoLocal.nombre_tecnico"
                            placeholder="nombre del tecnico"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="mantenimientoLocal.telefono_tecnico"
                            placeholder="telefono del tecnico"
                            class="input input-bordered input-success w-full"
                        />

                        <select
                            v-model="mantenimientoLocal.tipo_mantenimiento"
                            class="select select-bordered w-full"
                        >
                            <option value="" disabled selected>Estado</option>
                            <option>preventivo</option>
                            <option>correctivo</option>
                        </select>

                        <input
                            v-model="mantenimientoLocal.detalles"
                            type="text"
                            placeholder="detalles"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="mantenimientoLocal.costo"
                            placeholder="costo"
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

import type { MantenimientoEquipos } from "../../../types/InterfaceEquipos";
import { useMantenimientoEquipoStore } from "../../../store/mantenimientoStore";
import { useEquipoStore } from "../../../store/equiposStore";

export default defineComponent({
    name: "ModalFormPrestamos",
    components: {
        FormModal,
    },
    props: {
        mantenimientoEditar: {
            type: Object as () => MantenimientoEquipos | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { mantenimientoEditar, showModal } = toRefs(props);
        const wizardModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const mantenimientoLocal = ref<MantenimientoEquipos>({
            id: 0,
            equipo_id: 0,
            costo: 0,
            detalles: "",
            fecha_mantenimiento: new Date(),
            nombre_tecnico: "",
            telefono_tecnico: "",
            tipo_mantenimiento: "",
        });

        const modoEdicion = computed(() => !!mantenimientoEditar.value);

        const equipos = computed(() => equipo_store.equipo);

        const resetForm = () => {
            mantenimientoLocal.value = {
                id: 0,
                equipo_id: 0,
                costo: 0,
                detalles: "",
                fecha_mantenimiento: new Date(),
                nombre_tecnico: "",
                telefono_tecnico: "",
                tipo_mantenimiento: "",
            };
        };

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
                if (mantenimientoEditar.value) {
                    const prestamo = JSON.parse(
                        JSON.stringify(mantenimientoEditar.value),
                    );
                    // Convert dates only if they are valid
                    prestamo.fecha_mantenimiento = prestamo.fecha_mantenimiento
                        ? formatDateForInput(prestamo.fecha_mantenimiento)
                        : "";

                    mantenimientoLocal.value = prestamo;
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

        watch(() => mantenimientoEditar.value, updatePrestamoLocal, {
            immediate: true,
            deep: true,
        });

        const guardarPrestamo = () => {
            try {
                const reserva = JSON.parse(
                    JSON.stringify(mantenimientoLocal.value),
                );

                reserva.fecha_mantenimiento = formatDateForBackend(
                    reserva.fecha_mantenimiento,
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
                await equipo_store.ListarEquipos();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
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
            equipo_store.ListarEquipos();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,

            equipos,
            cargarDatos,
            modoEdicion,
            updatePrestamoLocal,
            guardarPrestamo,
            wizardModal,
            isReady,
            mantenimientoLocal,
        };
    },
});
</script>
