<script setup>
import { onMounted, ref } from "vue";
import Api from "../api/socialPassport.js";

onMounted(async () => {
  generalInformation.value = await Api.getGeneralInformation();
});

const generalInformation = ref({});
</script>

<template>
  <div class="general_information">
    <div class="sex_attribute">
      <p>Всего обучающихся: {{ generalInformation.numberStudents }} чел.</p>
      <p>Юношей: {{ generalInformation.numberBoys }} чел.</p>
      <p>Девушек: {{ generalInformation.numberGirls }} чел.</p>
    </div>
    <div class="whereFrom_attribute">
      <p>Городских: {{ generalInformation.numberUrban }} чел.</p>
      <p>Сельских: {{ generalInformation.numberRural }} чел.</p>
      <p>Иногородних: {{ generalInformation.numberAbroad }} чел.</p>
    </div>
  </div>
</template>

<style scoped>
.general_information {
  @apply flex flex-row gap-5;
}
</style>
