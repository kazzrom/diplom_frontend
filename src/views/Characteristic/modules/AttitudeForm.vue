<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import { useCharacteristicStore } from "../stores/characteristic.js";
import { storeToRefs } from "pinia";

const route = useRoute();

const store = useCharacteristicStore();
const { fetchStudentAttitudes, fetchStudentPersonality, editStudentAttitudes } =
  store;
const { studentAttitudes } = storeToRefs(store);

onMounted(() => {
  fetchStudentAttitudes(route.params.id);
});

const relationships = ref(["Положительные", "Нейтральные", "Негативные"]);
</script>

<template>
  <div class="wrapper">
    <div class="form_item">
      <label for="study">Отношение к учёбе:</label>
      <Textarea
        v-model="studentAttitudes.attitudeToStudy"
        id="study"
        rows="10"
      />
    </div>
    <div class="form_item">
      <label for="elder">Отношение к старшим:</label>
      <Textarea
        v-model="studentAttitudes.attitudeToElders"
        id="elder"
        rows="10"
      />
    </div>
    <div class="form_item">
      <label for="failures">Отношение к своим неудачам в обучении: </label>
      <Textarea
        v-model="studentAttitudes.attitudeToFailures"
        id="failures"
        rows="10"
      />
    </div>
    <div class="form_item">
      <label for="peers">Взаимоотношения со сверстниками:</label>
      <Dropdown
        id="peers"
        v-model="studentAttitudes.relationshipPeers"
        :options="relationships"
        placeholder="Выберите качество отношений"
      />
    </div>
    <div class="form_item col-span-2 justify-self-center">
      <Button
        label="Сохранить"
        icon="pi pi-save"
        iconPos="right"
        @click="editStudentAttitudes"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply grid grid-cols-2 gap-12;
}

.form_item {
  @apply flex flex-col gap-2;
}
.form_item label {
  @apply text-xl font-bold;
}
</style>
