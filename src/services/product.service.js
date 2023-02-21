import { api, PRODUCT_API } from "@/config";

export const productService = {
  getProducts: (query = "", signal) =>
    api.get(`${PRODUCT_API}${query}`, { signal }),
  getCategories: (signal) => api.get(`${PRODUCT_API}/categories`, { signal }),
};
