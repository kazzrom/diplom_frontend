<script setup>
import { useGroupListStore } from "@/stores/groupList.js";
import { storeToRefs } from "pinia";
import Toolbar from "primevue/toolbar";

const { openStudentForm, onToggle } = useGroupListStore();
const { selectedColumns, studentColumns } = storeToRefs(useGroupListStore());
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
      <MultiSelect
        :model-value="selectedColumns"
        :options="studentColumns"
        optionLabel="header"
        @update:model-value="onToggle"
        :max-selected-labels="3"
        placeholder="Выберите столбцы"
      />
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search"> </InputIcon>
        <InputText placeholder="Поиск" />
      </IconField>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex justify-between items-center 
  bg-white h-16 px-20;
}
</style>
