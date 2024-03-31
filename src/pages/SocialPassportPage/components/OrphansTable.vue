<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
onMounted(() => store.dispatch("fetchOrphans"));
const orphans = computed(() => store.getters.orphans);
const orphansColumns = computed(() => store.getters.orphansColumns);
</script>

<template>
  <DataTable :value="orphans">
    <Column
      v-for="column in orphansColumns"
      :key="column.id"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
