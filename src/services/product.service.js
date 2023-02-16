import { api, PRODUCT_API } from "@/config";

export const productService = {
  getProduct: (query = "") => api.get(`${PRODUCT_API}${query}`),
  getCategory: () => api.get(`${PRODUCT_API}/categories`),
};
