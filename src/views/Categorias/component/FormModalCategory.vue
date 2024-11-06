<template>
    <div>
        <FormModal
            ref="wizarModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion
                    ? 'Editar Categoria'
                    : 'Registrar un nueva categoria'
            "
            @save="guardarCategoria"
        >
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del la categoria
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            v-model="categoriaLocal.nombre"
                            placeholder="nombre"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="categoriaLocal.descripcion"
                            placeholder="descripcion"
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

import type { Categorias } from "../../../types/InterfaceEquipos";
import { useCategoriaStore } from "../../../store/categoriaStore";

export default defineComponent({
    name: "ModalFormAulas",
    components: {
        FormModal,
    },
    props: {
        categoriaEditar: {
            type: Object as () => Categorias | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { categoriaEditar, showModal } = toRefs(props);
        const wizarModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const categoriaLocal = ref<Categorias>({
            id: 0,
            nombre: "",
            descripcion: "",
        });

        const categoria_store = useCategoriaStore();

        const modoEdicion = computed(() => !!categoriaEditar.value);
        const categorias = computed(() => categoria_store.categoria);

        const resetForm = () => {
            categoriaLocal.value = {
                id: 0,
                nombre: "",
                descripcion: "",
            };
        };

        const updateCategoriaLocal = () => {
            try {
                if (categoriaEditar.value) {
                    const categoria = JSON.parse(
                        JSON.stringify(categoriaEditar.value),
                    );

                    categoriaLocal.value = categoria;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar la categoria: ", error);
            }
        };

        watch(() => categoriaEditar.value, updateCategoriaLocal, {
            immediate: true,
            deep: true,
        });

        const guardarCategoria = () => {
            try {
                const categoria = JSON.parse(
                    JSON.stringify(categoriaLocal.value),
                );
                emit("guardar", categoria);
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
                await categoria_store.ListarCategorias();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await categoria_store.ListarCategorias();

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
            categoria_store.ListarCategorias();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,
            categorias,
            modoEdicion,
            updateCategoriaLocal,
            guardarCategoria,
            wizarModal,
            categoria_store,
            isReady,
            categoriaLocal,
        };
    },
});
</script>
