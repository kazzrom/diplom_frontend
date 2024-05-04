import ky from "ky";
import { API_URL, GROUP_ID } from "@/constants";

const studentAPI = ky.create({
  prefixUrl: `${API_URL}/students`,
  headers: {
    groupid: GROUP_ID,
  },
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
