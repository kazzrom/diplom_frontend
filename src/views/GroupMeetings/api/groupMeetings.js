import ky from "ky";
import { API_URL, GROUP_ID } from "@/constants";

const groupMeetingAPI = ky.create({ prefixUrl: `${API_URL}/group-meetings` });

export async function fetchGroupMeetings() {
  const response = await groupMeetingAPI
    .get("")
    .json()
    .then((response) => {
      return response;
    });
  return response;
}

export async function addGroupMeeting(groupMeeting) {
  await groupMeetingAPI.post("", {
    json: {
      groupId: GROUP_ID,
      ...groupMeeting,
    },
  });
}

export async function editGroupMeeting(groupMeeting) {
  console.log(groupMeeting);
  await groupMeetingAPI.put(`${groupMeeting.id}`, {
    json: groupMeeting,
  });
}

export async function deleteGroupMeeting(id) {
  await groupMeetingAPI.delete(`${id}`);
}
