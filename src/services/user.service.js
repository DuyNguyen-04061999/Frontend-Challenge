import { http } from "@/utils";
import { USER_API } from "@/config";
export const userService = {
  getProfile: () => {
    return http.get(`${USER_API}`);
  },
  register: (data) => http.post(`${USER_API}/register`, data),
  updateInfo: (data) => http.patch(`${USER_API}`, data),
  resetPassword: (data) => http.post(`${USER_API}/reset-password`, data),
  changePassword: (data) => http.post(`${USER_API}/change-password`, data),
  changePasswordByCode: (data) =>
    http.post(`${USER_API}/change-password-by-code`, data),
};
