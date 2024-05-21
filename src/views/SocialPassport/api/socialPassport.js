import ky from "ky";
import { API_URL } from "@/constants";
import InMemoryJWT from "@/auth/services/InMemoryJWT.js";

const socialPassportAPI = ky.create({
  prefixUrl: `${API_URL}/social-passport`,
});

export default class Api {
  constructor(api_url) {
    this.api_url = api_url;
  }

  static async getGeneralInformation() {
    const response = await socialPassportAPI
      .get("general-information", {
        headers: {
          Authorization: `Bearer ${InMemoryJWT.getToken()}`,
        },
      })
      .then((response) => response)
      .catch((error) => console.log(error));

    return response.json();
  }

  async getRecords() {
    const response = await socialPassportAPI
      .get(`${this.api_url}`, {
        headers: {
          Authorization: `Bearer ${InMemoryJWT.getToken()}`,
        },
      })
      .then((response) => response)
      .catch((error) => console.log(error));

    return response.json();
  }

  async addRecord(record) {
    const response = await socialPassportAPI.post(`${this.api_url}`, {
      json: record,
      headers: {
        Authorization: `Bearer ${InMemoryJWT.getToken()}`,
      },
    });

    return response.json();
  }

  async deleteRecord(id) {
    await socialPassportAPI.delete(`${this.api_url}/${id}`, {
      headers: {
        Authorization: `Bearer ${InMemoryJWT.getToken()}`,
      },
    });
  }

  async getStudents() {
    const students = await socialPassportAPI
      .get(`students-with-parents/`, {
        headers: {
          Authorization: `Bearer ${InMemoryJWT.getToken()}`,
        },
      })
      .then((response) => response)
      .catch((error) => console.log(error));

    return students.json();
  }
}
