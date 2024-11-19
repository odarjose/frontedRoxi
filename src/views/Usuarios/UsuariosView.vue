<template>
    <div class="flex justify-end pt-4">
        <Button
            text="IMPORTAR"
            color="border border-slate-300 text-slate-600"
            size="py-2.5 px-3 mr-3 rounded-full text-xs font-bold"
        />
        <Button
            text="AGREGAR USUARIOS"
            color="bg-cyan-300 text-gray-800 hover:text-black hover:bg-green-200"
            size="py-2.5 px-4 mr-3 rounded-full text-justify text-xs font-bold"
            icon="fas fa-user-plus"
            @click="openModal"
        />
    </div>
    <FormModalUsuarios
        v-if="showModal"
        :key="modalKey"
        :usuario-editar="usuarioEditar"
        :show-modal="showModal"
        @update:show-modal="showModal = $event"
        @guardar="onGuardar"
        ref="modal"
    />
    <TableUsuarios @editar-usuario="editarUsuario" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Button from "../../components/Button/ButtonComponnet.vue";
import TableUsuarios from "./components/TableUsuarios.vue";
import FormModalUsuarios from "./components/FormModalUsuarios.vue";

import { useUsuarioStore } from "../../store/usuarioStore";
import type { Usuario } from "../../types/InterfaceUsuarios";

export default defineComponent({
    name: "UsuariosView",
    components: {
        TableUsuarios,
        Button,
        FormModalUsuarios,
    },
    setup() {
        const usuarioStore = useUsuarioStore();
        const modal = ref(null);
        const showModal = ref(false);
        const modalKey = ref(0);
        const usuarioEditar = ref<Usuario | null>(null);

        const openModal = () => {
            usuarioEditar.value = null;
            showModal.value = true;
            modalKey.value++;
        };
        const closeModal = () => {
            showModal.value = false;
            usuarioEditar.value = null;
        };

        const editarUsuario = (usuario: Usuario) => {
            usuarioEditar.value = JSON.parse(JSON.stringify(usuario));
            showModal.value = true;
            modalKey.value++;
        };

        const onGuardar = async (usuario: Usuario) => {
            try {
                if (usuario.id) {
                    await usuarioStore.UpdatUsuario(usuario);
                } else {
                    await usuarioStore.AddUsuario(usuario);
                }
                closeModal();
                await usuarioStore.ListarUsuarios();
            } catch (error) {
                console.error("Error al registrar al usuario: ", error);
            }
        };

        onMounted(async () => {
            try {
                await usuarioStore.ListarUsuarios();
            } catch (error) {
                console.error("Error al cargar los examenes");
            }
        });
        return {
            modal,

            showModal,
            modalKey,
            usuarioEditar,
            openModal,
            editarUsuario,
            onGuardar,
        };
    },
});
</script>
