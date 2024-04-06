<script setup>
import { useGroupListStore } from "@/stores/groupList.js";

const { openStudentForm } = useGroupListStore();
</script>

<template>
  <div class="wrapper">
    <div class="flex justify-between items-center gap-8">
      <h3 class="text-2xl font-medium">403 ИСП</h3>
      <ButtonGroup>
        <Button
          icon="pi pi-user-plus"
          iconPos="right"
          severity="secondary"
          aria-label="Добавить обучающегося"
          @click="openStudentForm"
        />
        <Button
          icon="pi pi-user-minus"
          iconPos="right"
          severity="secondary"
          aria-label="Удалить обучающегося"
        />
      </ButtonGroup>
    </div>
    <div class="flex justify-between items-center gap-8">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex justify-between items-center 
  bg-white h-16 px-20;
}
</style>
