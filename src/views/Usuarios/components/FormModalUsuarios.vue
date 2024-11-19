<template>
    <div>
        <FormModal
            ref="wizarModal"
            :isOpen="showModal"
            @update:isOpen="$emit('update:showModal', $event)"
            :totalSteps="1"
            :title="
                modoEdicion ? 'Editar Usuario' : 'Registrar un nuevo usuario'
            "
            @save="guardarAula"
        >
            <template #default="{ currentStep }">
                <div v-if="currentStep === 1">
                    <h4 class="text-md font-semibold mb-4">
                        Información del Usuario
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            v-model="usuarioLocal.usuario"
                            placeholder="usuario"
                            class="input input-bordered input-success w-full"
                        />

                        <input
                            v-model="usuarioLocal.contraseña"
                            placeholder="contraseña"
                            type="password"
                            class="input input-bordered input-success w-full"
                        />

                        <select
                            v-model="usuarioLocal.rol"
                            class="select select-bordered w-full"
                        >
                            <option value="" disabled selected>ROl</option>
                            <option>administrador</option>
                            <option>docente</option>
                            <option>personal_administrativo</option>
                        </select>
                        <select
                            v-model="usuarioLocal.estado"
                            class="select select-bordered w-full"
                        >
                            <option value="" disabled selected>Estado</option>
                            <option>activo</option>
                            <option>inactivo</option>
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

import type { Usuario } from "../../../types/InterfaceUsuarios";
import { useUsuarioStore } from "../../../store/usuarioStore";

export default defineComponent({
    name: "ModalFormAulas",
    components: {
        FormModal,
    },
    props: {
        usuarioEditar: {
            type: Object as () => Usuario | null,
            default: null,
        },
        showModal: {
            type: Boolean,
            default: false,
        },
    },

    emits: ["guardar", "update:showModal"],
    setup(props, { emit }) {
        const { usuarioEditar, showModal } = toRefs(props);
        const wizarModal = ref(null);
        const isReady = ref(false);
        const dataCargada = ref(false);
        const usuarioLocal = ref<Usuario>({
            id: 0,
            usuario: "",
            contraseña: "",
            estado: "",
            rol: "",
        });

        const modoEdicion = computed(() => !!usuarioEditar.value);
        const usuario_store = useUsuarioStore();
        const resetForm = () => {
            usuarioLocal.value = {
                id: 0,
                usuario: "",
                contraseña: "",
                estado: "",
                rol: "",
            };
        };

        const updateAulaLocal = () => {
            try {
                if (usuarioEditar.value) {
                    const examen = JSON.parse(
                        JSON.stringify(usuarioEditar.value),
                    );

                    usuarioLocal.value = examen;
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error al actualizar el examen: ", error);
            }
        };

        watch(() => usuarioEditar.value, updateAulaLocal, {
            immediate: true,
            deep: true,
        });

        const guardarAula = () => {
            try {
                const examen = JSON.parse(JSON.stringify(usuarioLocal.value));
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
                await usuario_store.ListarUsuarios();
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        };

        const openModal = async () => {
            await nextTick();
            if (!dataCargada.value) {
                await usuario_store.ListarUsuarios();

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
            usuario_store.ListarUsuarios();
            await nextTick();
            isReady.value = true;
        });

        return {
            cerrarModal,
            openModal,

            modoEdicion,
            updateAulaLocal,
            guardarAula,
            wizarModal,
            usuario_store,
            isReady,
            usuarioLocal,
        };
    },
});
</script>
