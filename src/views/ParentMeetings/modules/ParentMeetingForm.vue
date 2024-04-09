<script setup>
import Editor from "primevue/editor";
import { useParentMeetingsStore } from "@/stores/parentMeetings";
import { storeToRefs } from "pinia";

const store = useParentMeetingsStore();

const { closeParentMeetingForm } = store;

const { parentMeeting } = storeToRefs(store);
</script>

<template>
  <div class="wrapper">
    <h3 class="mb-5">Добавление родительского собрания</h3>
    <div class="form_items">
      <div class="form_left_part">
        <div class="form_item">
          <label for="date">Дата</label>
          <Calendar id="date" v-model="parentMeeting.date" />
        </div>
        <div class="form_item">
          <label for="theme">Тема</label>
          <InputText id="theme" v-model="parentMeeting.theme" />
        </div>
        <div class="form_item">
          <label for="present">Присутствовали</label>
          <InputText id="present" />
        </div>
        <div class="form_item">
          <label for="absent">Отсутствовали</label>
          <InputText id="absent" />
        </div>
      </div>
      <div class="form_item">
        <label for="content">Повестка</label>
        <Editor id="content" editorStyle="height: 300px;" />
      </div>
    </div>
    <div class="form_buttons">
      <Button
        @click="closeParentMeetingForm"
        label="Добавить"
        icon="pi pi-plus"
        iconPos="right"
      />
      <Button
        @click="closeParentMeetingForm"
        label="Отмена"
        severity="secondary"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col gap-7 p-10
  bg-white;
}

.form_items {
  @apply flex flex-row gap-10;
}

.form_left_part {
  @apply flex flex-col gap-5;
}

.form_item {
  @apply flex flex-col gap-2;
}

/* .form_item label {
  @apply text-xl font-bold;
} */

.form_buttons {
  @apply flex flex-row justify-end gap-5;
}
</style>
