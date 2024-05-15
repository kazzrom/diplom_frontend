<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import { required } from "@vuelidate/validators";

const disabledStudent = {
  disability: undefined,
};

const disabledStudentRules = {
  Student: { required },
  disability: { required },
};

const tableColumns = [{ field: "disability", header: "Инвалидность" }];
</script>

<template>
  <DefaultTable
    :table-api-url="TABLE_API_URL.DISABLED_STUDENTS"
    :item="disabledStudent"
    :rules="disabledStudentRules"
    :table-columns="tableColumns"
  >
    <template #addingForm="{ item, v, isSubmit }">
      <InputText
        v-model="item.disability"
        placeholder="Инвалидность"
        :invalid="v.disability.$invalid && isSubmit"
      />
    </template>
  </DefaultTable>
</template>
