<template>
    <dialog
        ref="modal"
        class="modal w-full max-w-3xl mx-auto p-4"
        :open="isOpen"
    >
        <div class="modal-box relative">
            <!-- Botón de cierre en la esquina superior derecha -->
            <button
                @click="closeModal"
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <h3 class="text-lg font-bold">{{ title }}</h3>
            <div class="py-4">
                <!-- Renderiza los slots de los diferentes pasos -->
                <slot :current-step="step"></slot>
            </div>
            <div class="modal-action">
                <!-- Botón de anterior -->
                <button v-if="step > 1" @click="prevStep" class="btn">
                    Anterior
                </button>

                <!-- Botón de siguiente -->
                <button
                    v-if="step < totalSteps"
                    @click="nextStep"
                    class="btn btn-primary"
                >
                    Siguiente
                </button>

                <!-- Botón de guardar -->
                <button
                    v-if="step === totalSteps"
                    @click="handleSave"
                    class="btn btn-success"
                >
                    {{ saveButtonText }}
                </button>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        title: String,
        totalSteps: {
            type: Number,
            required: true,
        },
        saveButtonText: {
            type: String,
            default: "Guardar",
        },
    },
    data() {
        return {
            step: 1, // Controla el paso actual
        };
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.$refs.modal.showModal();
            } else {
                this.$refs.modal.close();
            }
        },
    },
    methods: {
        nextStep() {
            if (this.step < this.totalSteps) this.step++;
        },
        prevStep() {
            if (this.step > 1) this.step--;
        },
        openModal() {
            this.$refs.modal.showModal();
            this.$emit("update:isOpen", true);
        },
        closeModal() {
            this.$refs.modal.close();
            this.$emit("update:isOpen", false);
        },
        handleSave() {
            this.$emit("save"); // Lanza un evento cuando se presiona el botón de guardar
            this.closeModal(); // Cierra el modal
        },
    },
};
</script>
