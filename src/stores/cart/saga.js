import { takeLatest } from "redux-saga/effects";
import { loginSuccessAction, logoutAction } from "../auth/authReducer";
import {
  clearCartAction,
  deleteCartAction,
  getCartAction,
  setCartAction,
  updateCartAction,
} from "./cartReducer";
import {
  clearCartWorker,
  deleteCartWorker,
  getCartWorker,
  setCartWorker,
  updateCartWorker,
} from "./worker";

export function* cartSaga() {
  yield takeLatest(updateCartAction, updateCartWorker);
  yield takeLatest(deleteCartAction, deleteCartWorker);
  yield takeLatest([getCartAction, loginSuccessAction], getCartWorker);
  yield takeLatest([clearCartAction, logoutAction], clearCartWorker);
  yield takeLatest(setCartAction, setCartWorker);
}
