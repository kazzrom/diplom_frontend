import ky from "ky";
import { API_URL, GROUP_ID } from "@/constants";

const homeroomAPI = ky.create({
  prefixUrl: `${API_URL}/protocols/homerooms`,
});

export async function getHomerooms() {
  const response = await homeroomAPI
    .get(`${GROUP_ID}`)
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function createHomeroom(homeroom) {
  const response = await homeroomAPI.post("", {
    json: { ...homeroom, groupId: GROUP_ID },
  });

  return response.json();
}

export async function updateHomeroom(homeroom) {
  await homeroomAPI.put(`${homeroom.id}`, {
    json: homeroom,
  });
}

export async function deleteHomeroom(id) {
  await homeroomAPI.delete(`${id}`);
}
