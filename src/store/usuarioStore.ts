import { defineStore } from "pinia";
import { ref } from "vue";

import type { Usuario } from "../types/InterfaceUsuarios";
import usuarioService from "../service/usuarioService";

/* store */
export const useUsuarioStore = defineStore("usuario", () => {
  const usuario = ref<Usuario[]>([]);

  // listar examenes
  const ListarUsuarios = async () => {
    usuario.value = await usuarioService.getUsuario();
  };

  // insert examen
  const AddUsuario = async (nuevousuario: Usuario) => {
    await usuarioService.addUsuario(nuevousuario);
    await ListarUsuarios();
  };

  const UpdatUsuario = async (actualizarusuario: Usuario) => {
    await usuarioService.updateUsuario(actualizarusuario);
    await ListarUsuarios();
  };

  return {
    usuario,
    ListarUsuarios,
    AddUsuario,
    UpdatUsuario,
  };
});
