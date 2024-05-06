<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import Dropdown from "primevue/dropdown";
import { required } from "@vuelidate/validators";

const disabledParent = {
  FamilyMember: undefined,
};

const disabledParentRules = {
  Student: { required },
  FamilyMember: { required },
};

const tableColumns = [{ field: "FamilyMember.fullname", header: "ФИО родителя" }];
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
        v-model="item.FamilyMember"
        :options="relatives"
        option-label="fullname"
        :invalid="v.FamilyMember.$invalid && isSubmit"
        placeholder="Выберите родителя"
      />
    </template>
  </DefaultTable>
</template>
