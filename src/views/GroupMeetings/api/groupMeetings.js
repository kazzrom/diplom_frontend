import ky from "ky";
import { API_URL } from "@/constants";
import InMemoryJWT from "@/auth/services/InMemoryJWT.js";

const groupMeetingAPI = ky.create({
  prefixUrl: `${API_URL}/protocols/group-meetings`,
});

export async function getGroupMeetings() {
  const response = await groupMeetingAPI
    .get("", {
      headers: {
        Authorization: `Bearer ${InMemoryJWT.getToken()}`,
      },
    })
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function createGroupMeeting(groupMeeting) {
  const response = await groupMeetingAPI.post("", {
    json: {
      ...groupMeeting,
    },
    headers: {
      Authorization: `Bearer ${InMemoryJWT.getToken()}`,
    },
  });

  return response.json();
}

export async function updateGroupMeeting(groupMeeting) {
  await groupMeetingAPI.put(`${groupMeeting.id}`, {
    json: groupMeeting,
  });
}

export async function deleteGroupMeeting(id) {
  await groupMeetingAPI.delete(`${id}`);
}
