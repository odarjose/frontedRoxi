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
            label="Agregar Equipo"
            customClass="btn-success"
            color="bg-green-500"
            text-color="text-black"
            :size="{ base: 'sm', sm: 'md', md: 'lg', lg: 'md' }"
            @open-modal="openModal"
        />
    </div>
    <TableEquipos />
</template>

<script setup>
import TableEquipos from "./components/TableEquipos.vue";
import Button from "@/components/Button/ButtonComponnet.vue";
</script>
