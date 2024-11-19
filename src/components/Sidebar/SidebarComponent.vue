<script setup>
import { ref } from "vue";
import {
    Home,
    Users,
    Moon,
    Sun,
    Wrench,
    ChevronFirst,
    Computer,
    MessageCircle,
    DoorOpen,
    BookOpenCheck,
    ClipboardPenLine,
    Receipt,
    User,
    Boxes,
} from "lucide-vue-next";
import { useRouter } from "vue-router";

// Estado reactivo
const isSidebarOpen = ref(false);
const isDark = ref(false);

// Definición de items del menú
const menuItems = [
    { icon: Home, text: "Dashboard", link: "/" },
    { icon: Users, text: "Docentes", link: "/docentes" },
    { icon: ClipboardPenLine, text: "Asignaciones", link: "/asignaciones" },
    { icon: BookOpenCheck, text: "Reservas", link: "/reservas" },
    { icon: Computer, text: "Equipos", link: "/equipos" },
    { icon: Boxes, text: "Categorias", link: "/categorias" },
    { icon: Wrench, text: "Mantenimiento", link: "/mantenimiento" },
    { icon: Receipt, text: "Prestamos", link: "/prestamos" },
    { icon: DoorOpen, text: "Aulas", link: "/aulas" },
    { icon: User, text: "Usuarios", link: "/usuarios" },
    { icon: MessageCircle, text: "Notificaciones", link: "/settings" },
];

// Métodos
const setDark = (val) => {
    isDark.value = val === "dark";
    if (isDark.value) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
};
const openNav = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
    <aside
        class="w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]"
        :class="{
            '-translate-x-48': !isSidebarOpen,
            'translate-x-none': isSidebarOpen,
        }"
    >
        <!-- Toolbar -->
        <div
            class="max-toolbar w-full transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12"
            :class="{
                'translate-x-24 scale-x-0': !isSidebarOpen,
                'translate-x-0': isSidebarOpen,
            }"
        >
            <div class="flex pl-4 items-center space-x-2">
                <div>
                    <Moon
                        v-show="!isDark"
                        @click="setDark('dark')"
                        class="cursor-pointer text-white hover:text-blue-500 dark:hover:text-[#38BDF8]"
                        size="20"
                    />
                    <Sun
                        v-show="isDark"
                        @click="setDark('light')"
                        class="cursor-pointer text-white hover:text-blue-500 dark:hover:text-[#38BDF8]"
                        size="20"
                    />
                </div>
            </div>
        </div>

        <!-- Max Sidebar -->
        <div
            class="max text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]"
            v-show="isSidebarOpen"
        >
            <div class="flex flex-col space-y-2 p-4">
                <router-link
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :to="item.link"
                    class="flex items-center space-x-2 p-2 hover:bg-[#38BDF8] rounded-md cursor-pointer transition-colors duration-200"
                >
                    <component :is="item.icon" size="20" />
                    <span class="text-sm font-medium">{{ item.text }}</span>
                </router-link>
            </div>
        </div>

        <!-- Mini Sidebar -->
        <div
            class="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]"
            v-show="!isSidebarOpen"
        >
            <div class="flex flex-col items-center space-y-2 p-4">
                <router-link
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :to="item.link"
                    class="p-2 hover:bg-[#38BDF8] rounded-md cursor-pointer transition-colors duration-200"
                >
                    <component :is="item.icon" size="20" />
                </router-link>
            </div>
        </div>

        <!-- Toggle Button -->
        <div
            @click="openNav"
            class="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45"
        >
            <ChevronFirst size="20" />
        </div>
    </aside>
</template>

<style scoped>
.hover\:rotate-45:hover {
    transform: rotate(45deg);
}
</style>
