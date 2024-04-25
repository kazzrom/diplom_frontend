<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import Dropdown from "primevue/dropdown";
import { computed } from "vue";
import { required } from "@vuelidate/validators";

const disabledParent = {
  Relative: undefined,
};

const disabledParentRules = {
  Student: { required },
  Relative: { required },
};

const tableColumns = [{ field: "Relative.fullname", header: "ФИО родителя" }];
</script>

<template>
  <DefaultTable
    :table-api-url="TABLE_API_URL.DISABLED_PARENTS"
    :item="disabledParent"
    :rules="disabledParentRules"
    :table-columns="tableColumns"
    need-relatives
  >
    <template #addingForm="{ item, v, isSubmit, relatives }">
      <Dropdown
        v-model="item.Relative"
        :options="relatives"
        option-label="fullname"
        :invalid="v.Relative.$invalid && isSubmit"
      />
    </template>
  </DefaultTable>
</template>
