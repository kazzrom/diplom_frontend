import ky from "ky";
import { API_URL, GROUP_ID } from "@/constants";

const groupMeetingAPI = ky.create({
  prefixUrl: `${API_URL}/protocols/group-meetings`,
});

export async function getGroupMeetings() {
  const response = await groupMeetingAPI
    .get(`${GROUP_ID}`)
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}

export async function createGroupMeeting(groupMeeting) {
  const response = await groupMeetingAPI.post("", {
    json: {
      groupId: GROUP_ID,
      ...groupMeeting,
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
