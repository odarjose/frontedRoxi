<!-- CustomButton.vue -->
<template>
    <button :class="buttonClasses" type="button" @click="handleClick">
        <span v-if="icon" class="mr-2">
            <i :class="icon"></i>
        </span>
        {{ text }}
    </button>
</template>

<script>
export default {
    name: "CustomButton",
    props: {
        text: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: "bg-slate-800 text-white", // Color por defecto
        },
        size: {
            type: String,
            default: "py-2.5 px-3", // Tamaño por defecto
        },
        icon: {
            type: String,
            default: null, // Icono por defecto
        },
    },
    computed: {
        buttonClasses() {
            return `${this.color} ${this.size} rounded transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`;
        },
    },
    methods: {
        handleClick() {
            this.$emit("click");
        },
    },
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
