<script setup>
import Chips from "primevue/chips";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Textarea from "primevue/textarea";
import { ref } from "vue";

const presenceOffenses = ref([{ name: "Да" }, { name: "Нет" }]);
const selectedPresenceOffenses = ref();

const badHabits = ref([
  { name: "Нет" },
  { name: "Курение" },
  { name: "Алкоголизм" },
  { name: "Наркомания" },
]);
const selectedbadHabits = ref();

const leisure = ref();
</script>

<template>
  <div class="wrapper">
    <div class="form_item">
      <label for="positive-sides">
        Положительные стороны характера и личности:
      </label>
      <Textarea id="positive-sides" rows="10" />
    </div>
    <div class="form_item">
      <label for="negative-sides">
        Отрицательные стороны характера и личности
      </label>
      <Textarea id="negative-sides" rows="10" />
    </div>
    <div class="form_item">
      <label for="bad-habits">Вредные привычки</label>
      <MultiSelect
        id="bad-habits"
        v-model="selectedbadHabits"
        :options="badHabits"
        option-label="name"
        placeholder="Выберите плохие привычки"
      />
    </div>
    <div class="form_item">
      <label for="presence-offenses">Наличие правонарушений</label>
      <Dropdown
        id="presence-offenses"
        v-model="selectedPresenceOffenses"
        :options="presenceOffenses"
        option-label="name"
        placeholder="Выберите статус"
      />
    </div>
    <div class="form_item col-span-2">
      <label for="leisure">Досуг обучающегося</label>
      <Chips v-model="leisure" input-id="leisure" />
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
