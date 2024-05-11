import ky from "ky";
import { API_URL } from "@/constants";
import InMemoryJWT from "@/auth/services/InMemoryJWT.js";

const parentMeetingAPI = ky.create({
  prefixUrl: `${API_URL}/protocols/parent-meetings`,
});

export async function getParentMeetings() {
  const response = await parentMeetingAPI
    .get("", {
      headers: {
        Authorization: `Bearer ${InMemoryJWT.getToken()}`,
      },
    })
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function getParents() {
  const response = await parentMeetingAPI
    .get("parents", {
      headers: {
        Authorization: `Bearer ${InMemoryJWT.getToken()}`,
      },
    })
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function createParentMeeting(parentMeeting) {
  const response = await parentMeetingAPI.post("", {
    json: parentMeeting,
    headers: {
      Authorization: `Bearer ${InMemoryJWT.getToken()}`,
    },
  });

  return response.json();
}

export async function updateParentMeeting({ id, parentMeeting }) {
  await parentMeetingAPI.put(`${parentMeeting.id}`, {
    json: parentMeeting,
  });
}

export async function deleteParentMeeting(id) {
  await parentMeetingAPI.delete(`${id}`);
}
