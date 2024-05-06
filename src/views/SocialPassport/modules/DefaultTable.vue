<script setup>
import { GROUP_ID } from "@/constants";
import { computed, onMounted, ref } from "vue";
import NoRecordsView from "@/components/NoRecordsView.vue";
import Dropdown from "primevue/dropdown";
import { useVuelidate } from "@vuelidate/core";
import { useConfirmStore } from "@/stores/confirms";
import Api from "../api/socialPassport.js";

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

const API = new Api(props.tableApiUrl);

const { confirmAdd, confirmDelete } = useConfirmStore();

const items = ref([]);

const loading = ref(false);

const family = ref({ Student: undefined, ...props.item, note: undefined });

const relatives = computed(() => {
  if (!family.value.Student || !props.needRelatives) return [];
  return family.value.Student.FamilyMembers;
});

const v$ = useVuelidate(props.rules, family);
const isSubmit = ref(false);

const students = ref([]);

async function fetchFamilies() {
  loading.value = true;
  const response = await API.getRecords(GROUP_ID);
  items.value = response;
  loading.value = false;
}

async function fetchStudents() {
  const response = await API.getStudents(GROUP_ID);
  students.value = response;
}

async function addFamily() {
  isSubmit.value = true;
  confirmAdd({
    invalid: v$.value.$invalid,
    funcIf: async () => {
      const newFamily = await API.addRecord(family.value);
      items.value.push(newFamily);
      isSubmit.value = false;
      clearForm();
    },
  });
}

async function deleteFamily(id) {
  confirmDelete({
    funcAccept: async () => {
      items.value = items.value.filter((item) => item.id !== id);
      await API.deleteRecord(id);
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
            @click="deleteFamily(data.id)"
          />
        </template>
      </Column>
    </DataTable>
    <NoRecordsView v-else />
  </div>
</template>
