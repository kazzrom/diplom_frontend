<script setup>
import Chips from "primevue/chips";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Textarea from "primevue/textarea";
import { onMounted, ref } from "vue";
import { useCharacteristicStore } from "../stores/characteristic.js";
import { storeToRefs } from "pinia";

const store = useCharacteristicStore();
const { confirmEditPersonality } = store;
const { characteristic } = storeToRefs(store);

const presenceOffenses = ref([
  { label: "Да", value: true },
  { label: "Нет", value: false },
]);

const inclinations = ref([
  "К курению",
  "К распитию спиртного",
  "К бродяжничеству",
  "К воровству",
]);
</script>

<template>
  <div class="wrapper">
    <div class="form_item">
      <label for="positive-sides">
        Положительные стороны характера и личности:
      </label>
      <Textarea
        v-model="characteristic.studentPersonality.positiveSides"
        id="positive-sides"
        rows="10"
      />
    </div>
    <div class="form_item">
      <label for="negative-sides">
        Отрицательные стороны характера и личности
      </label>
      <Textarea
        v-model="characteristic.studentPersonality.negativeSides"
        id="negative-sides"
        rows="10"
      />
    </div>
    <div class="form_item">
      <label for="bad-habits">Склонности</label>
      <MultiSelect
        id="bad-habits"
        v-model="characteristic.inclinations"
        :options="inclinations"
        placeholder="Выберите плохие привычки"
      />
    </div>
    <div class="form_item">
      <label for="presence-offenses">Наличие правонарушений</label>
      <Dropdown
        id="presence-offenses"
        v-model="characteristic.studentPersonality.presenceOffenses"
        :options="presenceOffenses"
        option-label="label"
        option-value="value"
        placeholder="Выберите статус"
      />
    </div>
    <div class="form_item col-span-2">
      <label for="hobbies">Досуг обучающегося</label>
      <Chips v-model="characteristic.hobbies" input-id="hobbies" />
    </div>
    <div class="form_item col-span-2 justify-self-center">
      <Button
        label="Сохранить"
        icon="pi pi-save"
        iconPos="right"
        @click="confirmEditPersonality"
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
