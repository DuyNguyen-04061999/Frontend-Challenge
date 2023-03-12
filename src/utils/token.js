const TOKEN_KEY = "token";
const USER_KEY = "user";
const REMEMBER_KEY = "remember";
const CART_KEY = "cart";
export const setToken = (data) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || null;
};
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUser = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};
export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY)) || null;
};
export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const setRemember = (data) => {
  localStorage.setItem(REMEMBER_KEY, JSON.stringify(data));
};
export const getRemember = () => {
  return JSON.parse(localStorage.getItem(REMEMBER_KEY)) || null;
};
export const clearRemember = () => {
  localStorage.removeItem(REMEMBER_KEY);
};

export const setCart = (data) => {
  localStorage.setItem(CART_KEY, JSON.stringify(data));
};
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || null;
};
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
