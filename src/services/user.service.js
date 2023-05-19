import { USER_API } from "@/config";
import { http } from "@/utils";

export const userService = {
  register: (data) => http.post(`${USER_API}s`, data),

  getUser: () => http.get(`${USER_API}`),

  getAllUser: () => http.get(`${USER_API}s`),

  updateUserInfo: (data) => http.put(`${USER_API}`, data),

  deleteUser: (email) => http.delete(`${USER_API}s/${email}`),
};
