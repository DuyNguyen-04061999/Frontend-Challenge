import { takeLatest } from "redux-saga/effects";
import { deleteCartAction, updateCartAction } from "./cartReducer";
import { deleteCartFetcher, updateCartFetcher } from "./fetcher";

export function* cartSaga() {
  yield takeLatest(updateCartAction, updateCartFetcher);
  yield takeLatest(deleteCartAction, deleteCartFetcher);
}
