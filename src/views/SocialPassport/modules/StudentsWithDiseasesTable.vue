<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import { required } from "@vuelidate/validators";

const studentWithDiseases = {
  disease: undefined,
};

const studentWithDiseasesRules = {
  Student: { required },
  disease: { required },
};

const tableColumns = [{ field: "disease", header: "Заболевание" }];
</script>

<template>
  <DefaultTable
    :table-api-url="TABLE_API_URL.CHRONIC_DISEASES"
    :item="studentWithDiseases"
    :rules="studentWithDiseasesRules"
    :table-columns="tableColumns"
  >
    <template #addingForm="{ item, v, isSubmit }">
      <InputText
        v-model="item.disease"
        placeholder="Заболевание"
        :invalid="v.disease.$invalid && isSubmit"
      />
    </template>
  </DefaultTable>
</template>
