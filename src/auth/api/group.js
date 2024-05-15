import ky from "ky";
import { API_URL } from "@/constants";

const groupAPI = ky.create({
  prefixUrl: `${API_URL}/groups`,
});

export async function getGroupNames() {
  const response = await groupAPI
    .get("names")
    .then((response) => response)
    .catch((error) => console.log(error));

  return response.json();
}
