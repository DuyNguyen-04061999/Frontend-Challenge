import { CART_API } from "@/config";
import { http } from "@/utils";

export const cartService = {
  getCart: (query = "") => http.get(`${CART_API}${query}`),
  updateQuantity: (id, data) => http.patch(`${CART_API}/${id}`, data),
  removeItem: (id) => http.delete(`${CART_API}/${id}`),
};
