import { AUTH_API } from "@/config";
import { http } from "@/utils";

export const authService = {
  login: (data) => http.post(`${AUTH_API}`, data),
};
