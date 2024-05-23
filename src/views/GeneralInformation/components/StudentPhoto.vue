<script setup>
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "@/constants";
import { useGeneralInformationStore } from "../stores/generalInformation.js";
import { storeToRefs } from "pinia";
import { exportToStudentInDOCX } from "../utils/export.js";
import { useToastStore } from "@/stores/toasts";
import FileUpload from "primevue/fileupload";
import { useRoute } from "vue-router";

const route = useRoute();

const { student } = storeToRefs(useGeneralInformationStore());
const { successToast } = useToastStore();

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const IMAGE_API = `${API_URL}/images/upload/${route.params.id}`;

function sendFile({ xhr, _ }) {
  student.value.PersonalDatum.image = null;
  successToast("Файл успешно загружен");
  const response = JSON.parse(xhr.response);
  student.value.PersonalDatum.image = response.file;
}
</script>

<template>
  <div class="wrapperr">
    <div class="card_wrapper">
      <div class="avatar">
        <img
          v-if="student.PersonalDatum.image"
          :src="`${API_URL}/${student.PersonalDatum.image}`"
        />
        <img v-else src="@/assets/images/default_avatar.png" />
      </div>
      <h4>{{ student.surname }} {{ student.name }}</h4>
      <FileUpload
        chooseLabel="Изменить фото"
        mode="basic"
        name="file"
        :url="IMAGE_API"
        accept="image/png, image/jpeg, image/jpg"
        :maxFileSize="MAX_FILE_SIZE"
        @upload="sendFile"
      />
    </div>

    <Button
      @click="exportToStudentInDOCX(student)"
      label="Экспорт в DOCX"
      severity="info"
      icon="pi pi-file-word"
      iconPos="right"
    />
  </div>
</template>

<style scoped>
.wrapperr {
  @apply flex flex-col gap-3;
}
.card_wrapper {
  @apply border border-solid border-slate-400 rounded-2xl
  flex flex-col justify-center items-center gap-7 px-[70px] py-[30px];
}
.avatar {
  @apply w-[200px] h-[200px] rounded-full
  flex justify-center items-center
  overflow-hidden;
}

.avatar img {
  @apply w-full h-full object-cover;
}

.card_wrapper {
  @apply text-center;
}
</style>
