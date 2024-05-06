import ky from "ky";
import { API_URL, GROUP_ID } from "@/constants";

const parentMeetingAPI = ky.create({
  prefixUrl: `${API_URL}/protocols/parent-meetings`,
});

export async function getParentMeetings() {
  const response = await parentMeetingAPI
    .get(`${GROUP_ID}`)
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function getParents() {
  const response = await parentMeetingAPI
    .get(`${GROUP_ID}/parents`)
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function createParentMeeting(parentMeeting) {
  const response = await parentMeetingAPI.post("", {
    json: parentMeeting,
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
