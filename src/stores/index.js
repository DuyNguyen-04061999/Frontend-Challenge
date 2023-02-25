import authReducer, { getUserAction } from "./authReducer";
import cacheReducer from "./cacheReducer";
import drawerReducer from "./drawerReducer";
import { configureStore } from "@reduxjs/toolkit";

const reducer = {
  auth: authReducer,
  cache: cacheReducer,
  drawer: drawerReducer,
};
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(...[]),
  devTools: import.meta.env.VITE_ENV === "development",
});

store.dispatch(getUserAction());
export default store;
