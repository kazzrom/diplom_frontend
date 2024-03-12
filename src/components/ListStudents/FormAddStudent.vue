<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<template>
  <div class="wrapper grid grid-cols-3 gap-5">
    <div class="flex flex-col">
      <label for="surname">Фамилия</label>
      <InputText id="surname" />
    </div>
    <div class="flex flex-col">
      <label for="surname">Имя</label>
      <InputText id="surname" />
    </div>
    <div class="flex flex-col">
      <label for="surname">Отчество</label>
      <InputText id="surname" />
    </div>
    <div class="flex flex-col">
      <label for="surname">Домашний адрес</label>
      <InputText id="surname" />
    </div>
    <div class="flex flex-col">
      <label for="surname">Номер телефона</label>
      <InputText id="surname" />
    </div>
    <div class="flex flex-col">
      <label for="surname">Дата рождения</label>
      <InputText id="surname" />
    </div>
    <div class="flex flex-col">
      <label for="surname">Табельный номер</label>
      <InputText id="surname" />
    </div>
    <div class="flex flex-col">
      <label for="surname">СНИЛС</label>
      <InputText id="surname" />
    </div>
    <div class="flex flex-col">
      <label for="surname">Мед. полис</label>
      <InputText id="surname" />
    </div>
    <div class="col-span-3 flex justify-end gap-2 mt-5">
      <Button label="Добавить" icon="pi pi-user-plus" iconPos="right" />
      <Button
        label="Отмена"
        icon="pi pi-times"
        iconPos="right"
        severity="secondary"
        @click="store.commit('closeDialog')"
      />
    </div>
  </div>
</template>
