<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
onMounted(() => store.dispatch("fetchStudents"));
const orphans = computed(() => store.getters.students);
const columns = computed(() => store.getters.orphansColumns);
</script>

<template>
  <DataTable :value="orphans">
    <Column field="id" header="№" />
    <Column
      v-for="column in columns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
