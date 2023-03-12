import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { clearToken, clearUser, getToken, setToken, setUser } from "@/utils";
import handleError from "@/utils/handleError";
import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import {
  loginSuccessAction,
  onLogout,
  onSetLoadingAuth,
  onSetUser,
  setUserAction,
} from "./authReducer";

export function* loginWorker({ payload: form } = {}) {
  try {
    yield put(onSetLoadingAuth({ kind: "login", loading: true }));
    const res = yield call(authService.login, form);
    setToken(res?.data);
    const user = yield call(userService.getProfile);
    yield put(setUserAction(user?.data));
    yield put(loginSuccessAction()); //getCart
    toast.success(
      <p>
        Chúc mừng{" "}
        <span className="text-[#34d399] font-bold">{user?.data?.name}</span> đã
        đăng nhập thành công!
      </p>,
      {
        position: "top-center",
      }
    );
  } catch (error) {
    console.log(
      "%cerror fetcher.js line:18 ",
      "color: red; display: block; width: 100%;",
      error
    );
    handleError(error);
  } finally {
    yield put(onSetLoadingAuth({ kind: "login", loading: false }));
  }
}

export function* logoutWorker() {
  yield put(onLogout());
  clearToken();
  clearUser();
}
export function* setUserWorker({ payload }) {
  setUser(payload); //====localStorage
  yield put(onSetUser(payload)); //state
}

export function* getUserWorker() {
  if (getToken()) {
    try {
      const user = yield call(userService.getProfile);
      setUser(user?.data);
      yield put(onSetUser(user?.data));
    } catch (error) {
      handleError(error);
    }
  }
}

export function* loginByCodeWorker({ payload: code }) {
  try {
    const res = yield call(authService.loginByCode, { code });
    setToken(res?.data);
    const user = yield call(userService.getProfile);
    setUser(user?.data);
    yield put(onSetUser(user?.data));
    toast.success(
      <p>
        Chúc mừng{" "}
        <span className="text-[#34d399] font-bold">{user?.data?.name}</span> đã
        đăng nhập thành công!
      </p>,
      {
        position: "top-center",
      }
    );
  } catch (error) {
    handleError(error);
  }
}

export function* changePasswordByCodeWorker({ payload: data }) {
  try {
    yield put(onSetLoadingAuth({ kind: "changeCode", loading: true }));
    const res = yield call(userService.changePasswordByCode, data);
    setToken(res?.data);
    const user = yield call(userService.getProfile);
    setUser(user?.data);
    yield put(onSetUser(user?.data));
    toast.success(
      <p>
        Chào mừng{" "}
        <span className="text-[#34d399] font-bold">{user?.data?.name}</span>{" "}
        quay trở lại
      </p>
    );
  } catch (error) {
    handleError(error);
  } finally {
    yield put(onSetLoadingAuth({ kind: "changeCode", loading: false }));
  }
}
