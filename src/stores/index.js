import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import cacheReducer from "./cacheReducer";
import cateReducer, { getCategoryAction } from "./cateReducer";

const reducer = {
  auth: authReducer,
  cache: cacheReducer,
  categoryList: cateReducer,
};
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(...[]),
  devTools: import.meta.env.VITE_ENV === "development",
});

store.dispatch(getCategoryAction());
export default store;
