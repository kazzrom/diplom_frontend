import ky from "ky";
import axios from "axios";
import { API_URL } from "@/constants";

const familyAPI = ky.create({ prefixUrl: `${API_URL}/profile/families` });
const familyMemberAPI = ky.create({
  prefixUrl: `${API_URL}/profile/families/family-members`,
});
const axiosFamilyAPI = axios.create({
  baseURL: `${API_URL}/profile/families`,
  withCredentials: true,
});

export async function getRelative(id) {
  const response = await familyMemberAPI.get(`${id}`);
  return response.json();
}

export async function getRelatives(studentId) {
  const response = await familyAPI.get(`${studentId}`);
  return response.json();
}

export async function addRelative(data) {
  const response = await axiosFamilyAPI
    .post("", data)
    .then((response) => response.data);

  return response;
}

export async function editRelative({ id, data }) {
  await familyMemberAPI.put(`${id}`, {
    json: data,
  });
}

export async function deleteRelative(id) {
  await familyMemberAPI.delete(`${id}`);
}
