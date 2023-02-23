import { api, AUTH_API } from "@/config";

export const authService = {
  login: (form) => api.post(`${AUTH_API}/login`, form),

  loginByCode: (code) => api.post(`${AUTH_API}/login-by-code`, code),
  
  refreshToken: (data) => api.post(`${AUTH_API}/refresh-token`, data),
};
