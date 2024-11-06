<template>
    <div>
        <FormModal
            ref="wizardModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion ? 'Editar Equipos' : 'Registrar un nuevo equipo'
            "
            @save="guardarExamen"
        >
            <!-- Un solo template para el contenido -->
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Equipo - I
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            v-model="equipoLocal.nombre"
                            placeholder="nombre"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="equipoLocal.marca"
                            placeholder="marca"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="equipoLocal.modelo"
                            placeholder="modelo"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="equipoLocal.numero_serie"
                            type="number"
                            placeholder="numero de serie"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="equipoLocal.anio_adquisicion"
                            placeholder="año de adquisicion"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="equipoLocal.ubicacion"
                            placeholder="ubicacion"
                            class="input input-bordered input-success w-full"
                        />
                        <select
                            v-model="equipoLocal.categoria_id"
                            class="select select-bordered w-full"
                            :disabled="!categorias.length"
                        >
                            <option value="" disabled>
                                {{
                                    categorias.length
                                        ? "Seleccione Admisión"
                                        : "Cargando admisiones..."
                                }}
                            </option>
                            <option
                                v-for="categoria in categorias"
                                :key="categoria.id"
                                :value="categoria.id"
                            >
                                {{ categoria.nombre }}
                            </option>
                        </select>
                        <select
                            v-model="equipoLocal.asignado_a"
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
                            v-model="equipoLocal.estado"
                            class="select select-bordered w-full"
                        >
                            <option value="" disabled selected>Estado</option>
                            <option>activo</option>
                            <option>en_reparacion</option>
                            <option>dado_de_baja</option>
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

import type { Equipos } from "../../../types/InterfaceEquipos";
import { useEquipoStore } from "../../../store/equiposStore";
import { useDocenteStore } from "../../../store/docenteStore";
import { useCategoriaStore } from "../../../store/categoriaStore";

export default defineComponent({
    name: "ModalFormExamen",
    components: {
        FormModal,
    },
    props: {
        equiposEditar: {
            type: Object as () => Equipos | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { equiposEditar, showModal } = toRefs(props);
        const wizardModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const equipoLocal = ref<Equipos>({
            id: 0,
            nombre: "",
            marca: "",
            modelo: "",
            numero_serie: "",
            anio_adquisicion: 0,
            ubicacion: "",
            categoria_id: 0,
            asignado_a: 0,

            estado: "",
        });

        const modoEdicion = computed(() => !!equiposEditar.value);
        const docentes = computed(() => docente_store.docente);
        const categorias = computed(() => categoria_store.categoria);

        const resetForm = () => {
            equipoLocal.value = {
                id: 0,
                nombre: "",
                marca: "",
                modelo: "",
                numero_serie: "",
                anio_adquisicion: 0,
                ubicacion: "",
                categoria_id: 0,
                asignado_a: 0,

                estado: "",
            };
        };

        /* listar el id y nombre de admision */
        const docente_store = useDocenteStore();

        /* listar id e imagen */
        const categoria_store = useCategoriaStore();

        const updateEquipoLocal = () => {
            try {
                if (equiposEditar.value) {
                    const equipos = JSON.parse(
                        JSON.stringify(equiposEditar.value),
                    );

                    equipoLocal.value = equipos;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar el equipo: ", error);
            }
        };

        watch(() => equiposEditar.value, updateEquipoLocal, {
            immediate: true,
            deep: true,
        });

        const guardarExamen = () => {
            try {
                const equipos = JSON.parse(JSON.stringify(equipoLocal.value));

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
                    updateEquipoLocal(); // Copia los datos al formulario después de cargar
                }
            },
        );
        // Función para cargar datos
        const cargarDatos = async () => {
            try {
                await docente_store.ListarDocentes();
                await categoria_store.ListarCategorias();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await docente_store.ListarDocentes();
                await categoria_store.ListarCategorias();
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
            categoria_store.ListarCategorias();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,
            docentes,
            categorias,

            cargarDatos,
            modoEdicion,
            updateEquipoLocal,

            guardarExamen,
            wizardModal,
            isReady,
            equipoLocal,
        };
    },
});
</script>
