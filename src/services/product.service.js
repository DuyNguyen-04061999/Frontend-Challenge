import { PRODUCT_API } from "@/config";
import { http } from "@/utils";

export const productService = {
  getProducts: (query = "", signal) =>
    http.get(`${PRODUCT_API}${query}`, { signal }),
  getCategories: (signal) => http.get(`${PRODUCT_API}/categories`, { signal }),
};
