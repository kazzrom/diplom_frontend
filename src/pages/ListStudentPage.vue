<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import TableHeader from "../components/ListStudents/TableHeader.vue";
import FormAddStudent from "../components/ListStudents/FormAddStudent.vue";
import StudentsTable from "../components/ListStudents/StudentsTable.vue";

const store = useStore();

onMounted(() => store.dispatch("fetchStudents"));

const visibleDialog = computed(() => store.getters.getVisibleDialog);
</script>

<template>
  <div class="wrapper mt-[100px] mx-[150px]">
    <TableHeader />
    <StudentsTable />
    <Dialog
      v-model:visible="visibleDialog"
      modal
      header="Добавление студента"
      class="p-4"
    >
      <FormAddStudent />
    </Dialog>
  </div>
</template>
