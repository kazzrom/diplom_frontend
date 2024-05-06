import ky from "ky";
import { API_URL } from "@/constants";

const socialPassportAPI = ky.create({
  prefixUrl: `${API_URL}/social-passport`,
});

export default class Api {
  constructor(api_url) {
    this.api_url = api_url;
  }

  async getRecords(groupId) {
    const response = await socialPassportAPI
      .get(`${this.api_url}/${groupId}`)
      .then((response) => response)
      .catch((error) => console.log(error));

    return response.json();
  }

  async addRecord(record) {
    const response = await socialPassportAPI.post(`${this.api_url}`, {
      json: record,
    });

    return response.json();
  }

  async deleteRecord(id) {
    await socialPassportAPI.delete(`${this.api_url}/${id}`);
  }

  async getStudents(groupId) {
    const students = await socialPassportAPI
      .get(`students-with-parents/${groupId}`)
      .then((response) => response)
      .catch((error) => console.log(error));

    return students.json();
  }
}
