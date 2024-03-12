<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ColumnHeader from "./components/ColumnHeader.vue";

const store = useStore();

onMounted(() => store.dispatch("fetchStudents"));

const students = computed(() => store.getters.getTestStudents);

const columns = ref([
  { field: "fullName", header: "ФИО" },
  { field: "reportCardNumber", header: "Номер телефона" },
]);

const selectedColumns = ref(columns.value);
const onToggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};
</script>

<template>
  <div class="wrapper mt-[100px] mx-[150px]">
    <ColumnHeader />
    <DataTable :value="students" tableStyle="min-width: 50rem">
      <Column field="id" header="ID" />
      <Column
        v-for="column in selectedColumns"
        :key="column.id"
        :field="column.field"
        :header="column.header"
      />
    </DataTable>
  </div>
</template>

<style scoped></style>
