import ky from "ky";
import { API_URL, GROUP_ID } from "@/constants";

const studentAPI = ky.create({
  prefixUrl: `${API_URL}/students`,
  headers: {
    groupid: GROUP_ID,
  },
});

export async function fetchStudents() {
  const response = await studentAPI
    .get("")
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function createStudent(student) {
  await studentAPI.post("", {
    json: student,
  });
}

export async function deleteStudent(id) {
  await studentAPI.delete(`${id}`);
}
