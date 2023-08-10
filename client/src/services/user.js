import { http } from "../utils/http";
import { userEndpoints } from "../utils/endpoint";

export const deleteUser = async (id) => {
  const URL = userEndpoints.deleteUser + `/${id}`;
  const response = await http.delete(URL);
  return response;
};
export const updateUser = async (credentials, id) => {
  const URL = userEndpoints.updateUser + `/${id}`;
  const response = await http.put(URL, credentials);
  return response;
};

export const fetchAllUsers = async () => {
  const URL = userEndpoints.users;
  const response = await http.get(URL);
  return response;
};
export const userRegistration = async (credentials) => {
  const URL = userEndpoints.signup;
  const response = await http.post(URL, credentials);
  return response;
};
export const userLogin = async (credentials, isAdmin) => {
  const URL = userEndpoints.login;
  const info = {
    ...credentials,
    role: isAdmin ? "admin" : "user",
  };
  const response = await http.post(URL, info);
  return response;
};
