import { api, PRODUCT_API } from "@/config";

export const productService = {
  getProduct: (query = "", signal) =>
    api.get(`${PRODUCT_API}${query}`, { signal }),
  getCategory: () => api.get(`${PRODUCT_API}/categories`),
};
