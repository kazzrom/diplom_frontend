<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import { required } from "@vuelidate/validators";

const registeredOPPN = {
  reason: undefined,
};

const registeredOPPNRules = {
  Student: { required },
  reason: { required },
};

const tableColumns = [{ field: "reason", header: "Причина" }];
</script>

<template>
  <DefaultTable
    :table-api-url="TABLE_API_URL.STUDENTS_REGISTERED_OPPN"
    :item="registeredOPPN"
    :rules="registeredOPPNRules"
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
