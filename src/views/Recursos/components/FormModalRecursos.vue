<template>
    <div>
        <FormModal
            ref="wizardModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion ? 'Editar Recursos' : 'Registrar un nuevo recurso'
            "
            @save="guardarRecurso"
        >
            <!-- Un solo template para el contenido -->
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Equipo - I
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                            v-model="recursoLocal.aula_id"
                            class="select select-bordered w-full"
                            :disabled="!aulas.length"
                        >
                            <option value="" disabled>
                                {{
                                    aulas.length
                                        ? "Seleccione Aula"
                                        : "Cargando aula..."
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
                            v-model="recursoLocal.nombre"
                            placeholder="nombre"
                            class="input input-bordered input-success w-full"
                        />
                        <input
                            v-model="recursoLocal.cantidad"
                            placeholder="marca"
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

import type { Recursos, ListRecursos } from "../../../types/InterfaceAulas";
import { useRecursosStore } from "../../../store/recursosStore";
import { useAulaStore } from "../../../store/aulaStore";

export default defineComponent({
    name: "FormModalRecursos",
    components: {
        FormModal,
    },
    props: {
        recursoEditar: {
            type: Object as () => Recursos | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["guardar", "update:showModal"],

    setup(props, { emit }) {
        const { recursoEditar, showModal } = toRefs(props);
        const wizardModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const recursoLocal = ref<Recursos>({
            id: 0,
            aula_id: 0,
            nombre: "",
            cantidad: 0,
        });

        const modoEdicion = computed(() => !!recursoEditar.value);
        const aulas = computed(() => aula_store.aula);

        const resetForm = () => {
            recursoLocal.value = {
                id: 0,
                aula_id: 0,
                nombre: "",
                cantidad: 0,
            };
        };

        /* listar el id y nombre de admision */
        const aula_store = useAulaStore();

        const updateRecursoLocal = () => {
            try {
                if (recursoEditar.value) {
                    const recursos = JSON.parse(
                        JSON.stringify(recursoEditar.value),
                    );

                    recursoLocal.value = recursos;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar el recurso: ", error);
            }
        };

        watch(() => recursoEditar.value, updateRecursoLocal, {
            immediate: true,
            deep: true,
        });

        const guardarRecurso = () => {
            try {
                const recursos = JSON.parse(JSON.stringify(recursoLocal.value));

                emit("guardar", recursos);
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
                    updateRecursoLocal(); // Copia los datos al formulario después de cargar
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
            (wizardModal.value as any).openModal();
        };

        const cerrarModal = () => {
            if (wizardModal.value) {
                (wizardModal.value as any).closedModal();
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

            cargarDatos,
            modoEdicion,
            updateRecursoLocal,

            guardarRecurso,
            wizardModal,
            isReady,
            recursoLocal,
        };
    },
});
</script>
