<script setup>
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import Dropdown from "primevue/dropdown";
import { computed } from "vue";
import { required } from "@vuelidate/validators";

// FIXME: надо пофиксить форму добавления, чтобы ссылки объектов не путались
const uneployedParent = {
  FamilyMember: undefined,
};

const uneployedParentRules = {
  Student: { required },
  FamilyMember: { required },
};

const tableColumns = [{ field: "FamilyMember.fullname", header: "ФИО родителя" }];
</script>

<template>
  <DefaultTable
    :table-api-url="TABLE_API_URL.UNEMPLOYED_PARENTS"
    :item="uneployedParent"
    :rules="uneployedParentRules"
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
