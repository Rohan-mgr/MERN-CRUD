import { config } from "../axios-config";

export const userEndpoints = {
  users: config.baseURL + "/user",
  signup: config.baseURL + "/user/signup",
  login: config.baseURL + "/user/login",
  deleteUser: config.baseURL + "/user/remove_user",
  updateUser: config.baseURL + "/user/update_user",
};
