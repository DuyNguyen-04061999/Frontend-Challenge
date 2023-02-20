import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import cacheReducer from "./cacheReducer";
import drawerReducer from "./drawerReducer";

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

export default store;
