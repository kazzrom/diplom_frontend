<script setup>
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

const relationships = ref([
  { name: "Положительные" },
  { name: "Нейтральные" },
  { name: "Негативные" },
]);

const selectedRelationship = ref();
</script>

<template>
  <div class="wrapper">
    <div class="form_item">
      <label for="study">Отношение к учёбе:</label>
      <Textarea id="study" rows="10" />
    </div>
    <div class="form_item">
      <label for="senior">Отношение к старшим:</label>
      <Textarea id="senior" rows="10" />
    </div>
    <div class="form_item">
      <label for="failures">Отношение к своим неудачам в обучении: </label>
      <Textarea id="failures" rows="10" />
    </div>
    <div class="form_item">
      <label for="peers">Взаимоотношения со сверстниками:</label>
      <Dropdown
        id="peers"
        v-model="selectedRelationship"
        :options="relationships"
        option-label="name"
        placeholder="Выберите качество отношений"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply grid grid-cols-2 gap-[80px];
}

.form_item {
  @apply flex flex-col gap-2;
}
.form_item label {
  @apply text-xl font-bold;
}
</style>
