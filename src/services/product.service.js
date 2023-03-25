import { PRODUCT_API } from "@/config";
import { http } from "@/utils";

export const productService = {
  getProducts: (query = "", signal) =>
    http.get(`${PRODUCT_API}${query}`, { signal }),

  getProductDetail: (id) => http.get(`${PRODUCT_API}/${id}`),

  getCategories: (signal) => http.get(`${PRODUCT_API}/categories`, { signal }),

  getWishlist: (query = "", signal) =>
    http.get(`${PRODUCT_API}/wishlist${query}`, { signal }),

  addWishlist: (productID, signal) =>
    http.post(`${PRODUCT_API}/wishlist/${productID}`, { signal }),

  removeWishlist: (productID, signal) =>
    http.delete(`${PRODUCT_API}/wishlist/${productID}`, { signal }),
};
