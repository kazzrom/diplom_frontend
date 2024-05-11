import ky from "ky";
import { API_URL } from "@/constants";
import InMemoryJWT from "@/auth/services/InMemoryJWT.js";

const studentAPI = ky.create({
  prefixUrl: `${API_URL}/students`,
});

export async function fetchStudents() {
  const response = await studentAPI
    .get("", {
      headers: {
        Authorization: `Bearer ${InMemoryJWT.getToken()}`,
      },
    })
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function createStudent(student) {
  await studentAPI.post("", {
    json: student,
    headers: {
      Authorization: `Bearer ${InMemoryJWT.getToken()}`,
    },
  });
}

export async function deleteStudent(id) {
  await studentAPI.delete(`${id}`);
}
