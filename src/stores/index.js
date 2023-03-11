import authReducer, { getUserAction } from "./authReducer";
import cacheReducer from "./cacheReducer";
import drawerReducer from "./drawerReducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import cartReducer, { getCartAction } from "./cart/cartReducer";

const reducer = {
  auth: authReducer,
  cache: cacheReducer,
  drawer: drawerReducer,
  cart: cartReducer,
};
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(sagaMiddleware),
  devTools: import.meta.env.VITE_ENV === "development",
});

store.dispatch(getUserAction());
store.dispatch(getCartAction());
sagaMiddleware.run(rootSaga);
export default store;
