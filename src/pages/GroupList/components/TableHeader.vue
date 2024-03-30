<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <div class="bg-white flex justify-between items-center h-16 px-[80px]">
    <div class="flex justify-between items-center gap-[30px]">
      <h3 class="text-2xl font-medium">403 ИСП</h3>
      <ButtonGroup>
        <Button
          icon="pi pi-user-plus"
          iconPos="right"
          severity="secondary"
          aria-label="Добавить обучающегося"
          @click="store.commit('showDialog')"
        />
        <Button
          icon="pi pi-user-minus"
          iconPos="right"
          severity="secondary"
          aria-label="Удалить обучающегося"
        />
      </ButtonGroup>
    </div>
    <div class="flex justify-between items-center gap-[40px]">
      <MultiSelect placeholder="Выберите столбцы" />
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search"> </InputIcon>
        <InputText placeholder="Поиск" />
      </IconField>
    </div>
  </div>
</template>
