<script setup>
import { useCounterStore } from "@/stores/counter.js";
import Dialog from "primevue/dialog";
import DialogForm from "@/utils/dialog.js";
import { computed, ref } from "vue";
import { ACTIONS } from "@/constants";
const { getCounter, increment } = useCounterStore();
const counter = getCounter;

const formHeaders = {
  add: "Добавление",
  edit: "Изменение",
  view: "Просмотр",
};
const dialogForm = ref(new DialogForm(formHeaders));

const multiple = (num) => num * counter.value;
</script>

<template>
  <div class="flex flex-col justify-start">
    <Dialog
      v-model:visible="dialogForm.isShowDialog"
      modal
      :header="dialogForm.currentHeaderForm"
    >
      <Button v-if="dialogForm.action === ACTIONS.ADD" label="Добавить" />
      <Button
        v-else-if="dialogForm.action === ACTIONS.EDIT"
        label="Редактировать"
      />
      <Button label="Выйти" @click="dialogForm.closeDialog()" />
    </Dialog>
    <h1 class="text-3xl font-bold m-2">{{ counter }}</h1>
    <h1 class="text-3xl font-bold m-2">{{ multiple(10) }}</h1>
    <Button label="Клик" @click="increment" />
    <Button label="Показать" @click="dialogForm.openDialog(ACTIONS.EDIT)" />
    {{ dialogForm.action }}
  </div>
</template>
