import { cartService } from "@/services/cart.service";
import { getToken, handleToastMessage, setCart } from "@/utils";
import handleError from "@/utils/handleError";
import { call, delay, put, putResolve, race, take } from "redux-saga/effects";
import { onLogout } from "../auth/authReducer";
import {
  getCartAction,
  onSetCart,
  onSetLoading,
  setCartAction,
} from "./cartReducer";

export function* updateCartWorker({
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

export function* deleteCartWorker({ payload: id } = {}) {
  try {
    yield put(onSetLoading({ id, loading: true }));
    yield call(cartService.removeItem, id);
    yield putResolve(getCartAction());
  } catch (error) {
    console.error(error);
  } finally {
    yield put(onSetLoading({ id, loading: false }));
  }
}

export function* getCartWorker() {
  if (getToken()) {
    try {
      const { cart } = yield race({
        cart: call(cartService.getCart),
        logout: take(onLogout),
      });
      if (cart) {
        yield put(setCartAction(cart?.data));
      }
    } catch (error) {
      handleError(error);
    }
  }
}

export function* setCartWorker({ payload: data } = {}) {
  setCart(data); //localStorage
  yield put(onSetCart(data)); //state
}
export function* clearCartWorker() {
  yield put(onSetCart(null));
}
