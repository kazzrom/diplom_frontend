import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore("HomeStore", () => {
  const data = ref();
  const curator = ref();
  const group = ref();

  function setData(responseData) {
    data.value = responseData;
    curator.value =
      responseData.curator.surname + " " + responseData.curator.name;
    group.value =
      responseData.group.groupNumber + " " + responseData.group.groupName;
  }

  return { data, setData, curator, group };
});
