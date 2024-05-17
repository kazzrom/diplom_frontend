<script setup>
import { useGeneralInformationStore } from "../stores/generalInformation.js";
import { storeToRefs } from "pinia";
import { exportToStudentInDOCX } from "../utils/export.js";

const { student } = storeToRefs(useGeneralInformationStore());
</script>

<template>
  <div class="wrapperr">
    <div class="card_wrapper">
      <div class="avatar"></div>
      <h4>{{ student.surname }} {{ student.name }}</h4>
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
  flex flex-col justify-center items-center gap-7 px-[70px] py-[50px];
}
.avatar {
  @apply w-[200px] h-[200px] bg-slate-500 rounded-full;
}

.card_wrapper {
  @apply text-center;
}
</style>
