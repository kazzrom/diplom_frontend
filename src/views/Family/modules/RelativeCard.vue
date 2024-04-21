<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { ACTIONS } from "@/constants";
import { useFamilySectionStore } from "../stores/family.js";

const props = defineProps(["relative"]);
const route = useRoute();

const store = useFamilySectionStore();
const { confirmDeleteRelative } = store;
const { dialog, relative: editedRelative, isSubmit } = storeToRefs(store);

const relative = ref(props.relative);

const isEditing = ref(false);

function openEditDialog() {
  editedRelative.value = { ...relative.value };
  isSubmit.value = true;
  isEditing.value = true;
  dialog.value.openDialog(ACTIONS.EDIT);
}

watch(editedRelative, (newRelative) => {
  if (dialog.value.action === ACTIONS.EDIT && isEditing.value) {
    relative.value = newRelative;
  }
});
</script>

<template>
  <div class="form_wrapper">
    <div class="mini_menu">
      <Button icon="pi pi-pencil" text rounded @click="openEditDialog" />
      <Button
        icon="pi pi-trash"
        text
        rounded
        @click="confirmDeleteRelative(relative.id)"
      />
    </div>
    <h4 class="font-bold mb-5">{{ relative.kinship }}</h4>
    <div class="form">
      <div class="input-text">
        <label for="surname">Фамилия</label>
        <InputText id="surname" v-model="relative.surname" readonly />
      </div>
      <div class="input-text">
        <label for="name">Имя</label>
        <InputText id="name" v-model="relative.name" readonly />
      </div>
      <div class="input-text">
        <label for="patronymic">Отчество</label>
        <InputText id="patronymic" v-model="relative.patronymic" readonly />
      </div>
      <div class="input-text">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          id="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="relative.phoneNumber"
          readonly
        />
      </div>
      <div class="input-text">
        <label for="workplace">Место работы</label>
        <InputText id="workplace" v-model="relative.workplace" readonly />
      </div>
      <div class="input-text">
        <label for="post">Должность</label>
        <InputText id="post" v-model="relative.post" readonly />
      </div>
    </div>
  </div>
</template>

<style scoped>
.form_wrapper {
  @apply flex flex-col relative
  border border-solid border-slate-300 rounded-md
  px-10 pt-8 pb-10
  bg-white;
}

.mini_menu {
  @apply absolute top-3 right-3 flex flex-row;
}

.form {
  @apply grid grid-cols-3 gap-5;
}

.input-text {
  @apply flex flex-col gap-2 w-[260px];
}

.input-text label {
  @apply font-bold;
}
</style>
