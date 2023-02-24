const TOKEN_KEY = "token";
const USER_KEY = "user";
const PASSWORD_KEY = "password";
const REMEMBER_KEY = "remember";
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

export const setPassword = (data) => {
  localStorage && localStorage.setItem(PASSWORD_KEY, JSON.stringify(data));
};
export const getPassword = () => {
  return (
    (localStorage && JSON.parse(localStorage.getItem(PASSWORD_KEY))) || null
  );
};
export const clearPassword = () => {
  localStorage && localStorage.removeItem(PASSWORD_KEY);
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
