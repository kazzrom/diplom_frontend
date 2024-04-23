import ky from "ky";
import { API_URL } from "@/constants";

export async function getRelative(id) {
  const response = await ky.get(`${API_URL}/relatives/${id}`);
  return response.json();
}

export async function getRelatives(studentId) {
  const response = await ky.get(`${API_URL}/family/${studentId}`);
  return response.json();
}

export async function addRelative(data) {
  const newRelative = await ky.post(`${API_URL}/relatives`, { json: data });
  return newRelative.json();
}

export async function editRelative({ id, data }) {
  await ky.put(`${API_URL}/relatives/${id}`, {
    json: data,
  });
}

export async function deleteRelative(id) {
  await ky.delete(`${API_URL}/relatives/${id}`);
}
