import { cartService } from "@/services/cart.service";
import { handleToastMessage } from "@/utils";
import { call, delay, put, putResolve } from "redux-saga/effects";
import { getCartAction, onSetLoading } from "./cartReducer";

export function* updateCartFetcher({
  payload: { id, data, toast = false, pending, success } = {},
} = {}) {
  try {
    yield delay(300);
    yield put(onSetLoading({ id, loading: true }));
    if (toast) {
      yield call(handleToastMessage, {
        promise: () => cartService.updateQuantity(id, data),
        pending: pending,
        success: success,
      });
    } else {
      yield call(cartService.updateQuantity, id, data);
    }
    yield putResolve(getCartAction());
  } catch (error) {
    console.error(error);
  } finally {
    yield put(onSetLoading({ id, loading: false }));
  }
}

export function* deleteCartFetcher({ payload: id } = {}) {
  try {
    yield put(onSetLoading({ id, loading: true }));
    yield call(cartService.removeItem, id);
    yield putResolve(getCartAction());
    yield put(onSetLoading({ id, loading: false }));
  } catch (error) {
    console.error(error);
  }
}
