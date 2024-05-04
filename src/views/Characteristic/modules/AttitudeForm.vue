<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import { useCharacteristicStore } from "../stores/characteristic.js";
import { storeToRefs } from "pinia";

// onMounted(async () => {
//   console.log("AttitudeForm mounted", route.params.id);
//   await fetchStudentById(route.params.id);
// });
const store = useCharacteristicStore();
const { confirmEditAttitudes } = store;
const { characteristic } = storeToRefs(store);

// const route = useRoute();

const relationships = ref(["Положительные", "Нейтральные", "Негативные"]);
</script>

<template>
  <div class="wrapper">
    <div class="form_item">
      <label for="study">Отношение к учёбе:</label>
      <Textarea
        v-model="characteristic.studentAttitudes.attitudeToStudy"
        id="study"
        rows="10"
      />
    </div>
    <div class="form_item">
      <label for="elder">Отношение к старшим:</label>
      <Textarea
        v-model="characteristic.studentAttitudes.attitudeToElders"
        id="elder"
        rows="10"
      />
    </div>
    <div class="form_item">
      <label for="failures">Отношение к своим неудачам в обучении: </label>
      <Textarea
        v-model="characteristic.studentAttitudes.attitudeToFailures"
        id="failures"
        rows="10"
      />
    </div>
    <div class="form_item">
      <label for="peers">Взаимоотношения со сверстниками:</label>
      <Dropdown
        id="peers"
        v-model="characteristic.studentAttitudes.relationshipWithPeers"
        :options="relationships"
        placeholder="Выберите качество отношений"
      />
    </div>
    <div class="form_item col-span-2 justify-self-center">
      <Button
        label="Сохранить"
        icon="pi pi-save"
        iconPos="right"
        @click="confirmEditAttitudes"
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
