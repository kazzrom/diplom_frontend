<script setup>
import ky from "ky";
import { API_URL } from "@/constants";
import { onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import { TABLE_API_URL } from "../utils/tables";
import Dropdown from "primevue/dropdown";
import problemFamilyRules from "@/validators/problemFamilyRules.js";
import { useVuelidate } from "@vuelidate/core";
import { useConfirmStore } from "@/stores/confirms";

onMounted(async () => await fetchProblemFamilies());
onMounted(async () => await fetchStudents());

const { confirmAdd, confirmEdit, confirmDelete } = useConfirmStore();

const items = ref([]);

const loading = ref(false);

const problemFamily = ref({
  Student: undefined,
  reason: undefined,
  note: undefined,
});

const v$ = useVuelidate(problemFamilyRules, problemFamily);
const isSubmit = ref(false);

const students = ref([]);

async function fetchProblemFamilies() {
  loading.value = true;
  const response = await ky
    .get(`${API_URL}${TABLE_API_URL.PROBLEM_FAMILIES}`)
    .json();
  items.value = response;
  loading.value = false;
}

async function fetchStudents() {
  const response = await ky.get(`${API_URL}/students`).json();
  students.value = response;
}

async function addProblemFamily() {
  isSubmit.value = true;
  confirmAdd({
    invalid: v$.value.$invalid,
    funcIf: async () => {
      items.value.push(problemFamily.value);
      await ky.post(`${API_URL}${TABLE_API_URL.PROBLEM_FAMILIES}`, {
        json: {
          studentId: problemFamily.value.Student.id,
          reason: problemFamily.value.reason,
          note: problemFamily.value.note,
        },
      });
      isSubmit.value = false;
      clearForm();
    },
  });
}

async function deleteProblemFamily(id) {
  confirmDelete({
    funcAccept: async () => {
      await ky.delete(`${API_URL}${TABLE_API_URL.PROBLEM_FAMILIES}/${id}`);
      items.value = items.value.filter((item) => item.Student.id !== id);
    },
  });
}

function clearForm() {
  problemFamily.value = {
    Student: undefined,
    reason: undefined,
    note: undefined,
  };
}
</script>

<template>
  <InputGroup>
    <Dropdown
      v-if="students.length"
      v-model="problemFamily.Student"
      editable
      :options="students"
      option-label="fullname"
      :invalid="v$.Student.$invalid && isSubmit"
    />
    <InputText
      v-model="problemFamily.reason"
      placeholder="Причина"
      :invalid="v$.reason.$invalid && isSubmit"
    />
    <InputText
      v-model="problemFamily.note"
      placeholder="Примечание"
      :invalid="v$.note.$invalid && isSubmit"
    />
    <Button
      @click="addProblemFamily"
      label="Добавить"
      icon="pi pi-plus"
      iconPos="right"
    />
  </InputGroup>
  <DataTable
    v-if="items.length"
    :loading="loading"
    ref="dataStudentsTable"
    :value="items"
  >
    <Column field="Student.fullname" header="ФИО студента" />
    <Column field="reason" header="Причина" />
    <Column field="note" header="Примечание" />
    <Column>
      <template #body="{ data }">
        <Button
          icon="pi pi-trash"
          text
          rounded
          @click="deleteProblemFamily(data.Student.id)"
        />
      </template>
    </Column>
  </DataTable>
  <NoRecordsView v-else />
</template>
