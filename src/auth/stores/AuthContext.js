import { defineStore } from "pinia";
import { useHomeStore } from "./Home.js";
import axios from "axios";
import { API_URL } from "@/constants.js";
import InMemoryJWT from "../services/InMemoryJWT.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGroupListStore } from "@/views/GroupList/stores/groupList.js";
import { useToastStore } from "@/stores/toasts.js";

export const AuthClient = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
});

export const ResourceClient = axios.create({
  baseURL: `${API_URL}/resource`,
  withCredentials: true,
});

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = InMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${InMemoryJWT.getToken()}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const useAuthProvider = defineStore("AuthStore", () => {
  const { setData } = useHomeStore();
  const { fetchStudents } = useGroupListStore();
  const { successToast, warningToast } = useToastStore();

  const router = useRouter();

  const isAppReady = ref(false);
  const setIsAppReady = (value) => {
    isAppReady.value = value;
  };

  const isUserLogged = ref(false);
  const setIsUserLogged = (value) => {
    isUserLogged.value = value;
  };

  const handleFetchProtected = () => {
    ResourceClient.get("/protected", {
      headers: { Authorization: `Bearer ${InMemoryJWT.getToken()}` },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then(() => {
        InMemoryJWT.deleteToken();
        setIsUserLogged(false);
        router.push({ name: "login" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        InMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
        router.push({ name: "home" });
      })
      .catch((error) => {
        warningToast(error.response.data.error);
      });
  };

  const handleSignIn = (data) => {
    AuthClient.post("/sign-in", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        InMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
        router.push({ name: "Students" });
        fetchStudents();
      })
      .catch((error) => {
        warningToast(error.response.data.error);
      });
  };

  onMounted(async () => {
    await AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        InMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsAppReady(true);
        setIsUserLogged(true);
        fetchStudents();
      })
      .catch(() => {
        setIsAppReady(true);
        setIsUserLogged(false);
        router.push({ name: "login" });
      });
    handleFetchProtected();
  });

  return {
    handleFetchProtected,
    handleLogOut,
    handleSignUp,
    handleSignIn,
    isUserLogged,
    isAppReady,
  };
});
