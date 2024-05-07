<script setup>
import { storeToRefs } from "pinia";
import Editor from "primevue/editor";
import { useHomeroomStore } from "../stores/homeroom.js";
import { useCRUDStore } from "../stores/CRUD.js";
import { ACTIONS } from "@/constants";

const homeroomStore = useHomeroomStore();
const { v$ } = homeroomStore;
const { resetHomeroom } = homeroomStore;
const { homeroom } = storeToRefs(homeroomStore);

const crudStore = useCRUDStore();
const { addHomeroom, editHomeroom } = crudStore;
const { dialog } = storeToRefs(crudStore);

function cancelDialog() {
  dialog.value.closeDialog();
  resetHomeroom();
}
</script>

<template>
  <Dialog
    modal
    v-model:visible="dialog.isShowDialog"
    :header="dialog.currentHeader"
    :closable="dialog.action === ACTIONS.VIEW"
  >
    <div class="wrapper">
      <div class="form">
        <div class="form_required_items">
          <div class="form_item">
            <label for="date">Дата</label>
            <Calendar
              id="date"
              v-model="homeroom.meetingDate"
              :invalid="v$.meetingDate.$dirty && v$.meetingDate.$invalid"
              :readonly="dialog.action === ACTIONS.VIEW"
            />
          </div>
          <div class="form_item">
            <label for="theme">Тема</label>
            <InputText
              id="theme"
              v-model="homeroom.theme"
              :invalid="v$.theme.$dirty && v$.theme.$invalid"
              :readonly="dialog.action === ACTIONS.VIEW"
            />
          </div>
          <div class="form_item">
            <label for="location">Место проведения</label>
            <InputText
              id="location"
              v-model="homeroom.location"
              :invalid="v$.location.$dirty && v$.location.$invalid"
              :readonly="dialog.action === ACTIONS.VIEW"
            />
          </div>
          <div class="form_item">
            <label for="numberPeoplePresent">Присутствовало</label>
            <InputNumber
              id="numberPeoplePresent"
              v-model="homeroom.numberPeoplePresent"
              :invalid="
                v$.numberPeoplePresent.$dirty && v$.numberPeoplePresent.$invalid
              "
              :readonly="dialog.action === ACTIONS.VIEW"
            />
          </div>
        </div>
        <div class="form_purpose_tasks">
          <div class="form_item">
            <label for="purpose">Цель</label>
            <InputText
              id="purpose"
              v-model="homeroom.purpose"
              :readonly="dialog.action === ACTIONS.VIEW"
            />
          </div>
          <div class="form_item">
            <label for="tasks">Задачи</label>
            <Editor
              editorStyle="height: 300px;"
              id="tasks"
              v-model="homeroom.tasks"
              :readonly="dialog.action === ACTIONS.VIEW"
            >
              <template #toolbar>
                <span class="ql-formats">
                  <button class="ql-bold" />
                  <button class="ql-italic" />
                  <button class="ql-underline" />
                  <button class="ql-list" value="ordered" />
                </span>
              </template>
            </Editor>
          </div>
        </div>
        <div class="form_last_items">
          <div class="form_item">
            <label for="courseOfMeeting">Ход проведения</label>
            <Editor
              editorStyle="height: 150px"
              id="courseOfMeeting"
              v-model="homeroom.courseOfMeeting"
              :readonly="dialog.action === ACTIONS.VIEW"
            >
              <template #toolbar>
                <span class="ql-formats">
                  <button class="ql-bold" />
                  <button class="ql-italic" />
                  <button class="ql-underline" />
                  <button class="ql-list" value="ordered" />
                </span>
              </template>
            </Editor>
          </div>
          <div class="form_item">
            <label for="results">Итоги</label>
            <Editor
              editorStyle="height: 150px"
              id="results"
              v-model="homeroom.results"
              :readonly="dialog.action === ACTIONS.VIEW"
            >
              <template #toolbar>
                <span class="ql-formats">
                  <button class="ql-bold" />
                  <button class="ql-italic" />
                  <button class="ql-underline" />
                  <button class="ql-list" value="ordered" />
                </span>
              </template>
            </Editor>
          </div>
        </div>
      </div>
      <div class="buttons">
        <Button
          v-show="dialog.action === ACTIONS.ADD"
          label="Добавить"
          @click="addHomeroom"
        />
        <Button
          v-show="dialog.action === ACTIONS.EDIT"
          label="Сохранить"
          @click="editHomeroom"
        />
        <Button
          v-show="dialog.action !== ACTIONS.VIEW"
          label="Отмена"
          severity="secondary"
          @click="cancelDialog"
        />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.buttons {
  @apply flex justify-end mt-10 gap-3;
}

.form {
  @apply grid grid-cols-2 gap-5;
}

.form_item {
  @apply flex flex-col gap-2;
}

.form_item label {
  @apply font-bold;
}

.form_editor {
  @apply form_item;
}

.form_required_items {
  @apply col-span-2 flex flex-row gap-5;
}

.form_purpose_tasks {
  @apply flex flex-col gap-5;
}

.form_last_items {
  @apply flex flex-col gap-5;
}
</style>
