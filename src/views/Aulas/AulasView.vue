<template>
    <div class="flex justify-end pt-4">
        <Button
            label="Importar"
            customClass="btn-info"
            color=""
            text-color="text-black"
            icon="fa-solid fa-file-import"
            :size="{ base: 'sm', sm: 'md', md: 'lg', lg: 'md' }"
        />
        <Button
            label="Agregar Aulas"
            customClass="btn-success"
            color="bg-green-500"
            text-color="text-black"
            :size="{ base: 'sm', sm: 'md', md: 'lg', lg: 'md' }"
            @open-modal="openModal"
        />
    </div>
    <TableAulas />
</template>

<script setup>
import TableAulas from "./components/TableAulas.vue";
import Button from "@/components/Button/ButtonComponnet.vue";
</script>
