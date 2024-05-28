export const ACTIONS = {
  ADD: "add",
  EDIT: "edit",
  VIEW: "view",
};

const LOCAL_API_URL = "http://localhost:5000";
const DOCKER_API_URL = process.env.API_URL;

export const API_URL = DOCKER_API_URL;

export const GROUP_ID = 1;
