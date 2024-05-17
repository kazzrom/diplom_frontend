<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGeneralInformationStore } from "../GeneralInformation/stores/generalInformation.js";
import ProfileNavbar from "./modules/ProfileNavbar.vue";
import ViewHeader from "@/components/ViewHeader.vue";

const route = useRoute();
const studentId = route.params.id;

onMounted(async () => await fetchStudent(studentId));

const store = useGeneralInformationStore();
const { fetchStudent } = store;
</script>

<template>
  <div class="wrapper">
    <ViewHeader>Профиль студента</ViewHeader>
    <ProfileNavbar />
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  @apply flex flex-col;
}
</style>
