import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { useConfirmStore } from "@/stores/confirms";
import * as API from "../api/students.js";
import columns from "../constants/columns.js";
// import InMemoryJWT from "@/auth/services/InMemoryJWT";

export const useGroupListStore = defineStore("groupList", () => {
  const router = useRouter();
  const { confirmDelete } = useConfirmStore();

  const loading = ref(false);

  const students = ref([]);

  const studentColumns = ref(columns);

  const selectedColumns = ref(studentColumns.value);

  const onToggle = (val) => {
    selectedColumns.value = studentColumns.value.filter((col) =>
      val.includes(col)
    );
  };

  const fetchStudents = async () => {
    loading.value = true;
    const response = await API.fetchStudents();
    students.value = response;
    loading.value = false;
  };

  function openProfile(event) {
    router.push({ name: "Profile", params: { id: event.data.id } });
  }

  const selectedStudents = ref([]);

  async function deleteStudents() {
    const ids = selectedStudents.value.map((student) => student.id);

    ids.forEach(async (id) => {
      students.value = students.value.filter((stud) => stud.id !== id);
      await API.deleteStudent(id);
    });

    selectedStudents.value = [];
  }
  const confirmDeleteStudents = () => {
    confirmDelete({
      funcAccept: () => {
        deleteStudents();
      },
      funcReject: () => {
        selectedStudents.value = [];
      },
    });
  };

  return {
    students,
    selectedStudents,
    studentColumns,
    selectedColumns,
    onToggle,
    fetchStudents,
    loading,
    openProfile,
    confirmDeleteStudents,
  };
});
