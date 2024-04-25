<script setup>
// TODO: не забудь сделать эту таблицу, пожалуйста
import DefaultTable from "./DefaultTable.vue";
import { TABLE_API_URL } from "../utils/tables";
import { required } from "@vuelidate/validators";

const largeFamily = {
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
    :table-api-url="TABLE_API_URL.REGISTERED_OPPN"
    :item="largeFamily"
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
