<template>
    <div>
        <FormModal
            ref="wizarModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="2"
            :title="
                modoEdicion ? 'Editar Docente' : 'Registrar un nuevo docente'
            "
            @save="guardarDocente"
        >
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información personal del docente
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            v-model="docenteLocal.nombre"
                            placeholder="nombre"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="docenteLocal.apellido"
                            placeholder="apellidos"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="docenteLocal.dni"
                            type="number"
                            placeholder="dni"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="docenteLocal.fecha_nacimiento"
                            type="date"
                            placeholder="fecha de nacimiento"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="docenteLocal.email"
                            type="email"
                            placeholder="example@gmail.com"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="docenteLocal.telefono"
                            placeholder="telefono"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="docenteLocal.direccion"
                            placeholder="direccion"
                            class="input input-bordered input-success w-full"
                        />
                        <select
                            v-model="docenteLocal.rol"
                            class="select select-bordered w-full"
                        >
                            <option disabled selected>ROL</option>
                            <option>administrador</option>
                            <option>docente</option>
                            <option>personal_administrativo</option>
                        </select>
                    </div>
                </div>

                <div v-if="currentStep === 2">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Docente
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            v-model="docenteLocal.tipo_docencia"
                            placeholder="tipo docencia"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="docenteLocal.tipo_contrato"
                            placeholder="tipo contrato"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="docenteLocal.fecha_inicio_contrato"
                            type="date"
                            placeholder="fecha inicio contrato"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="docenteLocal.fecha_fin_contrato"
                            type="date"
                            placeholder="fecha fin contrato"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="docenteLocal.fecha_ingreso"
                            type="date"
                            placeholder="fecha ingreso"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="docenteLocal.fecha_salida"
                            type="date"
                            placeholder="fecha salida"
                            class="input input-bordered input-success w-full"
                        />

                        <select
                            v-model="docenteLocal.turno"
                            class="select select-bordered w-full"
                        >
                            <option disabled selected>TURNO</option>
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

import type { Docentes } from "../../../types/InterfaceDocentes";
import { useDocenteStore } from "../../../store/docenteStore";

export default defineComponent({
    name: "ModalFormDocente",
    components: { FormModal },
    props: {
        docenteEditar: {
            type: Object as () => Docentes | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { docenteEditar, showModal } = toRefs(props);
        const wizarModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);

        const docenteLocal = ref<Docentes>({
            id: 0,
            idpersona: 0,
            nombre: "",
            apellido: "",
            direccion: "",
            dni: "",
            email: "",
            fecha_nacimiento: new Date(),
            rol: "",
            telefono: "",
            fecha_inicio_contrato: new Date(),
            fecha_fin_contrato: new Date(),
            fecha_ingreso: new Date(),
            fecha_salida: new Date(),
            tipo_contrato: "",
            tipo_docencia: "",
            turno: "",
        });

        const docente_store = useDocenteStore();
        const modoEdicion = computed(() => !!docenteEditar.value);

        const docentes = computed(() => !!docente_store.docente);

        const resetForm = () => {
            docenteLocal.value = {
                id: 0,
                idpersona: 0,
                nombre: "",
                apellido: "",
                direccion: "",
                dni: "",
                email: "",
                fecha_nacimiento: new Date(),
                rol: "",
                telefono: "",
                fecha_inicio_contrato: new Date(),
                fecha_fin_contrato: new Date(),
                fecha_ingreso: new Date(),
                fecha_salida: new Date(),
                tipo_contrato: "",
                tipo_docencia: "",
                turno: "",
            };
        };

        // Función para convertir 'YYYY-MM-DD' a 'YYYY/MM/DD' para el backend
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

        const updateDocenteLocal = () => {
            try {
                if (docenteEditar.value) {
                    const docente = JSON.parse(
                        JSON.stringify(docenteEditar.value),
                    );
                    // Convert dates only if they are valid
                    docente.fecha_nacimiento = docente.fecha_nacimiento
                        ? formatDateForInput(docente.fecha_nacimiento)
                        : "";
                    docente.fecha_inicio_contrato =
                        docente.fecha_inicio_contrato
                            ? formatDateForInput(docente.fecha_inicio_contrato)
                            : "";
                    docente.fecha_fin_contrato = docente.fecha_fin_contrato
                        ? formatDateForInput(docente.fecha_fin_contrato)
                        : "";
                    docente.fecha_ingreso = docente.fecha_ingreso
                        ? formatDateForInput(docente.fecha_ingreso)
                        : "";
                    docente.fecha_salida = docente.fecha_salida
                        ? formatDateForInput(docente.fecha_salida)
                        : "";

                    docenteLocal.value = docente;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar la categoria: ", error);
            }
        };

        watch(() => docenteEditar.value, updateDocenteLocal, {
            immediate: true,
            deep: true,
        });

        const guardarDocente = () => {
            try {
                const docente = JSON.parse(JSON.stringify(docenteLocal.value));

                docente.fecha_nacimiento = formatDateForBackend(
                    docente.fecha_nacimiento,
                );
                docente.fecha_inicio_contrato = formatDateForBackend(
                    docente.fecha_inicio_contrato,
                );
                docente.fecha_fin_contrato = formatDateForBackend(
                    docente.fecha_fin_contrato,
                );
                docente.fecha_ingreso = formatDateForBackend(
                    docente.fecha_ingreso,
                );

                docente.fecha_salida = formatDateForBackend(
                    docente.fecha_salida,
                );

                emit("guardar", docente);
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

        const cargarDatos = async () => {
            try {
                await docente_store.ListarDocentes();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };
        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await docente_store.ListarDocentes();

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
            docente_store.ListarDocentes();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,
            docentes,
            modoEdicion,
            updateDocenteLocal,
            guardarDocente,
            wizarModal,
            docente_store,
            isReady,
            docenteLocal,
        };
    },
});
</script>
