import ky from "ky";
import { API_URL } from "@/constants";

const studentAPI = ky.create({
  prefixUrl: `${API_URL}/students`,
});

export async function getStudentById(id) {
  const response = await studentAPI
    .get(`${id}`)
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function updateStudent(id, student) {
  await studentAPI.put(`${id}`, {
    json: student,
  });
}
