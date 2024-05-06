<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import { required } from "@vuelidate/validators";

const largeFamily = {
  numberChildren: undefined,
};

const largeFamilyRules = {
  Student: { required },
  numberChildren: { required },
};

const tableColumns = [
  { field: "numberChildren", header: "Кол-во детей в семье" },
];
</script>

<template>
  <DefaultTable
    :table-api-url="TABLE_API_URL.LARGE_FAMILIES"
    :item="largeFamily"
    :rules="largeFamilyRules"
    :table-columns="tableColumns"
  >
    <template #addingForm="{ item, v, isSubmit }">
      <InputNumber
        v-model="item.numberChildren"
        placeholder="Кол-во детей"
        :invalid="v.numberChildren.$invalid && isSubmit"
      />
    </template>
  </DefaultTable>
</template>
