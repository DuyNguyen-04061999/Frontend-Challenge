import { getToken } from "./token";

//======= trc khi gui api ========
export function interceptorsRequest(api) {
  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
      }
      return config;
    },
    (error) => {
      throw error;
    }
  );
}
