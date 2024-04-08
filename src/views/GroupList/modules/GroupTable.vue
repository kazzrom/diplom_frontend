<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGroupListStore } from "@/stores/groupList.js";
import TableHeader from "../components/TableHeader.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useGroupListStore();

onMounted(() => store.fetchTestStudents());

const { students, selectedColumns } = storeToRefs(store);

function doubleClickRow(event) {
  router.push({ name: "Profile", params: { id: Number(event.data.id) } });
}
</script>

<template>
  <DataTable
    :loading="store.loading"
    v-model:selection="selectedColumns"
    :value="students"
    tableStyle="min-width: 50rem"
    paginator
    :rows="13"
    @row-dblclick="doubleClickRow"
  >
    <template #header>
      <TableHeader />
    </template>
    <Column selectionMode="multiple" />
    <Column field="fullname" header="ФИО" />
    <Column
      v-for="column in selectedColumns"
      :key="column.id"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
