import { api, USER_API } from "@/config";

export const userService = {
  register: (data) => api.post(`${USER_API}/register`, data),
  getProfile: () => api.get(`${USER_API}`),

  resetPassword: (data) => api.post(`${USER_API}/reset-password`, data),
  changePasswordByCode: (data) =>
    api.post(`${USER_API}/change-password-by-code`, data),
};
