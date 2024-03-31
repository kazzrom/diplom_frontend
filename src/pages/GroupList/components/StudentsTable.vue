<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import TableHeader from "./TableHeader.vue";

const store = useStore();

onMounted(() => store.dispatch("fetchTestStudents"));

const students = computed(() => store.getters.testStudents);
const studentColumns = computed(() => store.getters.studentColumns);

const columns = ref(studentColumns);
const selectedColumns = ref(columns.value);

const onToggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};

const selectedStudents = ref();
</script>

<template>
  <DataTable
    v-model:selection="selectedStudents"
    :value="students"
    tableStyle="min-width: 50rem"
    paginator
    :rows="13"
  >
    <template #header>
      <TableHeader>
        <MultiSelect
          :model-value="selectedColumns"
          :options="columns"
          optionLabel="header"
          @update:model-value="onToggle"
          :max-selected-labels="3"
          placeholder="Выберите столбцы"
        />
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search"> </InputIcon>
          <InputText placeholder="Поиск" />
        </IconField>
      </TableHeader>
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
