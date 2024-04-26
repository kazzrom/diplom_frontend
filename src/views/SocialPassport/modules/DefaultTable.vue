<script setup>
import ky from "ky";
import { API_URL } from "@/constants";
import { computed, onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import Dropdown from "primevue/dropdown";
import { useVuelidate } from "@vuelidate/core";
import { useConfirmStore } from "@/stores/confirms";

const props = defineProps({
  tableApiUrl: {
    type: String,
  },
  tableColumns: {
    type: Array,
  },
  item: {
    type: Object,
  },
  rules: {
    type: Object,
  },
  needRelatives: {
    type: Boolean,
    default: false,
  },
});

onMounted(async () => await fetchFamilies());
onMounted(async () => await fetchStudents());

const { confirmAdd, confirmDelete } = useConfirmStore();

const items = ref([]);

const loading = ref(false);

const family = ref({ Student: undefined, ...props.item, note: undefined });

const relatives = computed(() => {
  if (!family.value.Student || !props.needRelatives) return [];
  return family.value.Student.Familyties.map((item) => item.Relative);
});

const v$ = useVuelidate(props.rules, family);
const isSubmit = ref(false);

const students = ref([]);

async function fetchFamilies() {
  loading.value = true;
  const response = await ky.get(`${API_URL}${props.tableApiUrl}`).json();
  items.value = response;
  loading.value = false;
}

async function fetchStudents() {
  const response = await ky.get(`${API_URL}/social-passport/students`).json();
  students.value = response;
}

async function addFamily() {
  isSubmit.value = true;
  confirmAdd({
    invalid: v$.value.$invalid,
    funcIf: async () => {
      items.value.push(family.value);
      isSubmit.value = false;
      await ky.post(`${API_URL}${props.tableApiUrl}`, {
        json: family.value,
      });
      clearForm();
    },
  });
}

async function deleteFamily(id) {
  confirmDelete({
    funcAccept: async () => {
      items.value = items.value.filter((item) => item.Student.id !== id);
      await ky.delete(`${API_URL}${props.tableApiUrl}/${id}`);
    },
  });
}

function clearForm() {
  family.value = { Student: undefined, ...props.item, note: undefined };
}
</script>

<template>
  <div class="wrapper">
    <InputGroup>
      <Dropdown
        v-if="students.length"
        v-model="family.Student"
        editable
        :options="students"
        option-label="fullname"
        :invalid="v$.Student.$invalid && isSubmit"
        placeholder="Выберите студента"
      />
      <slot
        name="addingForm"
        :item="family"
        :v="v$"
        :isSubmit="isSubmit"
        :relatives="relatives"
      />
      <InputText v-model="family.note" placeholder="Примечание" />
      <Button
        @click="addFamily"
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
      <Column
        v-for="column in tableColumns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
      />
      <Column field="note" header="Примечание" />
      <Column>
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            text
            rounded
            @click="deleteFamily(data.Student.id)"
          />
        </template>
      </Column>
    </DataTable>
    <NoRecordsView v-else />
  </div>
</template>
