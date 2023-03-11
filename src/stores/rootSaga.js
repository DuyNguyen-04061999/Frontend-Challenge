import { all, fork } from "redux-saga/effects";
import { cartSaga } from "./cart/saga";

export default function* rootSaga() {
  yield all([fork(cartSaga)]);
}
