<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import { required } from "@vuelidate/validators";

const lowIncomeFamilyRules = {
  Student: { required },
};
</script>

<template>
  <DefaultTable
    :table-api-url="TABLE_API_URL.LOW_INCOME_FAMILIES"
    :rules="lowIncomeFamilyRules"
  />
</template>
