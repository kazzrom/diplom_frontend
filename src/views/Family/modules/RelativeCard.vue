<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { ACTIONS } from "@/constants";
import { useFamilySectionStore } from "../stores/family.js";

const props = defineProps(["familyMember"]);

const store = useFamilySectionStore();
const { confirmDeleteRelative } = store;
const {
  dialog,
  familyMember: editedFamilyMember,
  isSubmit,
} = storeToRefs(store);

const familyMember = ref(props.familyMember);

const isEditing = ref(false);

function openEditDialog() {
  editedFamilyMember.value = { ...familyMember.value };
  isSubmit.value = true;
  isEditing.value = true;
  dialog.value.openDialog(ACTIONS.EDIT);
}

watch(editedFamilyMember, (newRelative) => {
  if (dialog.value.action === ACTIONS.EDIT && isEditing.value) {
    familyMember.value = newRelative;
  }
});
</script>

<template>
  <div class="form_wrapper">
    <div class="mini_menu">
      <Button
        icon="pi pi-pencil"
        title="Редактировать информацию о родственнике"
        text
        rounded
        @click="openEditDialog"
      />
      <Button
        icon="pi pi-trash"
        title="Удалить родственника"
        text
        rounded
        @click="confirmDeleteRelative(familyMember.id)"
      />
    </div>
    <h4 class="font-bold mb-5">{{ familyMember.relation }}</h4>
    <div class="form">
      <div class="input-text">
        <label for="surname">Фамилия</label>
        <InputText id="surname" v-model="familyMember.surname" readonly />
      </div>
      <div class="input-text">
        <label for="name">Имя</label>
        <InputText id="name" v-model="familyMember.name" readonly />
      </div>
      <div class="input-text">
        <label for="patronymic">Отчество</label>
        <InputText id="patronymic" v-model="familyMember.patronymic" readonly />
      </div>
      <div class="input-text">
        <label for="phoneNumber">Номер телефона</label>
        <InputMask
          id="phoneNumber"
          mask="+7 999 999-99-99"
          v-model="familyMember.MemberPersonalDatum.phoneNumber"
          readonly
        />
      </div>
      <div class="input-text">
        <label for="workplace">Место работы</label>
        <InputText
          id="workplace"
          v-model="familyMember.MemberPersonalDatum.workplace"
          readonly
        />
      </div>
      <div class="input-text">
        <label for="post">Должность</label>
        <InputText
          id="post"
          v-model="familyMember.MemberPersonalDatum.post"
          readonly
        />
      </div>
      <div class="input-text">
        <label for="residentialAddress">Адрес</label>
        <InputText
          id="residentialAddress"
          v-model="familyMember.MemberPersonalDatum.residentialAddress"
          readonly
        />
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
