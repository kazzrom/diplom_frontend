import ky from "ky";
import { API_URL } from "@/constants";

const characteristicAPI = ky.create({
  prefixUrl: `${API_URL}/profile/characteristics`,
});

export async function fetchCharacteristicByStudentId(studentId) {
  const response = await characteristicAPI
    .get(`${studentId}`)
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function updateStudentAttitudesByStudentId({
  studentId,
  studentAttitudes,
}) {
  await characteristicAPI.put(`attitudes/${studentId}`, {
    json: studentAttitudes,
  });
}

export async function updateStudentPersonalityByStudentId({
  studentId,
  studentPersonality,
  hobbies,
  inclinations,
}) {
  await characteristicAPI.put(`personality/${studentId}`, {
    json: {
      studentPersonality,
      hobbies,
      inclinations,
    },
  });
}
