<template>
    <div>
        <FormModal
            ref="wizardModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion ? 'Editar Reserva' : 'Registrar una nueva reserva'
            "
            @save="guardarReserva"
        >
            <!-- Un solo template para el contenido -->
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Equipo - I
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            v-model="reservasLocal.docente_id"
                            class="select select-bordered w-full"
                            :disabled="!docentes.length"
                        >
                            <option value="" disabled>
                                {{
                                    docentes.length
                                        ? "Seleccione una ficha omr"
                                        : "Cargando fichas ..."
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

                        <select
                            v-model="reservasLocal.aula_id"
                            class="select select-bordered w-full"
                            :disabled="!aulas.length"
                        >
                            <option value="" disabled>
                                {{
                                    aulas.length
                                        ? "Seleccione Aulas "
                                        : "Cargando Aulas..."
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
                            v-model="reservasLocal.fecha"
                            placeholder="fecha"
                            type="date"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="reservasLocal.hora_inicio"
                            placeholder="hora inicio"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="reservasLocal.hora_fin"
                            placeholder="hora fin"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="reservasLocal.evento"
                            type="text"
                            placeholder="evento"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="reservasLocal.motivo"
                            type="text"
                            placeholder="motivo"
                            class="input input-bordered input-success w-full"
                        />

                        <select
                            v-model="reservasLocal.estado"
                            class="select select-bordered w-full"
                        >
                            <option value="" disabled selected>Estado</option>
                            <option>pendiente</option>
                            <option>aprobada</option>
                            <option>rechazada</option>
                            <option>cancelada</option>
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

import type { Reservas } from "../../../types/InterfaceDocentes";
import { useAulaStore } from "../../../store/aulaStore";
import { useDocenteStore } from "../../../store/docenteStore";

export default defineComponent({
    name: "ModalFormExamen",
    components: {
        FormModal,
    },
    props: {
        reservasEditar: {
            type: Object as () => Reservas | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { reservasEditar, showModal } = toRefs(props);
        const wizardModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const reservasLocal = ref<Reservas>({
            id: 0,
            aula_id: 0,
            docente_id: 0,
            fecha: new Date(),
            hora_fin: "",
            hora_inicio: "",
            evento: "",
            motivo: "",
            estado: "",
        });

        const modoEdicion = computed(() => !!reservasEditar.value);
        const docentes = computed(() => docente_store.docente);
        const aulas = computed(() => aula_store.aula);

        const resetForm = () => {
            reservasLocal.value = {
                id: 0,
                aula_id: 0,
                docente_id: 0,
                fecha: new Date(),
                hora_fin: "",
                hora_inicio: "",
                evento: "",
                motivo: "",
                estado: "",
            };
        };

        /* listar el id y nombre de admision */
        const docente_store = useDocenteStore();

        /* listar id e imagen */
        const aula_store = useAulaStore();

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

        const updateReservaLocal = () => {
            try {
                if (reservasEditar.value) {
                    const reserva = JSON.parse(
                        JSON.stringify(reservasEditar.value),
                    );
                    // Convert dates only if they are valid
                    reserva.fecha = reserva.fecha
                        ? formatDateForInput(reserva.fecha)
                        : "";

                    reservasLocal.value = reserva;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar la categoria: ", error);
            }
        };

        watch(() => reservasEditar.value, updateReservaLocal, {
            immediate: true,
            deep: true,
        });

        const guardarReserva = () => {
            try {
                const reserva = JSON.parse(JSON.stringify(reservasLocal.value));

                reserva.fecha = formatDateForBackend(reserva.fecha);

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
                    updateReservaLocal(); // Copia los datos al formulario después de cargar
                }
            },
        );
        // Función para cargar datos
        const cargarDatos = async () => {
            try {
                await docente_store.ListarDocentes();
                await aula_store.ListarAulas();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await docente_store.ListarDocentes();
                await aula_store.ListarAulas();
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
            aula_store.ListarAulas();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,
            docentes,
            aulas,

            cargarDatos,
            modoEdicion,
            updateReservaLocal,

            guardarReserva,
            wizardModal,
            isReady,
            reservasLocal,
        };
    },
});
</script>
