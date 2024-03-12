<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <div class="bg-white flex justify-between items-center h-[100px] px-[35px]">
    <div class="flex justify-between items-center gap-[30px]">
      <h2 class="text-4xl font-medium">Список группы</h2>
      <ButtonGroup>
        <Button
          icon="pi pi-user-plus"
          severity="secondary"
          aria-label="Добавить обучающегося"
          @click="store.commit('showDialog')"
        />
        <Button
          icon="pi pi-user-minus"
          severity="secondary"
          aria-label="Удалить обучающегося"
        />
      </ButtonGroup>
    </div>
    <div class="flex justify-between items-center gap-[40px]">
      <MultiSelect class="w-[350px]" placeholder="Выберите столбцы" />
      <InputGroup class="w-[350px]">
        <InputGroupAddon>
          <i class="pi pi-search" />
        </InputGroupAddon>
        <InputText placeholder="Поиск" />
      </InputGroup>
    </div>
  </div>
</template>
