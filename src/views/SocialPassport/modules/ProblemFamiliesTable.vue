<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import { required } from "@vuelidate/validators";

const problemFamily = {
  reason: undefined,
};

const problemFamilyRules = {
  Student: { required },
  reason: { required },
};

const tableColumns = [{ field: "reason", header: "Причина" }];
</script>

<template>
  <DefaultTable
    :table-api-url="TABLE_API_URL.PROBLEM_FAMILIES"
    :item="problemFamily"
    :rules="problemFamilyRules"
    :table-columns="tableColumns"
  >
    <template #addingForm="{ item, v, isSubmit }">
      <InputText
        v-model="item.reason"
        placeholder="Причина"
        :invalid="v.reason.$invalid && isSubmit"
      />
    </template>
  </DefaultTable>
</template>
