<template>
    <button
        :class="[
            'btn',
            buttonClass,
            responsiveSizeClass,
            tailwindClasses,
            'mr-5',
            'flex',
            'items-center',
        ]"
        @click="handleClick"
    >
        <i v-if="icon" :class="[icon, iconSizeClass, 'mr-2']"></i>
        {{ label }}
    </button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "Button",
        },
        customClass: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "bg-green-500",
        },
        textColor: {
            type: String,
            default: "text-white",
        },
        size: {
            type: Object,
            default: () => ({ base: "sm", sm: "sm", md: "md", lg: "lg" }),
        },
        icon: {
            type: String,
            default: "",
        },
        iconSize: {
            type: String,
            default: "",
        },
    },
    methods: {
        handleClick() {
            // Emitimos un evento para abrir el modal
            this.$emit("open-modal");
        },
    },
    computed: {
        responsiveSizeClass() {
            return {
                [`btn-${this.size.base}`]: true,
                [`sm:btn-${this.size.sm}`]: this.size.sm,
                [`md:btn-${this.size.md}`]: this.size.md,
                [`lg:btn-${this.size.lg}`]: this.size.lg,
            };
        },
        tailwindClasses() {
            return `${this.color} ${this.textColor}`;
        },
        buttonClass() {
            return this.customClass;
        },
        iconSizeClass() {
            return this.iconSize || `fa-${this.size.base}`;
        },
    },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
