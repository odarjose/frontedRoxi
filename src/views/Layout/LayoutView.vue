<script setup>
import SidebarComponent from "@/components/Sidebar/SidebarComponent.vue";
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import { ref } from "vue";
import { RouterView } from "vue-router";

// Estado para el control del sidebar (si es necesario compartirlo entre componentes)
const isSidebarOpen = ref(false);
</script>

<template>
    <div class="flex bg-gray-200">
        <SidebarComponent :isSidebarOpen="isSidebarOpen" />

        <div class="flex-1 bg-gray-200">
            <HeaderComponent :isSidebarOpen="isSidebarOpen" />
            <main class="ml-16 flex-1 bg-gray-200 overflow-auto">
                <RouterView></RouterView>
            </main>
        </div>
    </div>
</template>

<style scoped>
/* Estilos específicos del layout */
</style>
