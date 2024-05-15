import { defineStore } from "pinia";
import axios from "axios";
import ky from "ky";
import { API_URL } from "@/constants";
import InMemoryJWT from "@/auth/services/InMemoryJWT.js";
import { useToastStore } from "@/stores/toasts";

export const useAPIStore = defineStore("APIStore", () => {
  const { warningToast } = useToastStore();

  const axiosStudentAPI = axios.create({
    baseURL: `${API_URL}/students`,
    withCredentials: true,
  });

  const studentAPI = ky.create({
    prefixUrl: `${API_URL}/students`,
  });

  async function fetchStudents() {
    const response = await studentAPI
      .get("", {
        headers: {
          Authorization: `Bearer ${InMemoryJWT.getToken()}`,
        },
      })
      .then((response) => response)
      .catch((error) => console.log(error));

    return response.json();
  }

  async function createStudent(student) {
    // await studentAPI
    //   .post("", {
    //     json: student,
    //     headers: {
    //       Authorization: `Bearer ${InMemoryJWT.getToken()}`,
    //     },
    //   })
    //   .then((response) => response)
    //   .catch((error) => {
    //     console.log("error");
    //     console.log(error);
    //   });

    const response = await axiosStudentAPI
      .post("", student, {
        headers: {
          Authorization: `Bearer ${InMemoryJWT.getToken()}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        warningToast(error.response.data.error);
        throw new Error(error);
      });

    return response;
  }

  async function deleteStudent(id) {
    await studentAPI.delete(`${id}`);
  }

  return { fetchStudents, createStudent, deleteStudent };
});
