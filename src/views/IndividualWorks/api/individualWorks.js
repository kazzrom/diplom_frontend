import ky from "ky";
import { API_URL } from "@/constants";

const individualWorkAPI = ky.create({
  prefixUrl: `${API_URL}/profile/individual-works`,
});

export async function getAllIndividualWorksByStudentId(studentId) {
  const response = await individualWorkAPI
    .get(`${studentId}`)
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function addIndividualWork(individualWork) {
  const response = await individualWorkAPI.post("", {
    json: individualWork,
  });

  return response.json();
}

export async function updateIndividualWork({ id, data }) {
  await individualWorkAPI.put(`${id}`, {
    json: data,
  });
}

export async function deleteIndividualWork(id) {
  await individualWorkAPI.delete(`${id}`);
}
