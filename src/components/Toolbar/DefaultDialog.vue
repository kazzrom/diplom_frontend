<script setup>
import { ref } from "vue";
import { ACTIONS } from "@/constants";

const props = defineProps({
  dialog: {
    type: Object,
  },
  addItem: {
    type: Function,
    default: () => {},
  },
  editItem: {
    type: Function,
    default: () => {},
  },
  cancelDialog: {
    type: Function,
  },
});

function addItem() {
  props.addItem();
  props.dialog.closeDialog();
}

function editItem() {
  props.editItem();
}

function cancelDialog() {
  props.cancelDialog();
  props.dialog.closeDialog();
}
</script>

<template>
  <Dialog
    class="p-5"
    modal
    v-model:visible="props.dialog.isShowDialog"
    :header="props.dialog.currentHeader"
    :closable="props.dialog.action === ACTIONS.VIEW"
  >
    <slot :dialog="props.dialog"></slot>
    <div class="buttons">
      <Button
        v-show="props.dialog.action === ACTIONS.ADD"
        label="Добавить"
        @click="addItem"
      />
      <Button
        v-show="props.dialog.action === ACTIONS.EDIT"
        label="Сохранить"
        @click="editItem"
      />
      <Button
        v-show="props.dialog.action !== ACTIONS.VIEW"
        label="Отмена"
        severity="secondary"
        @click="cancelDialog"
      />
    </div>
  </Dialog>
</template>

<style scoped>
.buttons {
  @apply flex justify-end mt-10 gap-3;
}
</style>

<style scoped></style>
